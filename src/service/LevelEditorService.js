import { levelExpansionService } from "./LevelExpansionService";
import { modificationService } from "./ModificationService";
import { romService } from "./ROMService";
import { objectUtil } from '../data/default/ObjectUtil';
import { imageMap } from "../data/default/ImageMap";
import { patchMap } from "../data/patch/PatchMap";
import { enemyBytesMap } from "../data/default/EnemyBytesMap";
import { levelDefaultData } from "../data/level/LevelDefaultData";
import { levelEditorLevels } from "../data/level/LevelEditorLevels";
import { levelEditorEnemies } from "../data/level/LevelEditorEnemies";
import mergeImages from '../api/merge-images.js';


class LevelEditorService
{
  createLevelEditorPatch = () =>
  {
    const patch = {};
    patch.data = {};
    patch.type = "build";
    patch.byteFormat = "hex";
    patch.buildStart = 197974;
    patch.buildEnd = 229311;      // 229375
    patch.filename = "bpsm945a.u45";
    this.applyDataToPatch(patch);
    return patch;
  }

  applyDataToPatch = (patch) =>
  {
    Object.keys(dataMap).forEach((lk) =>
    {
      const level = dataMap[lk];
      const lel = levelEditorLevels[lk];

      Object.keys(level).forEach((egk) =>
      {
        const enemyGroup = level[egk];
        const leeg = lel.groups[egk];

        if(!leeg.disabled)
        {
          let byteStart = leeg.levelEditorStartPosition;
          byteStart = isNaN(byteStart) ? leeg.startPosition : byteStart;
          let byteEnd = leeg.levelEditorEndPosition;
          byteEnd = isNaN(byteEnd) ? leeg.endPosition : byteEnd;
          const byteKey = byteStart + "_" + byteEnd;

          this.forceEnemy(lk, egk, Object.keys(enemyGroup).length);
          const enemies = this.getEnemiesBytesFromGroup(enemyGroup, leeg);
          
          patch.data[byteKey] = enemies;
        }
      });
    });
  }

  applyData = () =>
  {
    const les = levelExpansionService;
    romService.applyPatch(patchMap.areaImprovementPatch.patch);
    romService.applyPatch(patchMap.enemyColorExpansionPatch.patch);
    romService.applyPatch(patchMap.sailorColorExpansionPatch.patch);
    romService.applyPatch(patchMap.featuresAndFixesPatch.patch);
    romService.applyPatch(patchMap.levelEditorTextPatch.patch);
    romService.applyPatch(patchMap.fixCPUDemoPatch.patch);
    romService.applyPatch(this.createLevelEditorPatch());
    romService.applyPatch(les.createLevelFixPatch());
    romService.applyPatch(les.createBossHelpersFixPatch());
    romService.applyPatch(les.createBossFightsFixPatch());
    romService.applyPatch(les.createLevelShiftPatch());
  }

  addEnemy = (levelKey, enemyGroupKey) =>
  {
    const eg = dataMap[levelKey][enemyGroupKey];
    const leeg = levelEditorLevels[levelKey].groups[enemyGroupKey];
    const enemy = this.createThetis(leeg.screenPositionStart);
    const id = Object.keys(eg).length.toString();
    enemy.id = id;
    eg[id] = enemy;
    return enemy;
  }

  getEnemiesBytesFromGroup = (enemyGroup, levelEditorEnemyGroup) =>
  {
    this.removeExtraEnemies(enemyGroup);
    const enemies = [];

    Object.keys(enemyGroup).forEach((ek) =>
    {
      const enemy = enemyGroup[ek];
      this.fixEnemyData(enemy, levelEditorEnemyGroup);
      const enemyBytes = enemyBytesMap[enemy.enemyKey].slice();

      let hex = romService.convertNumberToROMBytes(enemy.triggerPosition, 2);
      enemyBytes[0] = hex[0];
      enemyBytes[1] = hex[1];
      
      hex = romService.convertNumberToROMBytes(enemy.positionX, 2);
      enemyBytes[10] = hex[0];
      enemyBytes[11] = hex[1];

      hex = romService.convertNumberToROMBytes(enemy.positionY, 2);
      enemyBytes[12] = hex[0];
      enemyBytes[13] = hex[1];
      enemies.push(enemyBytes);
    });

    return enemies;
  }

  setEnemyKey = (levelKey, enemyGroupKey, enemyId, enemyKey) =>
  {
    const enemy = this.getEnemy(levelKey, enemyGroupKey, enemyId);
    enemy.enemyKey = enemyKey;
  }

