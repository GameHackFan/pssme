import romService from "./ROMService";
import levelExpansionService from "./LevelExpansionService";

import objectUtil from '../data/ObjectUtil';

import imageMap from "../data/ImageMap";
import mergeImages from '../api/merge-images.js';
import patchMap from "../data/patch/PatchMap";
import enemyBytesMap from "../data/EnemyBytesMap";
import levelDefaultData from "../data/level/LevelDefaultData";
import levelEditorLevels from "../data/level/LevelEditorLevels";
import levelEditorEnemies from "../data/level/LevelEditorEnemies";


class LevelEditorService
{
	constructor()
	{
		this.mainData = objectUtil.deepCopy(levelDefaultData);
	}

	createLevelEditorPatch = () =>
	{
		let patch = {};
		patch.data = {};
		patch.type = "build";
		patch.byteFormat = "hex";
		patch.buildStart = 197714;
		patch.buildEnd = 229375;
		patch.filename = "bpsm945a.u45";
		this.applyDataToPatch(patch);
		return patch;
	}

	applyDataToPatch = (patch) =>
	{
		Object.keys(this.mainData).forEach((lk) =>
		{
			let level = this.mainData[lk];
			let lel = levelEditorLevels[lk];

			Object.keys(level).forEach((egk) =>
			{
				let enemyGroup = level[egk];
				let leeg = lel.groups[egk];

				if(!leeg.disabled)
				{
					let byteStart = leeg.levelEditorStartPosition;
					byteStart = isNaN(byteStart) ? leeg.startPosition : byteStart;
					let byteEnd = leeg.levelEditorEndPosition;
					byteEnd = isNaN(byteEnd) ? leeg.endPosition : byteEnd;
					let byteKey = byteStart + "_" + byteEnd;

					this.forceEnemy(lk, egk, Object.keys(enemyGroup).length);
					let enemies = this.getEnemiesBytesFromGroup(enemyGroup, leeg);
					
					patch.data[byteKey] = enemies;
				}
			});
		});
	}

	applyData = () =>
	{
		let les = levelExpansionService;
		romService.applyPatch(patchMap.areaImprovementPatch.patch);
		romService.applyPatch(patchMap.enemyColorExpansionPatch.patch);
		romService.applyPatch(patchMap.sailorColorExpansionPatch.patch);
		romService.applyPatch(patchMap.featuresAndFixesPatch.patch);
		romService.applyPatch(patchMap.levelEditorTextPatch.patch);
		romService.applyPatch(patchMap.removeCPUDemoPatch.patch);
		romService.applyPatch(this.createLevelEditorPatch());
		romService.applyPatch(les.createLevelFixPatch());
		romService.applyPatch(les.createBossHelpersFixPatch());
		romService.applyPatch(les.createBossFightsFixPatch());
		romService.applyPatch(les.createLevelShiftPatch())
	}

	addEnemy = (levelKey, enemyGroupKey) =>
	{
		let eg = this.mainData[levelKey][enemyGroupKey];
		let leeg = levelEditorLevels[levelKey].groups[enemyGroupKey];
		let id = Object.keys(eg).length.toString();
		eg[id] = this.createThetis(leeg.screenPositionStart);
		return id;
	}

	getEnemiesBytesFromGroup = (enemyGroup, levelEditorEnemyGroup) =>
	{
		this.removeExtraEnemies(enemyGroup);
		let enemies = [];

		Object.keys(enemyGroup).forEach((ek) =>
		{
			let enemy = enemyGroup[ek];
			this.fixEnemyData(enemy, enemyGroup, levelEditorEnemyGroup);
			let enemyBytes = enemyBytesMap[enemy.enemyKey].slice();

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
		let enemy = this.getEnemy(levelKey, enemyGroupKey, enemyId);
		enemy.enemyKey = enemyKey;
	}

	setEnemyTriggerPosition = (levelKey,
			enemyGroupKey, enemyId, triggerPosition) =>
	{
		let enemy = this.getEnemy(levelKey, enemyGroupKey, enemyId);
		enemy.triggerPosition = triggerPosition;
	}

	setEnemyPositionX = (levelKey, enemyGroupKey, enemyId, positionX) =>
	{
		let enemy = this.getEnemy(levelKey, enemyGroupKey, enemyId);
		enemy.positionX = positionX;
	}

	setEnemyPositionY = (levelKey, enemyGroupKey, enemyId, positionY) =>
	{
		let enemy = this.getEnemy(levelKey, enemyGroupKey, enemyId);
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
		{
			delete eg[enemyId];
			let ids = Object.keys(eg);
			let e = ids.map((key) => {return eg[key];});
			this.mainData[levelKey][enemyGroupKey] = {}
			eg = this.mainData[levelKey][enemyGroupKey];
			e.forEach((enemy, id) => {eg[id.toString()] = enemy;});
		}
	}

	removeExtraEnemies = (enemyGroup) =>
	{
		let maxEnemies = 14;
		let enemyMap = Object.keys(enemyGroup);

		while(enemyMap.length > maxEnemies)
		{
			let key = enemyMap.pop();
			delete enemyGroup[key];
			enemyMap = Object.keys(enemyGroup);
		}
	}

	fixEnemyData = (enemy, enemyGroup, levelEditorEnemyGroup) =>
	{
		enemy.triggerPosition = this.getValidValue(enemy.triggerPosition,
				levelEditorEnemyGroup.screenPositionStart,
				levelEditorEnemyGroup.screenPositionEnd);    
		enemy.positionY = this.getValidValue(enemy.positionY,
				levelEditorEnemyGroup.walkablePositionYTop,
				levelEditorEnemyGroup.walkablePositionYBottom);
		enemy.positionX = this.getValidValue(enemy.positionX, -130, 450);
	}

	forceEnemy = (levelKey, enemyGroupKey, enemyAmount) =>
	{
		if(enemyAmount < 1)
		{
			let lm = levelEditorLevels[levelKey].groups;
			let tp = lm[enemyGroupKey].screenPositionStart
			let level = this.mainData[levelKey];
			level[enemyGroupKey][0] = this.createThetis(tp);
		}
	}

	createLevelImage = (levelKey, enemyGroupKey, enemyId, callback) =>
	{
		let level = this.getField(this.mainData, levelKey);
		let eg = this.getField(level, enemyGroupKey);
		let lel = this.getField(levelEditorLevels, levelKey);
		let leeg = this.getField(lel.groups, enemyGroupKey);

		if(!this.isAnythingEmpty([level, lel, leeg]))
		{
			let enemy = this.getField(eg, enemyId);
			let mergeData = [];
			mergeData = mergeData.concat(this.getLevelMergeData(leeg));
			mergeData = mergeData.concat(
					this.getNonSelectedEnemiesMergeData(enemyId, enemy, eg, leeg));
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
				let enemyData = this.getEnemyMergeObject(nsEnemy, leeg);
				enemyData.opacity = 0.7;
				mergeData.push(enemyData);
			}
		});
		return mergeData;
	}

