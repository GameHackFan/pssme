import romService from "./ROMService";
import levelExpansionService from
    "./LevelExpansionService";

import objectUtil from '../data/ObjectUtil';

import imageMap from "../data/ImageMap";
import mergeImages from '../api/merge-images.js';
import patchMap from "../data/patch/PatchMap";
import enemyBytesMap from "../data/EnemyBytesMap";
import levelDefaultData from
    "../data/level/LevelDefaultData";
import levelEditorLevels from
    "../data/level/LevelEditorLevels";
import levelEditorEnemies from
    "../data/level/LevelEditorEnemies";


class LevelEditorService
{
  constructor()
  {
    this.mainData = objectUtil.deepCopy(
        levelDefaultData);
  }

  createLevelEditorPatch = () =>
  {
    let patch = {};
    patch.data = {};
    this.applyDataToPatch(patch);
    patch.type = "build";
    patch.byteFormat = "hex";
    patch.buildStart = 197974;
    patch.buildEnd = 215935;
    patch.filename = "bpsm945a.u45";
    return patch;
  }

  applyDataToPatch = (patch) =>
  {
    let egs = levelEditorLevels;

    Object.keys(this.mainData).forEach((lk) =>
    {
      let level = this.mainData[lk];
      let lel = levelEditorLevels[lk];

      Object.keys(level).forEach((egk) =>
      {
        let enemyGroup = level[egk];
        let leeg = lel.groups[egk];

        let byteStart = leeg.levelEditorStartPosition;
        byteStart = isNaN(byteStart) ?
            leeg.startPosition : byteStart;
        let byteEnd = leeg.levelEditorEndPosition;
        byteEnd = isNaN(byteEnd) ?
            leeg.endPosition : byteEnd;
        let byteKey = byteStart + "_" + byteEnd;

        this.forceEnemy(lk, egk,
            Object.keys(enemyGroup).length);
        let enemies = this.getEnemiesBytesFromGroup(
            enemyGroup, leeg);
        
        patch.data[byteKey] = enemies;
      });
    });
  }

  applyData = () =>
  {
    romService.applyPatch(
        patchMap.levelEditorTextPatch.patch);
    romService.applyPatch(
        this.createLevelEditorPatch());
    romService.applyPatch(
        levelExpansionService.createLevelFixPatch());
    romService.applyPatch(levelExpansionService.
        createBossHelpersFixPatch());
    romService.applyPatch(levelExpansionService.
        createBossFightsFixPatch());
  }

  addEnemy = (levelKey, enemyGroupKey) =>
  {
    let id = 0;

    while(this.mainData[levelKey][enemyGroupKey][id])
      id++;

    this.mainData[levelKey][enemyGroupKey][id] = {};
    let e = this.mainData[levelKey][enemyGroupKey][id];
    e.enemyKey = "thetisLightBlue";
    e.triggerPosition = 0;
    e.positionX = 0;
    e.positionY = 200;
  }

  getEnemiesBytesFromGroup = (enemyGroup,
      levelEditorEnemyGroup) =>
  {
    let enemies = [];

    Object.keys(enemyGroup).forEach((ek) =>
    {
      let enemy = enemyGroup[ek];
      this.fixEnemyData(enemy,
          enemyGroup, levelEditorEnemyGroup);
      let enemyBytes =
          enemyBytesMap[enemy.enemyKey].slice();

      let hex = romService.convertNumberToROMBytes(
          enemy.triggerPosition, 2);
      enemyBytes[0] = hex[0];
      enemyBytes[1] = hex[1];
      
      hex = romService.convertNumberToROMBytes(
          enemy.positionX, 2);
      enemyBytes[10] = hex[0];
      enemyBytes[11] = hex[1];

      hex = romService.convertNumberToROMBytes(
          enemy.positionY, 2);
      enemyBytes[12] = hex[0];
      enemyBytes[13] = hex[1];
      enemies.push(enemyBytes);
    });

    return enemies;
  }

  setEnemyKey = (levelKey,
      enemyGroupKey, enemyId, enemyKey) =>
  {
    let enemy = this.getEnemy(
        levelKey, enemyGroupKey, enemyId);
    enemy.enemyKey = enemyKey;
  }

