import romService from "./ROMService";
import levelExpansionService from "./LevelExpansionService";
import modificationService from "./ModificationService";

import objectUtil from '../data/ObjectUtil';
import patchMap from "../data/patch/PatchMap";
import enemyBytesMap from "../data/EnemyBytesMap";
import randomizerData from "../data/randomizer/RandomizerData";
import levelDefaultData from "../data/level/LevelDefaultData";

import randomizerEnemyStrategy from
		"../data/randomizer/RandomizerEnemyStrategy";


class RandomizerService
{
	constructor()
	{
		this.mainData = this.createDefaultMainData();
		this.randomizerLevelTexts =
		{
			meek: "** Meek **",
			kind: "** Kind **",
			weak: "** Weak **",
			easy: "** Easy **",
			mid: "** Mid  **",
			hard: "** Hard **",
			wild: "** Wild **",
			restInPain: "** RIP **",
			custom: "* Custom *"
		}
	}

	createRandomizerPatch = () =>
	{
		this.fixSeed();
		this.fixRandomProfile();
		this.fixMainData();
		let randomizedData = this.randomizeAllEnemies();
		let patch = {};
		patch.type = "build";
		patch.filename = "bpsm945a.u45";
		patch.byteFormat = "hex";
		patch.buildStart = 197974;
		patch.buildEnd = 229311;			// 229375
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
		let id = 10;				// 10, so bosses are not replaced.
		this.sameTriggerPosition = null;
		let rdld = randomizerData.enemyGroups[levelKey];
		let rdes = randomizerData.enemyStrategy;
		let enemyGroup = rdld[enemyGroupKey];

		Object.keys(rdes).forEach((e) =>
		{
			let enemyStrategy = rdes[e];
			let amount = parseInt(mdeg[e]);
			amount = isNaN(amount) ? 0 : amount;

			for(let i = 1; i <= amount; i++)
			{
				let enemy = this.randomizeEnemy(enemyGroup, enemyStrategy, randomizer);
				let bytes = this.convertEnemyDataToBytes(enemy);
				let hasDelay = !enemyGroup.ignoreSpawnDelay && i % 5 == 0;
				bytes = hasDelay ? bytes.concat(this.getDelayBytes(20)) : bytes;
				enemies.preset[id] = enemy;
				enemies.patch[id++] = bytes;
			}
		});

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
			let random = this.getRandomIntValue(randomizer, 0, fields.length - 1);
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

		let random = this.getRandomIntValue(randomizer, 0, vks.length - 1);
		return vks[random];
	}

	convertEnemyDataToBytes = (enemy) =>
	{
		let enemyBytes = enemyBytesMap[enemy.enemyKey].slice();
		let hexTP = romService.convertNumberToROMBytes(enemy.triggerPosition, 2);
		let hexPX = romService.convertNumberToROMBytes(enemy.positionX, 2);
		let hexPY = romService.convertNumberToROMBytes(enemy.positionY, 2);

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
		let hexBytes = romService.convertNumberToROMBytes(frameAmount, 2);
		return ["00", "00", "03", "00", "6A", "00", hexBytes[0], hexBytes[1]];
	}

	addToModificationQueue = () =>
	{
		modificationService.add(150, "randomizer", this.applyRandomizer);
	}

	applyRandomizer = () =>
	{
		let randomizerPatch = this.createRandomizerPatch();
		let les = levelExpansionService;

		romService.applyPatch(patchMap.areaImprovementPatch.patch);
		romService.applyPatch(patchMap.level1RemakePatch.patch);
		romService.applyPatch(patchMap.extraLevelPatch.patch);
		romService.applyPatch(patchMap.timeImprovementPatch.patch);
		romService.applyPatch(patchMap.foodImprovementPatch.patch);

		romService.applyPatch(patchMap.sailorColorExpansionPatch.patch);
		romService.applyPatch(patchMap.playerHealthImprovementPatch.patch);

		romService.applyPatch(patchMap.enemyColorExpansionPatch.patch);
		romService.applyPatch(patchMap.thetisImprovementPatch.patch);
		romService.applyPatch(patchMap.jumouImprovementPatch.patch);
		romService.applyPatch(patchMap.bakeneImprovementPatch.patch);
		
		romService.applyPatch(patchMap.featuresAndFixesPatch.patch);
		romService.applyPatch(patchMap.sailorImprovementPatch.patch);
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
			let crp = randomizerData.randomProfile.custom;
			let l = this.forceGetField(crp, levelKey);
			return this.forceGetField(l, groupKey);
		}
		