  setEnemyTriggerPosition = (levelKey,
      enemyGroupKey, enemyId, triggerPosition) =>
  {
    const enemy = this.getEnemy(levelKey, enemyGroupKey, enemyId);
    enemy.triggerPosition = triggerPosition;
  }

  setEnemyPositionX = (levelKey, enemyGroupKey, enemyId, positionX) =>
  {
    const enemy = this.getEnemy(levelKey, enemyGroupKey, enemyId);
    enemy.positionX = positionX;
  }

  setEnemyPositionY = (levelKey, enemyGroupKey, enemyId, positionY) =>
  {
    const enemy = this.getEnemy(levelKey, enemyGroupKey, enemyId);
    enemy.positionY = positionY;
  }

  toggleEnemyNoLevelLimits = (levelKey, enemyGroupKey, enemyId) =>
  {
    const enemy = this.getEnemy(levelKey, enemyGroupKey, enemyId);
    enemy.noLevelLimits = enemy.noLevelLimits ? false : true;
  }

  getEnemy = (levelKey, enemyGroupKey, enemyId) =>
  {
    const l = this.getField(dataMap, levelKey);
    const eg = this.getField(l, enemyGroupKey);
    return this.getField(eg, enemyId);
  }

  getEnemies = (levelKey, enemyGroupKey) =>
  {
    const l = this.getField(dataMap, levelKey);
    return this.getField(l, enemyGroupKey);
  }

  removeEnemy = (levelKey, enemyGroupKey, enemyId) =>
  {
    let eg = dataMap[levelKey][enemyGroupKey];

    if(eg && enemyId && eg[enemyId])
    {
      delete eg[enemyId];
      const ids = Object.keys(eg);
      const e = ids.map((key) => {return eg[key];});
      dataMap[levelKey][enemyGroupKey] = {}
      eg = dataMap[levelKey][enemyGroupKey];
      e.forEach((enemy, id) => {eg[id.toString()] = enemy;});
    }
  }

  removeExtraEnemies = (enemyGroup) =>
  {
    const maxEnemies = 14;
    let enemyMap = Object.keys(enemyGroup);

    while(enemyMap.length > maxEnemies)
    {
      const key = enemyMap.pop();
      delete enemyGroup[key];
      enemyMap = Object.keys(enemyGroup);
    }
  }

  fixEnemyData = (enemy, levelEditorEnemyGroup) =>
  {
    const leeg = levelEditorEnemyGroup;
    const rangeY = this.getPositionYRange(enemy, levelEditorEnemyGroup);
    enemy.triggerPosition = this.getValidValue(enemy.triggerPosition,
        leeg.screenPositionStart, leeg.screenPositionEnd);
    enemy.positionX = this.getValidValue(enemy.positionX, -130, 450);
    enemy.positionY = this.getValidValue(enemy.positionY, rangeY.min, rangeY.max);
  }

  forceEnemy = (levelKey, enemyGroupKey, enemyAmount) =>
  {
    if(enemyAmount < 1)
    {
      const lm = levelEditorLevels[levelKey].groups;
      const tp = lm[enemyGroupKey].screenPositionStart
      const level = dataMap[levelKey];
      const thetis = this.createThetis(tp);
      thetis.id = 0;
      level[enemyGroupKey][0] = thetis;
    }
  }

  getPositionYRange = (enemy, levelEditorEnemyGroup) =>
  {
    const nll = enemy.noLevelLimits === true ? true : false;
    let min = nll ? 0 : levelEditorEnemyGroup.walkablePositionYTop;
    let max = nll ? 65355 : levelEditorEnemyGroup.walkablePositionYBottom;
    return {min: min, max: max};
  }

  createLevelImage = (levelKey, enemyGroupKey, enemyId, callback) =>
  {
    const level = this.getField(dataMap, levelKey);
    const eg = this.getField(level, enemyGroupKey);
    const lel = this.getField(levelEditorLevels, levelKey);
    const leeg = this.getField(lel.groups, enemyGroupKey);

    if(!this.isAnythingEmpty([level, lel, leeg]))
    {
      const enemy = this.getField(eg, enemyId);
      let mergeData = [];
      mergeData = mergeData.concat(this.getLevelMergeData(leeg));
      mergeData = mergeData.concat(
          this.getNonSelectedEnemiesMergeData(enemyId, eg, leeg));
      mergeData = mergeData.concat(
          this.getSelectedEnemyMergeData(enemy, leeg));
      mergeData = mergeData.concat(this.getCameraFOVMergeData(enemy, leeg));
      mergeData = mergeData.concat(this.getGroupLimitsMergeData(leeg));
      mergeImages(mergeData).then((base64) =>
      {
        if(callback)
          callback(base64);
      });
    }
    else
      callback(null);
  }

