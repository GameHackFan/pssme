import { romService } from "./ROMService";
import { levelExpansionService } from "./LevelExpansionService";
import { modificationService } from "./ModificationService";
import { randomizerData } from "../data/randomizer/RandomizerData";
import { levelDefaultData } from "../data/level/LevelDefaultData";
import { enemyBytesMap } from "../data/default/EnemyBytesMap";
import { objectUtil } from '../data/default/ObjectUtil';
import { patchMap } from "../data/patch/PatchMap";
import { randomizerEnemyStrategy } from
    "../data/randomizer/RandomizerEnemyStrategy";


class RandomizerService
{
  createRandomizerPatch = () =>
  {
    this.fixSeed();
    this.fixRandomProfile();
    this.fixDataMap();
    const randomizedData = this.randomizeAllEnemies();
    const patch = {};
    patch.type = "build";
    patch.filename = "bpsm945a.u45";
    patch.byteFormat = "hex";
    patch.buildStart = 197974;
    patch.buildEnd = 229311;      // 229375
    patch.data = {};
    patch.data = randomizedData.patch;
    return patch;
  }

  randomizeAllEnemies = () =>
  {
    const seed = dataMap.seed;
    const randomizer = this.mulberry32Randomizer(seed);
    const egs = randomizerData.enemyGroups;
    const randomizedData = {};
    randomizedData.patch = {};
    randomizedData.preset = {};

    Object.keys(egs).forEach((lk) =>
    {
      const level = egs[lk];
      const presetLevel = this.forceGetField(randomizedData.preset, lk);

      Object.keys(level).forEach((egk) =>
      {
        const enemies = this.randomizeEnemiesForGroup(lk, egk, randomizer);
        const eg = level[egk];
        this.randomlyRemoveEnemiesOverLimit(eg, enemies, randomizer);
        presetLevel[egk] = enemies.preset;

        if(Object.keys(enemies.patch).length > 0)
        {
          const key = eg.startPosition + "_" + eg.endPosition;
          randomizedData.patch[key] = enemies.patch;
        }
      });
    });

    return randomizedData;
  }

  randomizeEnemiesForGroup = (levelKey, enemyGroupKey, randomizer) =>
  {
    this.sameTriggerPosition = null;
    const mdeg = dataMap[levelKey][enemyGroupKey];
    const rdld = randomizerData.enemyGroups[levelKey];
    const rdes = randomizerData.enemyStrategy;
    const enemyGroup = rdld[enemyGroupKey];
    const enemies = {};
    enemies.preset = {};
    enemies.patch = {};
    let id = 10;        // 10, so bosses are not replaced.

    Object.keys(rdes).forEach((e) =>
    {
      const enemyStrategy = rdes[e];
      let amount = parseInt(mdeg[e]);
      amount = isNaN(amount) ? 0 : amount;

      for(let i = 1; i <= amount; i++)
      {
        const enemy = this.randomizeEnemy(enemyGroup, enemyStrategy, randomizer);
        const hasDelay = !enemyGroup.ignoreSpawnDelay && i % 5 == 0;
        let bytes = this.convertEnemyDataToBytes(enemy);
        bytes = hasDelay ? bytes.concat(this.getDelayBytes(20)) : bytes;
        enemies.preset[id] = enemy;
        enemies.patch[id++] = bytes;
      }
    });

    return enemies;
  }

  randomizeEnemy = (enemyGroup, enemyStrategy, randomizer) =>
  {
    const e = {};
    e.enemyKey = this.randomizeEnemyKey(
        enemyGroup, enemyStrategy, randomizer);
    e.triggerPosition = this.randomizeSpawnTriggerPosition(
        enemyGroup, randomizer);
    e.triggerPosition = this.randomizeSpawnTriggerPosition(
        enemyGroup, randomizer);
    e.positionX = this.randomizePositionX(
        e.enemyKey, enemyGroup, randomizer);
    e.positionY = this.randomizePositionY(enemyGroup, randomizer);
    return e;
  }