  setEnemyTriggerPosition = (levelKey,
      enemyGroupKey, enemyId, triggerPosition) =>
  {
    let enemy = this.getEnemy(
        levelKey, enemyGroupKey, enemyId);
    enemy.triggerPosition = triggerPosition;
  }

  setEnemyPositionX = (levelKey,
      enemyGroupKey, enemyId, positionX) =>
  {
    let enemy = this.getEnemy(
        levelKey, enemyGroupKey, enemyId);
    enemy.positionX = positionX;
  }

  setEnemyPositionY = (levelKey,
      enemyGroupKey, enemyId, positionY) =>
  {
    let enemy = this.getEnemy(
        levelKey, enemyGroupKey, enemyId);
    enemy.positionY = positionY;
  }

  getEnemy = (levelKey, enemyGroupKey, enemyId) =>
  {
    let l = this.getField(this.mainData, levelKey);
    let eg = this.getField(l, enemyGroupKey);
    return this.getField(eg, enemyId);
  }

  getEnemies = (levelKey, enemyGroupKey) =>
  {
    let l = this.getField(this.mainData, levelKey);
    return this.getField(l, enemyGroupKey);
  }

  removeEnemy = (levelKey, enemyGroupKey, enemyId) =>
  {
    let eg = this.mainData[levelKey][enemyGroupKey];

    if(eg && enemyId && eg[enemyId])
      delete eg[enemyId];
  }

  fixEnemyData = (enemy, enemyGroup,
      levelEditorEnemyGroup) =>
  {
    enemy.triggerPosition = this.getValidValue(
        enemy.triggerPosition,        levelEditorEnemyGroup.screenPositionStart,
        levelEditorEnemyGroup.screenPositionEnd);    
    enemy.positionY = this.getValidValue(
        enemy.positionY,
        levelEditorEnemyGroup.walkablePositionYTop,
        levelEditorEnemyGroup.walkablePositionYBottom);
  }

  forceEnemy = (levelKey, enemyGroupKey,
      enemyAmount) =>
  {
    if(enemyAmount < 1)
    {
      let lm = levelEditorLevels[levelKey].groups;
      let tp = lm[enemyGroupKey].screenPositionStart
      let level = this.mainData[levelKey];
      level[enemyGroupKey][0] = this.createThetis(tp);
    }
  }

  createLevelImage = (levelKey, enemyGroupKey,
      enemyId, callback) =>
  {
    let level = this.getField(this.mainData, levelKey);
    let eg = this.getField(level, enemyGroupKey);
    let lel = this.getField(
        levelEditorLevels, levelKey);
    let leeg = this.getField(
        lel.groups, enemyGroupKey);

    if(!this.isAnythingEmpty([level, lel, leeg]))
    {
      let enemy = this.getField(eg, enemyId);
      let mergeData = [];
      mergeData = mergeData.concat(
          this.getLevelMergeData(leeg));
      mergeData = mergeData.concat(
          this.getNonSelectedEnemiesMergeData(
              enemyId, enemy, eg, leeg));
      mergeData = mergeData.concat(
          this.getSelectedEnemyMergeData(enemy, leeg));
      mergeData = mergeData.concat(
          this.getCameraFOVMergeData(enemy, leeg));
      mergeData = mergeData.concat(
          this.getGroupLimitsMergeData(eg, leeg));
      mergeImages(mergeData).then((base64) =>
      {
        if(callback)
          callback(base64);
      });
    }
    else
      callback(null);
  }

  getNonSelectedEnemiesMergeData = (enemyId,
      enemy, enemyGroup, levelEditorEnemyGroup) =>
  {
    let ids = Object.keys(enemyGroup);
    let leeg = levelEditorEnemyGroup;
    let mergeData = [];
    ids.sort((a, b) =>
    {
      let va = this.getValidValue(
          enemyGroup[a].positionY,
          leeg.walkablePositionYTop,
          leeg.walkablePositionYBottom);
      let vb = this.getValidValue(
          enemyGroup[b].positionY,
          leeg.walkablePositionYTop,
          leeg.walkablePositionYBottom);
      return va - vb;
    });
    ids.forEach((id) =>
    {
      if(id !== enemyId)
      {
        let nsEnemy = enemyGroup[id];
        let enemyData = this.getEnemyMergeObject(
            nsEnemy, leeg);
        enemyData.opacity = 0.7;
        mergeData.push(enemyData);
      }
    });
    return mergeData;
  }

