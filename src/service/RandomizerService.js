import romService from "./ROMService";
import levelExpansionService from
    "./LevelExpansionService";

import objectUtil from '../data/ObjectUtil';
import patchMap from "../data/patch/PatchMap";
import enemyBytesMap from "../data/EnemyBytesMap";
import randomizerData from
    "../data/randomizer/RandomizerData";
import randomizerEnemyStrategy from
    "../data/randomizer/RandomizerEnemyStrategy";
import levelDefaultData from
    "../data/level/LevelDefaultData";


class RandomizerService
{
  constructor()
  {
    this.mainData = this.createDefaultMainData();
    this.mainData.hasRandomModeCustom = false;
    this.randomizerLevelTexts =
    {
      weak: " Weak ",
      easy: " Easy ",
      mid: " Mid  ",
      hard: " Hard ",
      wild: " Wild ",
      restInPain: " RIP  ",
      custom: " Cus. "
    }
  }

  createRandomizerPatch = () =>
  {
    this.mainData.hasRandomModeCustom = false;
    this.fixSeed();
    this.fixRandomProfile();
    this.fixMainData();
    let randomizedData = this.randomizeAllEnemies();
    let patch = {};
    patch.type = "build";
    patch.filename = "bpsm945a.u45";
    patch.byteFormat = "hex";
    patch.buildStart = 197974;
    patch.buildEnd = 215935;
    patch.data = {};
    patch.data = randomizedData.patch;
    return patch;
  }

  randomizeAllEnemies = () =>
  {
    let seed = this.mainData.seed;
    let randomizer = this.mulberry32Randomizer(seed);
    let egs = randomizerData.enemyGroups;
    let randomizedData = {};
    randomizedData.patch = {};
    randomizedData.preset = {};

    Object.keys(egs).forEach((lk) =>
    {
      let level = egs[lk];
      let presetLevel = this.forceGetField(randomizedData.preset, lk);

      Object.keys(level).forEach((egk) =>
      {
        let enemies = this.randomizeEnemiesForGroup(lk, egk, randomizer);
        let eg = level[egk];
        this.randomlyRemoveEnemiesOverLimit(eg, enemies, randomizer);
        presetLevel[egk] = enemies.preset;

        if(Object.keys(enemies.patch).length > 0)
        {
          let key = eg.startPosition + "_" + eg.endPosition;
          randomizedData.patch[key] = enemies.patch;
        }
      });
    });

    return randomizedData;
  }

  randomizeEnemiesForGroup = (levelKey, enemyGroupKey, randomizer) =>
  {
    let enemies = {};
    enemies.preset = {};
    enemies.patch = {};
    let mdeg = this.mainData[levelKey][enemyGroupKey];
    let id = 10;    // 10 so bosses are not replaced.
    this.sameTriggerPosition = null;

    if(mdeg.randomMode !== "disabled")
    {
      let rdld = randomizerData.enemyGroups[levelKey];
      let rdes = randomizerData.enemyStrategy;
      let enemyGroup = rdld[enemyGroupKey];

      Object.keys(rdes).forEach((e) =>
      {
        let enemyStrategy = rdes[e];
        let amount = mdeg[e];
        amount = isNaN(amount) ? 0 : amount;

        for(let i = 0; i < amount; i++)
        {
          let enemy = this.randomizeEnemy(
              enemyGroup, enemyStrategy, randomizer);
          enemies.preset[id] = enemy;
          enemies.patch[id++] = this.convertEnemyDataToBytes(enemy);
        }
      });
    }

    return enemies;
  }