  randomizePositionX = (enemyKey, enemyGroup, randomizer) =>
  {
    const rdpss = randomizerData.positionStrategy;
    const enemyKeyLowerCase = enemyKey.toLowerCase();
    const res = randomizerEnemyStrategy;
    const pss = objectUtil.deepCopy(rdpss);
    let removepss = enemyGroup.forbiddenPositionStrategies;
    removepss = removepss ? removepss : [];
    removepss.forEach((ps) => delete pss[ps]);

    if(enemyKeyLowerCase.includes("falling"))
    {
      delete pss.outsideLeft;
      delete pss.outsideRight;
    }
    else if(res.anyItem.includes(enemyKeyLowerCase)
        || enemyKeyLowerCase.includes("form1"))
    {
      delete pss.outsideLeft;
      delete pss.inside;
    }
    else
      delete pss.inside;

    if(Object.keys(pss).length < 1)
      pss.inside = rdpss.inside;

    const keys = Object.keys(pss);
    const random = this.getRandomIntValue(randomizer, 0, keys.length - 1);
    const range = pss[keys[random]];
    const min = enemyGroup.minimumPositionX ?
        enemyGroup.minimumPositionX : range[0];
    const px = this.getRandomIntValue(randomizer, min, range[1]);
    return px;
  }

  randomizePositionY = (enemyGroup, randomizer) =>
  {
    return this.getRandomIntValue(randomizer,
        enemyGroup.walkablePositionYTop,
        enemyGroup.walkablePositionYBottom);
  }

  randomizeSpawnTriggerPosition = (enemyGroup, randomizer) =>
  {
    if(this.sameTriggerPosition == null)
    {
      this.sameTriggerPosition = this.getRandomIntValue(
          randomizer, enemyGroup.screenPositionStart,
          enemyGroup.screenPositionEnd);
    }
    
    return this.sameTriggerPosition;
  }

  randomlyRemoveEnemiesOverLimit = (enemyGroup, enemies, randomizer) =>
  {
    let fields = Object.keys(enemies.patch);

    while(fields.length > enemyGroup.maxAmount)
    {
      const random = this.getRandomIntValue(randomizer, 0, fields.length - 1);
      const key = fields[random];
      delete enemies.patch[key];
      delete enemies.preset[key]
      fields = Object.keys(enemies.patch);
    }
  }

  randomizeEnemyKey = (enemyGroup, enemyStrategy, randomizer) =>
  {
    let fes = enemyGroup.forbiddenEnemies;
    fes = fes ? fes : [];
    const forbiddenSet = new Set(fes);
    const vks = [];
    enemyStrategy.enemyKeys.forEach((key) =>
    {
      if(!forbiddenSet.has(key))
        vks.push(key);
    });

    const random = this.getRandomIntValue(randomizer, 0, vks.length - 1);
    return vks[random];
  }

  convertEnemyDataToBytes = (enemy) =>
  {
    const enemyBytes = enemyBytesMap[enemy.enemyKey].slice();
    const hexTP = romService.convertNumberToROMBytes(enemy.triggerPosition, 2);
    const hexPX = romService.convertNumberToROMBytes(enemy.positionX, 2);
    const hexPY = romService.convertNumberToROMBytes(enemy.positionY, 2);

    for(let i = 0; i < enemyBytes.length; i += 16)
    {
      enemyBytes[i] = hexTP[0];
      enemyBytes[i + 1] = hexTP[1];
      
      enemyBytes[i + 10] = hexPX[0];
      enemyBytes[i + 11] = hexPX[1];

      enemyBytes[i + 12] = hexPY[0];
      enemyBytes[i + 13] = hexPY[1];
    }

    return enemyBytes;
  }

  getDelayBytes = (frameAmount) =>
  {
    const hexBytes = romService.convertNumberToROMBytes(frameAmount, 2);
    return ["00", "00", "03", "00", "6A", "00", hexBytes[0], hexBytes[1]];
  }