	getGroupLimitsMergeData = (levelEditorEnemyGroup) =>
	{
		let mergeData = [];
		let leeg = levelEditorEnemyGroup;
		let lee = levelEditorEnemies;
		let glImg = imageMap["groupLimit"];
		let glHW = lee["groupLimit"].width / 2;
		let shiftX = this.tryGetField(leeg, "levelEditorShiftX", 0) - glHW;
		let py = this.tryGetField(leeg, "levelEditorShiftY", 0);
		mergeData.push({src: glImg, opacity: 0.7, y: py,
				x: leeg.levelEditorLimitStart + shiftX});
		mergeData.push({src: glImg, opacity: 0.7, y: py,
				x: leeg.levelEditorLimitEnd + shiftX});
		return mergeData;
	}

	getEnemyMergeObject = (enemy, levelEditorEnemyGroup) =>
	{
		let lee = levelEditorEnemies;
		let leEnemy = lee[enemy.enemyKey];

		if(enemy && leEnemy)
		{
			let leeg = levelEditorEnemyGroup;
			let enemyImg = imageMap[enemy.enemyKey];
			let px = parseInt(enemy.triggerPosition);
			px = px ? px : 0;
			let shift = this.tryGetField(leeg, "levelEditorShiftX", 0);
			shift -= lee["cameraFOV"].width / 2;
			px = px + shift;
			shift = parseInt(enemy.positionX);
			shift = shift ? shift : 0;
			px = (px + shift) - leEnemy.pivotX;
			shift = this.tryGetField(leeg, "levelEditorShiftY", 0);
			let py = this.getValidValue(enemy.positionY,
					leeg.walkablePositionYTop,
					leeg.walkablePositionYBottom);
			py = (py + shift) - leEnemy.pivotY;
			return {src: enemyImg, x: px, y: py};
		}

		return {};
	}

	getCameraFOVMergeData = (enemy, levelEditorEnemyGroup) =>
	{
		let lee = levelEditorEnemies;
		let leEnemy = lee[enemy.enemyKey];

		if(enemy && leEnemy)
		{
			let leeg = levelEditorEnemyGroup;
			let shift = this.tryGetField(leeg, "levelEditorShiftX", 0);
			shift -= lee["cameraFOV"].width / 2;
			let px = parseInt(enemy.triggerPosition);
			px = px ? px + shift : shift;
			let py = this.tryGetField(leeg, "levelEditorShiftY", 0);
			return [{src: imageMap["cameraFOV"], opacity: 0.7, x: px, y: py}];
		}

		return [];
	}

	getSelectedEnemyMergeData = (enemy, levelEditorEnemyGroup) =>
	{
		let emo = this.getEnemyMergeObject(enemy, levelEditorEnemyGroup);
		return !this.isAnythingEmpty([emo]) ? [emo] : [];
	}

	getLevelMergeData = (levelEditorEnemyGroup) =>
	{
		let image = imageMap[levelEditorEnemyGroup.background];
		return image ? [{src: image, x: 0, y: 0}] : [];
	}

	tryGetField = (object, field, def) =>
	{
		let value = object ? object[field] : null;
		return value ? value : def;
	}

	applyPresetFile = (presetFile) =>
	{
		let json = JSON.parse(presetFile);

		if(json && json.data && json.type === "levelEditor")
			this.mainData = Object.assign(this.mainData, json.data);
	}

	createPresetFile = () =>
	{
		let preset = {};
		preset.type = "levelEditor";
		preset.data = objectUtil.deepCopy(this.mainData);
		delete preset.data.filename;
		return preset;
	}

	getEnemySelectList = (level, enemyGroup, enemyId, filter) =>
	{
		let enemieKeys = Object.keys(levelEditorEnemies);
		
		// Removes the cameraFOV, groupLimit.
		for(let i = 0; i < 2; i++)
			enemieKeys.pop();
		
		if(filter)
		{
			const filterLower = filter.toLowerCase();
			let selected = levelEditorService.getEnemy(level, enemyGroup, enemyId);

			let filtered = enemieKeys.filter((ek) =>
			{
				return levelEditorEnemies[ek].label.toLowerCase().
						includes(filterLower) || ek === selected.enemyKey;
			});

			return filtered;
		}

		return enemieKeys;
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
		thetis.positionX = 450;
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
		this.mainData = objectUtil.deepCopy(levelDefaultData);
	}
}


const levelEditorService = new LevelEditorService();
export default levelEditorService;