  randomizeEnemy = (enemyGroup, enemyStrategy, randomizer) =>
  {
    let e = {};
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
    let bytes = new Array();
    let rdpss = randomizerData.positionStrategy;
    let enemyKeyLowerCase = enemyKey.toLowerCase();
    let res = randomizerEnemyStrategy;
    let pss = objectUtil.deepCopy(rdpss);
    let removepss = enemyGroup.forbiddenPositionStrategies;
    removepss = removepss ? removepss : [];
    removepss.forEach((ps) => {delete pss[ps];});

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

    let keys = Object.keys(pss);
    let random = this.getRandomIntValue(randomizer, 0, keys.length - 1);
    let range = pss[keys[random]];
    let min = enemyGroup.minimumPositionX ?
        enemyGroup.minimumPositionX : range[0];
    let px = this.getRandomIntValue(randomizer, min, range[1]);
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
      let random = this.getRandomIntValue(
          randomizer, 0, fields.length - 1);
      let key = fields[random];
      delete enemies.patch[key];
      delete enemies.preset[key]
      fields = Object.keys(enemies.patch);
    }
  }

  randomizeEnemyKey = (enemyGroup, enemyStrategy, randomizer) =>
  {
    let fes = enemyGroup.forbiddenEnemies;
    fes = fes ? fes : [];
    let forbiddenSet = new Set(fes);
    let vks = [];
    enemyStrategy.enemyKeys.forEach((key) =>
    {
      if(!forbiddenSet.has(key))
        vks.push(key);
    });

    let random = this.getRandomIntValue(
        randomizer, 0, vks.length - 1);
    return vks[random];
  }

  convertEnemyDataToBytes = (enemy) =>
  {
    let enemyBytes = enemyBytesMap[enemy.enemyKey].slice();
    let hexTP = romService.convertNumberToROMBytes(
        enemy.triggerPosition, 2);
    let hexPX = romService.convertNumberToROMBytes(
        enemy.positionX, 2);
    let hexPY = romService.convertNumberToROMBytes(
        enemy.positionY, 2);

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

  applyRandomizer = () =>
  {
    this.increasePlayersHealth();
    let randomizerPatch = this.createRandomizerPatch();
    romService.applyPatch(patchMap.enemyColorExpansionPatch.patch);
    romService.applyPatch(patchMap.sailorColorExpansionPatch.patch);
    romService.applyPatch(patchMap.featuresAndFixesPatch.patch);
    romService.applyPatch(patchMap.textImprovementPatch.patch);
    romService.applyPatch(
        patchMap.boss1PositionImprovementPatch.patch);
    romService.applyPatch(patchMap.dontFreezeOnBossPatch.patch);
    romService.applyPatch(this.createRandomizerTextPatch());
    romService.applyPatch(patchMap.removeCPUDemoPatch.patch);
    romService.applyPatch(randomizerPatch);
    romService.applyPatch(
        levelExpansionService.createLevelFixPatch());
    romService.applyPatch(
        levelExpansionService.createBossHelpersFixPatch());
    romService.applyPatch(
        levelExpansionService.createBossFightsFixPatch());
  }

  createRandomizerTextPatch = () =>
  {
    let patch = Object.assign({},
        patchMap.randomizerTextPatch.patch);
    patch.data = Object.assign({},
        patchMap.randomizerTextPatch.patch.data);
    let sbs = this.getSeedTextBytes(patch);
    let lbs = this.getRandomProfileTextBytes();
    patch.data[patch.seedByteIndex.toString()] = sbs;
    patch.data[patch.levelByteIndex.toString()] = lbs;
    return patch;
  }

  getRandomProfileTextBytes = () =>
  {
    let p = this.mainData.hasRandomModeCustom ?
        "custom" : this.mainData.randomProfile;
    let lt = this.randomizerLevelTexts[p];
    return this.convertStringToROMBytes(lt);
  }

  getSeedTextBytes = (patch) =>
  {
    let st = this.mainData.seed.toString();
    let fixCharCount = patch.seedSize - st.length;
    st = "*".repeat(fixCharCount / 2) +
        st + "*".repeat(fixCharCount / 2);
    st += "*".repeat(patch.seedSize - st.length);
    return this.convertStringToROMBytes(st);
  }

  convertStringToROMBytes = (text) =>
  {
    let bytes = [];

    for(let i = 0; i < text.length - 1; i += 2)
    {
      bytes.push(text.charCodeAt(i + 1).toString(16));
      bytes.push(text.charCodeAt(i).toString(16));
    }

    return bytes;
  }

  updateMainData = (levelKey, enemyGroupKey,
        enemyStrategyKey, enemyAmount) =>
  {
    if(levelKey && enemyGroupKey && enemyStrategyKey)
    {
      let level = this.forceGetField(this.mainData, levelKey);
      let enemyGroup = this.forceGetField(level, enemyGroupKey);
      enemyGroup[enemyStrategyKey] = enemyAmount;
    }
  }

  forceGetField = (object, field) =>
  {
    if(field)
    {
      let content = object[field];

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
    let content = field ? object[field] : {};
    return content ? content : {};
  }

  fixSeed = () =>
  {
    let s = parseInt(this.mainData.seed);
    s = isNaN(s) ? 0 : s;
    s = Math.max(s, Number.MIN_SAFE_INTEGER);
    s = Math.min(s, Number.MAX_SAFE_INTEGER);
    this.mainData.seed = s;
  }

  fixRandomProfile = () =>
  {
    let rp = this.mainData.randomProfile;
    rp = rp in randomizerData.randomProfile ? rp : "wild";
    this.mainData.randomProfile = rp;
  }

  getSeed = () =>
  {
    return this.mainData.seed;
  }

  setSeed = (seed) =>
  {
    this.mainData.seed = seed;
  }

  getRandomProfile = () =>
  {
    return this.mainData.randomProfile;
  }

  setRandomProfile = (random) =>
  {
    this.mainData.randomProfile = random;
  }

  setRandomMode = (levelKey, enemyGroupKey, mode) =>
  {
    if(levelKey && enemyGroupKey)
    {
      let l = this.forceGetField(this.mainData, levelKey);
      let eg = this.forceGetField(l, enemyGroupKey);
      eg.randomMode = mode ? mode : "random";
    }
  }

  getDateNowInMilliseconds = () =>
  {
    return Date.now().valueOf();
  }

  getMainData = () =>
  {
    return this.mainData;
  }

  getMainDataGroup = (levelKey, enemyGroupKey) =>
  {
    if(levelKey && enemyGroupKey)
    {
      let l = this.getField(this.mainData, levelKey);
      return this.getField(l, enemyGroupKey);
    }
    
    return {};
  }

  getRandomIntValue = (randomizer, begin, end) =>
  {
    let b = parseInt(begin);
    let e = parseInt(end);
    let amount = Math.abs(e - b);

    if(amount !== 0)
      return Math.round(randomizer() * amount) + b;

    return begin;
  }

  fixMainData = () =>
  {
    const {seed, randomProfile} = this.mainData;
    let egs = randomizerData.enemyGroups;
    let randomizer = this.mulberry32Randomizer(seed);
    let rdrp = randomizerData.randomProfile[randomProfile];
    Object.keys(egs).forEach((e) =>
    {
      this.fixLevel(e, rdrp, randomizer);
    });
  }

  fixLevel = (levelKey, randomProfile, randomizer) =>
  {
    let l = this.forceGetField(this.mainData, levelKey);
    let lgs = randomizerData.enemyGroups[levelKey];

    Object.keys(lgs).forEach((egk) =>
    {
      let rdeg = lgs[egk];
      let rsts = randomProfile[rdeg.specialProfile];
      rsts = rsts ? rsts : randomProfile.enemyStrategy;
      this.fixEnemyGroup(l, egk, rsts, randomizer);
    });
  }

  fixEnemyGroup = (level, enemyGroupKey,
      randomStrategies, randomizer) =>
  {
    let eg = this.forceGetField(level, enemyGroupKey);
    
    if(eg.randomMode === "custom")
    {
      let enemyAmount = 0;
      let rdes = randomizerData.enemyStrategy;
      Object.keys(rdes).forEach((es) =>
      {
        let amount = parseInt(eg[es]);
        amount = isNaN(amount) ? 0 : amount;
        enemyAmount += amount;
      });
      
      if(enemyAmount === 0)
      {
        this.fixEnemyStrategy(eg, randomStrategies, randomizer);
        eg.randomMode = "random";
      }
      else
        this.mainData.hasRandomModeCustom = true;
    }
    else if(eg.randomMode !== "disabled")
    {
      this.fixEnemyStrategy(eg, randomStrategies, randomizer);
      eg.randomMode = "random";
    }
  }

  fixEnemyStrategy = (enemyGroup, randomStrategies, randomizer) =>
  {
    objectUtil.removeAllProperties(enemyGroup);
    
    Object.keys(randomStrategies).forEach((e) =>
    {
      let es = randomStrategies[e];
      enemyGroup[e] = this.getRandomIntValue(
          randomizer, es.randomMinAmount, es.randomMaxAmount);
    });
  }

  increasePlayersHealth = () =>
  {
    const filename = "bpsm945a.u45";
    romService.setByte(filename, 43824, 96);
    romService.setByte(filename, 38668, 96);
  }

  applyPresetFile = (presetFile) =>
  {
    let json = JSON.parse(presetFile);

    if(json && json.data && json.type === "randomizer")
      this.mainData = json.data;
  }
  
  createRandomizerPreset = () =>
  {
    let preset = {};
    preset.type = "randomizer";
    preset.data = objectUtil.deepCopy(this.mainData);
    return preset;
  }

  createLevelEditorPreset = () =>
  {
    this.fixSeed();
    this.fixRandomProfile();
    this.fixMainData();
    let randomizerData = this.randomizeAllEnemies();
    let preset = {};
    preset.type = "levelEditor";
    preset.data = randomizerData.preset;    
    let bossGroups = new Set(["bossGroup", "bossGroup1",
        "bossGroup2", "bossGroup3", "bossGroup4",
        "bossGroup5", "finalBossGroup"]);
    
    Object.keys(preset.data).forEach((lk) =>
    {
      let pl = preset.data[lk];
      let lddl = levelDefaultData[lk];
      
      Object.keys(pl).forEach((egk) =>
      {
        let pg = pl[egk];
        let fixedPG = {};
        let index = 0;

        if(bossGroups.has(egk)) // Force level default boss
          pg = Object.assign(pg, lddl[egk])

        Object.keys(pg).forEach((id) => // Fix all enemy ids
        {
          // Fix a bug on level editor caused by castor both
          if(pg[id].enemyKey === "castorAndPolluxBossBoth")
          {
            fixedPG[index] = Object.assign({}, pg[id]);
            fixedPG[index++].enemyKey = "castorAndPolluxBoss1";
            fixedPG[index] = Object.assign({}, pg[id]);
            fixedPG[index++].enemyKey = "castorAndPolluxBoss2";
          }
          else
            fixedPG[index++] = pg[id];
        });

        preset.data[lk][egk] = fixedPG; 
      });
    });

    return preset;
  }

  createDefaultMainData = () =>
  {
    let mainData = {};
    mainData.seed = this.getDateNowInMilliseconds();
    mainData.randomProfile = "wild";
    return mainData;
  }

  setMainDataToDefault = () =>
  {
    this.mainData = this.createDefaultMainData();
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
}


const randomizerService = new RandomizerService();
export default randomizerService;