  getGroupLimitsMergeData = (levelEditorLevel,
      levelEditorEnemyGroup) =>
  {
    let mergeData = [];
    let leeg = levelEditorEnemyGroup;
    let lee = levelEditorEnemies;
    let glImg = imageMap["groupLimit"];
    let glHW = lee["groupLimit"].width / 2;
    let shiftX = this.tryGetField(leeg,
        "levelEditorShiftX", 0) - glHW;
    let py = this.tryGetField(leeg,
        "levelEditorShiftY", 0);
    mergeData.push({src: glImg, opacity: 0.7, y: py,
      x: leeg.levelEditorLimitStart + shiftX});
    mergeData.push({src: glImg, opacity: 0.7, y: py,
      x: leeg.levelEditorLimitEnd + shiftX});
    return mergeData;
  }

  getEnemyMergeObject = (
      enemy, levelEditorEnemyGroup) =>
  {
    let lee = levelEditorEnemies;
    let leEnemy = lee[enemy.enemyKey];

    if(enemy && leEnemy)
    {
      let leeg = levelEditorEnemyGroup;
      let enemyImg = imageMap[enemy.enemyKey];
      let px = parseInt(enemy.triggerPosition);
      px = px ? px : 0;
      let shift = this.tryGetField(leeg,
          "levelEditorShiftX", 0);
      shift -= lee["cameraFOV"].width / 2;
      px = px + shift;
      shift = parseInt(enemy.positionX);
      shift = shift ? shift : 0;
      px = (px + shift) - leEnemy.pivotX;
      shift = this.tryGetField(leeg,
          "levelEditorShiftY", 0);
      let py = this.getValidValue(enemy.positionY,
          leeg.walkablePositionYTop,
          leeg.walkablePositionYBottom);
      py = (py + shift) - leEnemy.pivotY;
      return {src: enemyImg, x: px, y: py};
    }

    return {};
  }

  getCameraFOVMergeData = (
      enemy, levelEditorEnemyGroup) =>
  {
    let lee = levelEditorEnemies;
    let leEnemy = lee[enemy.enemyKey];

    if(enemy && leEnemy)
    {
      let leeg = levelEditorEnemyGroup;
      let shift = this.tryGetField(leeg,
          "levelEditorShiftX", 0);
      shift -= lee["cameraFOV"].width / 2;
      let px = parseInt(enemy.triggerPosition);
      px = px ? px + shift : shift;
      let py = this.tryGetField(leeg,
          "levelEditorShiftY", 0);
      return [{src: imageMap["cameraFOV"],
          opacity: 0.7, x: px, y: py}];
    }

    return [];
  }

  getSelectedEnemyMergeData = (
    enemy, levelEditorEnemyGroup) =>
  {
    let emo = this.getEnemyMergeObject(enemy,
        levelEditorEnemyGroup);
    
    if(!this.isAnythingEmpty([emo]))
      return [emo];

    return [];
  }

  getLevelMergeData = (levelEditorEnemyGroup) =>
  {
    let image =
        imageMap[levelEditorEnemyGroup.background];

    if(image)
      return [{src: image, x: 0, y: 0}];
    
    return [];
  }

  tryGetField = (object, field, def) =>
  {
    let value = object ? object[field] : null;
    return value ? value : def;
  }

  applyPresetFile = (presetFile) =>
  {
    let json = JSON.parse(presetFile);

    if(json && json.data &&
        json.type === "levelEditor")
    {
      this.mainData = json.data;
    }
  }

  createPresetFile = () =>
  {
    let preset = {};
    preset.type = "levelEditor";
    preset.data = objectUtil.deepCopy(this.mainData);
    console.log(preset.data);
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
    let thetis = {};
    thetis.enemyKey = "thetisLightBlue";
    thetis.triggerPosition = triggerPosition;
    thetis.positionX = 500;
    thetis.positionY = 210;
    return thetis;
  }

  getField = (object, field) =>
  {
    let fixedObject = object ? object : {};
    let content = field ? fixedObject[field] : {};
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

  getMainData = () =>
  {
    return this.mainData;
  }

  setMainDataToDefault = () =>
  {
    this.mainData = objectUtil.deepCopy(
        levelDefaultData);
  }
}


const levelEditorService = new LevelEditorService();
export default levelEditorService;