		return {};
	}

	createRandomizerTextPatch = () =>
	{
		let patch = Object.assign({}, patchMap.randomizerTextPatch.patch);
		patch.data = Object.assign({}, patchMap.randomizerTextPatch.patch.data);
		let sbs = this.getSeedTextBytes(patch);
		let lbs = this.getRandomProfileTextBytes();
		patch.data[patch.seedByteIndex.toString()] = sbs;
		patch.data[patch.levelByteIndex.toString()] = lbs;
		return patch;
	}

	getRandomProfileTextBytes = () =>
	{
		let lt = this.randomizerLevelTexts[this.mainData.randomProfile];
		return romService.convertStringToROMBytes(lt);
	}

	getSeedTextBytes = (patch) =>
	{
		let st = this.mainData.seed.toString();
		st = "*".repeat(patch.seedSize) + " " + st + " " + "*".repeat(patch.seedSize);
		let remove = (st.length - patch.seedSize) / 2;
		st = st.substring(remove, st.length - remove);
		st = st.length > patch.seedSize ? st.substring(0, patch.seedSize) : st;
		return romService.convertStringToROMBytes(st);
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
		s = isNaN(s) ? Date.now().valueOf() : s;
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

	setEnemyGroupMaxAmount = (levelKey, groupKey, strategyKey, amount) =>
	{
		let rp = randomizerData.randomProfile.custom;
		let l = this.forceGetField(rp, levelKey);
		let g = this.forceGetField(l, groupKey);
		let s = this.forceGetField(g, strategyKey);
		s.randomMaxAmount = amount;
	}

	setEnemyGroupMinAmount = (levelKey, groupKey, strategyKey, amount) =>
	{
		let rp = randomizerData.randomProfile.custom;
		let l = this.forceGetField(rp, levelKey);
		let g = this.forceGetField(l, groupKey);
		let s = this.forceGetField(g, strategyKey);
		s.randomMinAmount = amount;
	}

	getDateNowInMilliseconds = () =>
	{
		return Date.now().valueOf();
	}

	getMainData = () =>
	{
		return this.mainData;
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
			let rsts;

			if(this.mainData.randomProfile === "custom")
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
		let eg = this.forceGetField(level, enemyGroupKey);
		objectUtil.removeAllProperties(eg);
		let total = 0;
		
		Object.keys(randomStrategies).forEach((e) =>
		{
			let es = randomStrategies[e];
			let min = parseInt(es.randomMinAmount);
			let max = parseInt(es.randomMaxAmount);
			min = (isNaN(min) || min < 0) ? 0 : min;
			max = (isNaN(max) || max < 0) ? 0 : max;
			min = (max - min) < 0 ? 0 : min;
			max = (max - min) < 0 ? 0 : max;
			let amount = this.getRandomIntValue(randomizer, min, max);
			total += amount;
			eg[e] = amount;
		});

		// Ensures at least one enemy will be randomized in the group.
		if(total < 1)
			eg.enemiesAndBosses = 1;
	}

	applyPresetFile = (presetFile) =>
	{
		let json = JSON.parse(presetFile);

		if(json && json.data && json.type === "randomizer")
		{
			this.mainData = this.mainData ? this.mainData : {};
			Object.assign(this.mainData, json.data);
			delete this.mainData.customRandomProfile;
			let custom = json.data.customRandomProfile;
			custom = custom ? custom : {};
			Object.assign(randomizerData.randomProfile.custom, custom);
			randomizerData.randomProfile.custom.label = "Custom";
		}
	}
	
	createRandomizerPreset = () =>
	{
		let csr = randomizerData.randomProfile.custom;
		let preset = {};
		preset.type = "randomizer";
		preset.data = objectUtil.deepCopy(this.mainData);

		if(this.mainData.randomProfile === "custom")
		{
			preset.data.customRandomProfile = objectUtil.deepCopy(csr);
			delete preset.data.customRandomProfile.label;
		}

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

				if(bossGroups.has(egk))		// Force level default boss
					pg = Object.assign(pg, lddl[egk])

				Object.keys(pg).forEach((id) =>		// Fix all enemy ids
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

	setCustomRandomProfileToDefault = () =>
	{
		randomizerData.randomProfile.custom = {label: "Custom"};
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