  getNonSelectedEnemiesMergeData = (enemyId, enemyGroup, levelEditorEnemyGroup) =>
  {
    const ids = Object.keys(enemyGroup);
    const leeg = levelEditorEnemyGroup;
    const mergeData = [];
    ids.sort((a, b) =>
    {
      const aRY = this.getPositionYRange(enemyGroup[a], levelEditorEnemyGroup);
      const bRY = this.getPositionYRange(enemyGroup[b], levelEditorEnemyGroup);
      const va = this.getValidValue(enemyGroup[b].positionY, aRY.min, aRY.max);
      const vb = this.getValidValue(enemyGroup[b].positionY, bRY.min, bRY.max);
      return va - vb;
    });
    ids.forEach((id) =>
    {
      if(id !== enemyId)
      {
        const nsEnemy = enemyGroup[id];
        const enemyData = this.getEnemyMergeObject(nsEnemy, leeg);
        enemyData.opacity = 0.7;
        mergeData.push(enemyData);
      }
    });
    return mergeData;
  }

  getGroupLimitsMergeData = (levelEditorEnemyGroup) =>
  {
    const mergeData = [];
    const leeg = levelEditorEnemyGroup;
    const lee = levelEditorEnemies;
    const glImg = imageMap["groupLimit"];
    const glHW = lee["groupLimit"].width / 2;
    const shiftX = this.tryGetField(leeg, "levelEditorShiftX", 0) - glHW;
    const py = this.tryGetField(leeg, "levelEditorShiftY", 0);
    mergeData.push({src: glImg, opacity: 0.7, y: py,
        x: leeg.levelEditorLimitStart + shiftX});
    mergeData.push({src: glImg, opacity: 0.7, y: py,
        x: leeg.levelEditorLimitEnd + shiftX});
    return mergeData;
  }

  getEnemyMergeObject = (enemy, levelEditorEnemyGroup) =>
  {
    const lee = levelEditorEnemies;
    const leEnemy = lee[enemy.enemyKey];

    if(enemy && leEnemy)
    {
      const leeg = levelEditorEnemyGroup;
      const enemyImg = imageMap[enemy.enemyKey];
      let px = parseInt(enemy.triggerPosition);
      px = px ? px : 0;
      let shift = this.tryGetField(leeg, "levelEditorShiftX", 0);
      shift -= lee["cameraFOV"].width / 2;
      px = px + shift;
      shift = parseInt(enemy.positionX);
      shift = shift ? shift : 0;
      px = (px + shift) - leEnemy.pivotX;
      shift = this.tryGetField(leeg, "levelEditorShiftY", 0);
      const rangeY = this.getPositionYRange(enemy, leeg);
      let py = this.getValidValue(enemy.positionY, rangeY.min, rangeY.max);
      py = (py + shift) - leEnemy.pivotY;
      return {src: enemyImg, x: px, y: py};
    }

    return {};
  }

  getCameraFOVMergeData = (enemy, levelEditorEnemyGroup) =>
  {
    const lee = levelEditorEnemies;
    const leEnemy = lee[enemy.enemyKey];

    if(enemy && leEnemy)
    {
      const leeg = levelEditorEnemyGroup;
      let shift = this.tryGetField(leeg, "levelEditorShiftX", 0);
      shift -= lee["cameraFOV"].width / 2;
      let px = parseInt(enemy.triggerPosition);
      px = px ? px + shift : shift;
      const py = this.tryGetField(leeg, "levelEditorShiftY", 0);
      return [{src: imageMap["cameraFOV"], opacity: 0.7, x: px, y: py}];
    }

    return [];
  }

  getSelectedEnemyMergeData = (enemy, levelEditorEnemyGroup) =>
  {
    const emo = this.getEnemyMergeObject(enemy, levelEditorEnemyGroup);
    return !this.isAnythingEmpty([emo]) ? [emo] : [];
  }

  getLevelMergeData = (levelEditorEnemyGroup) =>
  {
    const image = imageMap[levelEditorEnemyGroup.background];
    return image ? [{src: image, x: 0, y: 0}] : [];
  }

