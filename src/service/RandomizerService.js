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


class RandomizerService
{
  constructor()
  {
    this.mainData = this.createDefaultMainData();
    this.minSpawnTriggerPosition = 0;
  }

  createRandomizerPatch = () =>
  {
    this.minSpawnTriggerPosition = 0;
    this.fixSeed();
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
    let nextLevelAddress;
    let randomizedData = {};
    randomizedData.patch = {};
    randomizedData.preset = {};

    Object.keys(egs).forEach((lk) =>
    {
      let level = egs[lk];
      let presetLevel = this.forceGetField(
          randomizedData.preset, lk);
      let enemyId = 0;

      Object.keys(level).forEach((egk) =>
      {
        this.minSpawnTriggerPosition =
            egk.screenPositionStart;
        let enemies = this.randomizeEnemiesForGroup(
            lk, egk, randomizer);
        let eg = level[egk];
        this.randomlyRemoveEnemiesOverLimit(
            eg, enemies, randomizer);
        presetLevel[egk] = enemies.preset;

        if(Object.keys(enemies.patch).length > 0)
        {
          let key = eg.startPosition + "_" +
              eg.endPosition;
          randomizedData.patch[key] = enemies.patch;
        }
      });
    });

    return randomizedData;
  }

  randomizeEnemiesForGroup = (
      levelKey, enemyGroupKey, randomizer) =>
  {
    let enemies = {};
    enemies.preset = {};
    enemies.patch = {};
    let mdeg = this.mainData[levelKey][enemyGroupKey];
    let id = 0;

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
          let enemy = this.randomizeEnemy(levelKey,
              enemyGroup, enemyStrategy, randomizer);
          enemies.preset[id] = enemy;
          enemies.patch[id++] =
              this.convertEnemyDataToBytes(enemy);
        }
      });
    }

    return enemies;
  }

  randomizeEnemy = (levelKey, enemyGroup,
      enemyStrategy, randomizer) =>
  {
    let e = {};
    e.enemyKey = this.randomizeEnemyKey(levelKey,
        enemyStrategy, randomizer);
    e.triggerPosition = 
        this.randomizeSpawnTriggerPosition(
        enemyGroup, randomizer);
    e.triggerPosition = 
        this.randomizeSpawnTriggerPosition(
        enemyGroup, randomizer);
    e.positionX = this.randomizePositionX(
        e.enemyKey, enemyGroup, randomizer);
    e.positionY = this.randomizePositionY(
        enemyGroup, randomizer);
    return e;
  }

  randomizePositionX = (enemyKey,
      enemyGroup, randomizer) =>
  {
    let bytes = new Array();
    let rdpss = randomizerData.positionStrategy;
    let enemyKeyLowerCase = enemyKey.toLowerCase();
    let res = randomizerEnemyStrategy;
    let pss = objectUtil.deepCopy(rdpss);
    let removepss =
        enemyGroup.forbiddenPositionStrategies;
    removepss = removepss ? removepss : [];
    removepss.forEach((ps) =>
    {
      delete pss[ps];
    });

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
    let random = this.getIntRandomValue(randomizer,
          0, keys.length - 1);
    let range = pss[keys[random]];
    let px = this.getIntRandomValue(randomizer,
        range[0], range[1]);

    return px;
  }

  randomizePositionY = (enemyGroup, randomizer) =>
  {
    return this.getIntRandomValue(randomizer,
        enemyGroup.walkablePositionYTop,
        enemyGroup.walkablePositionYBottom);
  }

  randomizeSpawnTriggerPosition = (
      enemyGroup, randomizer) =>
  {
    let random = this.getIntRandomValue(randomizer,
        enemyGroup.screenPositionStart,
        enemyGroup.screenPositionEnd);
    
    if(random < this.minSpawnTriggerPosition)
      random = this.minSpawnTriggerPosition;
    else
      this.minSpawnTriggerPosition = random;

    return random;
  }

  randomlyRemoveEnemiesOverLimit = (
      enemyGroup, enemies, randomizer) =>
  {
    let fields = Object.keys(enemies.patch);

    while(fields.length > enemyGroup.maxAmount)
    {
      let random = this.getIntRandomValue(
          randomizer, 0, fields.length - 1);
      let key = fields[random];
      delete enemies.patch[key];
      delete enemies.preset[key]
      fields = Object.keys(enemies.patch);
    }
  }

  randomizeEnemyKey = (levelKey,
      enemyStrategy, randomizer) =>
  {
    let forbidden =
        randomizerData.forbiddenEnemies[levelKey];
    forbidden = forbidden ? forbidden : [];
    let random = this.getIntRandomValue(randomizer,
        0, enemyStrategy.enemyKeys.length - 1);
    let enemyKey = enemyStrategy.enemyKeys[random];

    while(forbidden.includes(enemyKey))
    {
      random = this.getIntRandomValue(randomizer,
          0, enemyStrategy.enemyKeys.length - 1);
      enemyKey = enemyStrategy.enemyKeys[random];
    }
    
    return enemyKey;
  }

  convertEnemyDataToBytes = (enemy) =>
  {
    let enemyBytes =
        enemyBytesMap[enemy.enemyKey].slice();
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
    romService.applyPatch(
          patchMap.featuresAndFixesPatch.patch);
    romService.applyPatch(
      patchMap.textImprovementPatch.patch);
    romService.applyPatch(
      patchMap.dontFreezeOnBossPatch.patch);
    this.applyRandomizerTextPatch();
    romService.applyPatch(
        patchMap.removeCPUDemoPatch.patch);
    romService.applyPatch(
        this.createRandomizerPatch());
    romService.applyPatch(
        levelExpansionService.createLevelFixPatch());
    romService.applyPatch(levelExpansionService.
        createBossHelpersFixPatch());
    romService.applyPatch(levelExpansionService.
        createBossFightsFixPatch());
  }

  applyRandomizerTextPatch = () =>
  {
    let patch = Object.assign({},
        patchMap.randomizerTextPatch.patch);
    patch.data = Object.assign({},
        patchMap.randomizerTextPatch.patch.data);
    let seedText = this.mainData.seed.toString();
    let fixCharCount =
        patch.seedSize - seedText.length;
    seedText = "*".repeat(fixCharCount / 2) +
        seedText + "*".repeat(fixCharCount / 2);
    seedText += "*".repeat(
        patch.seedSize - seedText.length);
    let bytes = [];

    for(let i = 0; i < seedText.length - 1; i += 2)
    {
      bytes.push(
          seedText.charCodeAt(i + 1).toString(16));
      bytes.push(seedText.charCodeAt(i).toString(16));
    }

    patch.data[patch.seedByteIndex.toString()] = bytes;

    romService.applyPatch(patch);
  }

  updateMainData = (levelKey, enemyGroupKey,
      enemyStrategyKey, enemyAmount) =>
  {
    if(levelKey && enemyGroupKey && enemyStrategyKey)
    {
      let level = this.forceGetField(
          this.mainData, levelKey);
      let enemyGroup = this.forceGetField(
          level, enemyGroupKey);
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

  getSeed = () =>
  {
    return this.mainData.seed;
  }

  fixSeed = () =>
  {
    let s = parseInt(this.mainData.seed);
    s = isNaN(s) ? 0 : s;
    s = s > 9007199254740992 ? 9007199254740992 : s;
    this.mainData.seed = s;
  }

  setSeed = (seed) =>
  {
    this.mainData.seed = seed;
  }

  setRandomMode = (levelKey, enemyGroupKey, mode) =>
  {
    if(levelKey && enemyGroupKey)
    {
      let l = this.forceGetField(
          this.mainData, levelKey);
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

  getIntRandomValue = (randomizer, begin, end) =>
  {
    let b = parseInt(begin);
    let e = parseInt(end);
    let amount = Math.abs(e - b);

    if(amount !== 0)
      return Math.round(randomizer() * amount) + b;

    return 0;
  }

  fixMainData = () =>
  {
    let egs = randomizerData.enemyGroups;
    let seed = this.mainData.seed;
    let randomizer = this.mulberry32Randomizer(seed);
    Object.keys(egs).forEach((e) =>
    {
      this.fixLevel(e, randomizer);
    });
    this.fixFinalBossEnemyGroup(randomizer);
  }

  fixLevel = (levelKey, randomizer) =>
  {
    let l = this.forceGetField(
        this.mainData, levelKey);

    Object.keys(randomizerData.enemyGroups[levelKey]).
        forEach((e) =>
        {
          this.fixEnemyGroup(l, e, randomizer);
        });
  }

  fixEnemyGroup = (level, enemyGroupKey, randomizer) =>
  {
    let eg = this.forceGetField(level, enemyGroupKey);
    
    if(eg.randomMode === "custom")
    {
      let enemyAmount = 0;

      Object.keys(randomizerData.enemyStrategy).
          forEach((e) =>
          {
            let amount = parseInt(eg[e]);
            amount = isNaN(amount) ? 0 : amount;
            enemyAmount += amount;
          });
      
      if(enemyAmount === 0)
      {
        eg.randomMode = "random";
        this.fixEnemyStrategy(randomizer);
      }
    }
    else if(eg.randomMode !== "disabled")
    {
      eg.randomMode = "random";
      this.fixEnemyStrategy(eg, randomizer);
    }
  }

  fixFinalBossEnemyGroup = (randomizer) =>
  {
    let fbg = this.mainData.level8.finalBossGroup;

    if(fbg.randomMode === "random")
    {
      let es = randomizerData.enemyStrategy.
          ungrabbableEnemies;
      this.mainData.level8.finalBossGroup = {};
      fbg = this.mainData.level8.finalBossGroup;
      fbg.randomMode = "random";
      fbg.ungrabbableEnemies =
          this.getIntRandomValue(randomizer,
          es.randomMinAmount, es.randomMaxAmount);
    }
  }

  fixEnemyStrategy = (enemyGroup, randomizer) =>
  {
    let enemyStrategies = randomizerData.enemyStrategy;
    Object.keys(enemyStrategies).forEach((e) =>
    {
      let es = enemyStrategies[e];

      if(es.randomActive)
      {
        enemyGroup[e] = this.getIntRandomValue(
            randomizer, es.randomMinAmount, es.randomMaxAmount);
      }
      else
        enemyGroup[e] = 0;
    });
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
    this.fixMainData();
    let randomizerData = this.randomizeAllEnemies();
    let preset = {};
    preset.type = "levelEditor";
    preset.data = randomizerData.preset;
    return preset;
  }

  createDefaultMainData = () =>
  {
    let mainData = {};
    mainData.seed = this.getDateNowInMilliseconds();
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