  applyRandomizer = () =>
  {
    const randomizerPatch = this.createRandomizerPatch();
    const les = levelExpansionService;

    romService.applyPatch(patchMap.areaImprovementPatch.patch);
    romService.applyPatch(patchMap.level1RemakePatch.patch);
    romService.applyPatch(patchMap.extraLevelPatch.patch);
    romService.applyPatch(patchMap.timeImprovementPatch.patch);
    romService.applyPatch(patchMap.foodImprovementPatch.patch);

    romService.applyPatch(patchMap.sailorColorExpansionPatch.patch);
    romService.applyPatch(patchMap.playerHealthImprovementPatch.patch);

    romService.applyPatch(patchMap.itemDropFixesPatch.patch);
    romService.applyPatch(patchMap.enemyColorExpansionPatch.patch);
    romService.applyPatch(patchMap.thetisImprovementPatch.patch);
    romService.applyPatch(patchMap.jumouImprovementPatch.patch);
    romService.applyPatch(patchMap.bakeneImprovementPatch.patch);
    
    romService.applyPatch(patchMap.featuresAndFixesPatch.patch);
    romService.applyPatch(patchMap.sailorImprovementPatch.patch);
    romService.applyPatch(patchMap.sailorDashImprovementPatch.patch);
    romService.applyPatch(patchMap.textImprovementPatch.patch);
    romService.applyPatch(patchMap.newLevelsTextImprovementPatch.patch);
    romService.applyPatch(patchMap.dontFreezeOnBossPatch.patch);
    romService.applyPatch(this.createRandomizerTextPatch());
    romService.applyPatch(patchMap.fixCPUDemoPatch.patch);
    romService.applyPatch(patchMap.crystalImprovementPatch.patch);
    
    romService.applyPatch(randomizerPatch);
    romService.applyPatch(les.createLevelFixPatch());
    romService.applyPatch(les.createBossHelpersFixPatch());
    romService.applyPatch(les.createBossFightsFixPatch());
  }

  getCustomRandomProfileEnemyGroup = (levelKey, groupKey) =>
  {
    if(levelKey && groupKey)
    {
      const crp = randomizerData.randomProfile.custom;
      const l = this.forceGetField(crp, levelKey);
      return this.forceGetField(l, groupKey);
    }
    
    return {};
  }

  createRandomizerTextPatch = () =>
  {
    const patch = Object.assign({}, patchMap.randomizerTextPatch.patch);
    patch.data = Object.assign({}, patchMap.randomizerTextPatch.patch.data);
    const sbs = this.getSeedTextBytes(patch);
    const lbs = this.getRandomProfileTextBytes();
    patch.data[patch.seedByteIndex.toString()] = sbs;
    patch.data[patch.levelByteIndex.toString()] = lbs;
    return patch;
  }

  getRandomProfileTextBytes = () =>
  {
    const lt = randomizerLevelTexts[dataMap.randomProfile];
    return romService.convertStringToROMBytes(lt);
  }

  getSeedTextBytes = (patch) =>
  {
    let st = dataMap.seed.toString();
    st = "*".repeat(patch.seedSize) + " " + st + " " + "*".repeat(patch.seedSize);
    const remove = (st.length - patch.seedSize) / 2;
    st = st.substring(remove, st.length - remove);
    st = st.length > patch.seedSize ? st.substring(0, patch.seedSize) : st;
    return romService.convertStringToROMBytes(st);
  }

  forceGetField = (object, field) =>
  {
    if(field)
    {
      const content = object[field];

      if(!content)
      {
        object[field] = {};
        return object[field];
      }

      return content;
    }

    return {};
  }

  getField = (object, field) =>
  {
    const content = field ? object[field] : {};
    return content ? content : {};
  }

  fixSeed = () =>
  {
    let s = parseInt(dataMap.seed);
    s = isNaN(s) ? Date.now().valueOf() : s;
    s = Math.max(s, Number.MIN_SAFE_INTEGER);
    s = Math.min(s, Number.MAX_SAFE_INTEGER);
    dataMap.seed = s;
  }

  fixRandomProfile = () =>
  {
    let rp = dataMap.randomProfile;
    rp = rp in randomizerData.randomProfile ? rp : "wild";
    dataMap.randomProfile = rp;
  }

  getSeed = () =>
  {
    return dataMap.seed;
  }

  setSeed = (seed) =>
  {
    dataMap.seed = seed;
  }

  getRandomProfile = () =>
  {
    return dataMap.randomProfile;
  }

  setRandomProfile = (random) =>
  {
    dataMap.randomProfile = random;
  }

  setEnemyGroupMaxAmount = (levelKey, groupKey, strategyKey, amount) =>
  {
    const rp = randomizerData.randomProfile.custom;
    const l = this.forceGetField(rp, levelKey);
    const g = this.forceGetField(l, groupKey);
    const s = this.forceGetField(g, strategyKey);
    s.randomMaxAmount = amount;
  }