  tryGetField = (object, field, def) =>
  {
    const value = object ? object[field] : null;
    return value ? value : def;
  }

  applyPreset = (preset) =>
  {
    const json = JSON.parse(preset);

    if(json && json.data && json.type === "levelEditor")
      dataMap = Object.assign(dataMap, json.data);
  }

  createPreset = () =>
  {
    const preset = {};
    preset.type = "levelEditor";
    preset.data = objectUtil.deepCopy(dataMap);
    delete preset.data.filename;
    return preset;
  }

  getValidValue = (value, min, max) =>
  {
    let nv = parseInt(value);
    nv = isNaN(nv) ? 0: nv;
    nv = Math.max(nv, min);
    nv = Math.min(nv, max);
    return nv;
  }

  createThetis = (triggerPosition) =>
  {
    return this.createEnemy("thetisLightBlue", triggerPosition);
  }

  createEnemy = (enemyKey, triggerPosition) =>
  {
    if(levelEditorEnemies[enemyKey])
    {
      const enemy = {};
      enemy.id = null;
      enemy.enemyKey = enemyKey;
      enemy.triggerPosition = triggerPosition;
      enemy.positionX = 450;
      enemy.positionY = 210;
      enemy.noLevelLimits = false;
      return enemy;
    }

    return null;
  }

  getField = (object, field) =>
  {
    const fixedObject = object ? object : {};
    const content = field ? fixedObject[field] : {};
    return content ? content : {};
  }

  isAnythingEmpty = (args) =>
  {    
    for(let i = 0; i < args.length; i++)
    {
      if(Object.keys(args[i]).length < 1)
        return true;
    }
    
    return false;
  }

  isValidLevelKey = (levelKey) =>
  {
    return (levelKey in levelEditorLevels);
  }

  isValidEnemyGroupKey = (levelKey, groupKey) =>
  {
    let level = levelEditorLevels[levelKey]?.groups;
    level = level ? level : {}
    return (groupKey in level);
  }

  isValidEnemyKey = (enemyKey) =>
  {
    return (enemyKey in levelEditorEnemies);
  }

  addToModificationQueue = () =>
  {
    modificationService.add(150, "level", this.applyData);
  }

  setDataMapToDefault = () =>
  {
    dataMap = objectUtil.deepCopy(levelDefaultData);
  }

  getUILevelList = () =>
  {
    const keys = Object.keys(levelEditorLevels);
    return keys.map((key) => {return levelEditorLevels[key];});
  }

  getUIEnemyGroupList = (levelKey) =>
  {
    const level = levelEditorLevels[levelKey]?.groups;
    const keys = level ? Object.keys(level) : [];
    const groups = [];
    keys.forEach((key) =>
    {
      const group = level[key];
      const disabled = group?.disabled ? group.disabled : false;

      if(group && !disabled)
        groups.push(group);
    });
    return groups;
  }

  getUIEnemyGroup = (levelKey, groupKey) =>
  {
    const level = levelEditorLevels[levelKey]?.groups;
    const group = level ? level[groupKey] : null;
    return group ? group : {};
  }

  getUIEnemyFilteredList = (filter, level, enemyGroup, enemyId) =>
  {
    const enemieKeys = Object.keys(levelEditorEnemies);
    
    // Removes the cameraFOV, groupLimit.
    for(let i = 0; i < 2; i++)
      enemieKeys.pop();
    
    if(filter)
    {
      const filterLower = filter.toLowerCase();
      const selected = levelEditorService.getEnemy(level, enemyGroup, enemyId);
      const filtered = [];
      enemieKeys.forEach((ek) =>
      {
        const v = levelEditorEnemies[ek].label.toLowerCase().includes(filterLower);

        if(v || ek === selected.enemyKey)
          filtered.push(levelEditorEnemies[ek]);
      });

      return filtered;
    }

    return enemieKeys.map((key) => levelEditorEnemies[key]);
  }

  getUIEnemyAddedList = (levelKey, groupKey) =>
  {
    const level = this.getField(dataMap, levelKey);
    const group = this.getField(level, groupKey);
    return Object.keys(group).map((key) =>
    {
      const enemy = group[key];
      const label = levelEditorEnemies[enemy.enemyKey]?.label;
      return {...enemy, label, id: key};
    });
  }

  constructor()
  {
    dataMap = objectUtil.deepCopy(levelDefaultData);
  }
}


let dataMap;

export const levelEditorService = new LevelEditorService();