  setEnemyGroupMinAmount = (levelKey, groupKey, strategyKey, amount) =>
  {
    const rp = randomizerData.randomProfile.custom;
    const l = this.forceGetField(rp, levelKey);
    const g = this.forceGetField(l, groupKey);
    const s = this.forceGetField(g, strategyKey);
    s.randomMinAmount = amount;
  }

  getDateNowInMilliseconds = () =>
  {
    return Date.now().valueOf();
  }

  getRandomIntValue = (randomizer, begin, end) =>
  {
    const b = parseInt(begin);
    const e = parseInt(end);
    const amount = Math.abs(e - b);

    if(amount !== 0)
      return Math.round(randomizer() * amount) + b;

    return begin;
  }

  fixDataMap = () =>
  {
    const {seed, randomProfile} = dataMap;
    const egs = randomizerData.enemyGroups;
    const randomizer = this.mulberry32Randomizer(seed);
    const rdrp = randomizerData.randomProfile[randomProfile];
    Object.keys(egs).forEach((e) => this.fixLevel(e, rdrp, randomizer));
  }

  fixLevel = (levelKey, randomProfile, randomizer) =>
  {
    const l = this.forceGetField(dataMap, levelKey);
    const lgs = randomizerData.enemyGroups[levelKey];

    Object.keys(lgs).forEach((egk) =>
    {
      const rdeg = lgs[egk];
      let rsts;

      if(dataMap.randomProfile === "custom")
      {
        rsts = rsts ? rsts : randomProfile[levelKey];
        rsts = rsts ? rsts[egk] : {};
        rsts = rsts ? rsts : {};
      }
      else
      {
        rsts = randomProfile[rdeg.specialProfile];
        rsts = rsts ? rsts : randomProfile.enemyStrategy;
      }

      this.fixEnemyGroup(l, egk, rsts, randomizer);
    });
  }

  fixEnemyGroup = (level, enemyGroupKey, randomStrategies, randomizer) =>
  {
    const eg = this.forceGetField(level, enemyGroupKey);
    objectUtil.removeAllProperties(eg);
    let total = 0;
    
    Object.keys(randomStrategies).forEach((e) =>
    {
      const es = randomStrategies[e];
      let min = parseInt(es.randomMinAmount);
      let max = parseInt(es.randomMaxAmount);
      min = (isNaN(min) || min < 0) ? 0 : min;
      max = (isNaN(max) || max < 0) ? 0 : max;
      min = (max - min) < 0 ? 0 : min;
      max = (max - min) < 0 ? 0 : max;
      const amount = this.getRandomIntValue(randomizer, min, max);
      total += amount;
      eg[e] = amount;
    });

    // Ensures at least one enemy will be randomized in the group.
    if(total < 1)
      eg.enemiesAndBosses = 1;
  }

  applyPreset = (preset) =>
  {
    const json = JSON.parse(preset);

    if(json && json.data && json.type === "randomizer")
    {
      dataMap = dataMap ? dataMap : {};
      Object.assign(dataMap, json.data);
      delete dataMap.customRandomProfile;
      let custom = json.data.customRandomProfile;
      custom = custom ? custom : {};
      Object.assign(randomizerData.randomProfile.custom, custom);
      randomizerData.randomProfile.custom.label = "Custom";
    }
  }
  
  createRandomizerPreset = () =>
  {
    const preset = {};
    preset.type = "randomizer";
    preset.data = objectUtil.deepCopy(dataMap);
    
    if(dataMap.randomProfile === "custom")
    {
      const csr = randomizerData.randomProfile.custom;
      preset.data.customRandomProfile = objectUtil.deepCopy(csr);
      delete preset.data.customRandomProfile.label;
    }

    return preset;
  }

  createLevelEditorPreset = () =>
  {
    this.fixSeed();
    this.fixRandomProfile();
    this.fixDataMap();
    const randomizerData = this.randomizeAllEnemies();
    const preset = {};
    preset.type = "levelEditor";
    preset.data = randomizerData.preset;
    const bossGroups = new Set(["bossGroup", "bossGroup1",
        "bossGroup2", "bossGroup3", "bossGroup4",
        "bossGroup5", "finalBossGroup"]);
    
    Object.keys(preset.data).forEach((lk) =>
    {
      const pl = preset.data[lk];
      const lddl = levelDefaultData[lk];
      
      Object.keys(pl).forEach((egk) =>
      {
        const fixedPG = {};
        let pg = pl[egk];
        let index = 0;

        if(bossGroups.has(egk))   // Force level default boss
          pg = Object.assign(pg, lddl[egk])

        Object.keys(pg).forEach((id) =>   // Fix all enemy ids
        {
          const enemy = pg[id];

          // Fix a bug on level editor caused by castor both
          if(enemy.enemyKey === "castorAndPolluxBossBoth")
          {
            fixedPG[index] = Object.assign({}, enemy);
            fixedPG[index].id = index;
            fixedPG[index++].enemyKey = "castorAndPolluxBoss1";
            fixedPG[index] = Object.assign({}, enemy);
            fixedPG[index].id = index;
            fixedPG[index++].enemyKey = "castorAndPolluxBoss2";
          }
          else
          {
            enemy.id = index;
            fixedPG[index++] = enemy;
          }
        });

        preset.data[lk][egk] = fixedPG; 
      });
    });

    return preset;
  }

  createDefaultDataMap = () =>
  {
    const data = {};
    data.seed = this.getDateNowInMilliseconds();
    data.randomProfile = "wild";
    return data;
  }

  setDataMapToDefault = () =>
  {
    dataMap = this.createDefaultDataMap();
  }

  setCustomRandomProfileToDefault = () =>
  {
    const crp = randomizerData.randomProfile.custom;
    objectUtil.removeAllProperties(crp);
    crp.key = "custom";
    crp.label = "Custom";
  }

  addToModificationQueue = () =>
  {
    modificationService.add(150, "randomizer", this.applyRandomizer);
  }

  mulberry32Randomizer = (seed) =>
  {
    return function()
    {
      seed += 0x6D2B79F5;
      var t = seed;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
  }

  isValidLevelKey = (levelKey) =>
  {
    return (levelKey in randomizerData.enemyGroups);
  }

  isValidEnemyGroupKey = (levelKey, groupKey) =>
  {
    let level = randomizerData.enemyGroups[levelKey];
    level = level ? level : {}
    return (groupKey in level);
  }

  getUIRandomProfileList = () =>
  {
    const keys = Object.keys(randomizerData.randomProfile);
    return keys.map((key) => {return randomizerData.randomProfile[key];});
  }

  getUILevelList = () =>
  {
    const keys = Object.keys(randomizerData.levels);
    return keys.map((key) => {return randomizerData.levels[key];});
  }

  getUIEnemyGroupList = (levelKey) =>
  {
    const level = randomizerData.enemyGroups[levelKey];
    const keys = level ? Object.keys(level) : [];
    return keys.map((key) => {return level[key];});
  }

  getUIRandomizerEnemyStrategyList = (levelKey, groupKey) =>
  {
    const data = this.getCustomRandomProfileEnemyGroup(levelKey, groupKey);
    const keys = Object.keys(randomizerData.enemyStrategy);
    return keys.map((key) =>
    {
      const es = data[key];
      const c = objectUtil.deepCopy(randomizerData.enemyStrategy[key]);
      c.randomMinAmount = es?.randomMinAmount ? es.randomMinAmount : "";
      c.randomMaxAmount = es?.randomMaxAmount ? es.randomMaxAmount : "";
      return c;
    });
  }

  getUIEnemyGroup = (levelKey, groupKey) =>
  {
    const level = randomizerData.enemyGroups[levelKey];
    const group = level ? level[groupKey] : {};
    return group ? group : {};
  }

  constructor()
  {
    dataMap = this.createDefaultDataMap();
  }
}


let dataMap;
const randomizerLevelTexts =
{
  meek: "** Meek **",
  kind: "** Kind **",
  weak: "** Weak **",
  easy: "** Easy **",
  fair: "** Fair **",
  mid: "** Mid  **",
  hard: "** Hard **",
  wild: "** Wild **",
  restInPain: "** RIP **",
  custom: "* Custom *"
}

export const randomizerService = new RandomizerService();
