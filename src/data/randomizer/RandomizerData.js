import level1EnemyGroup from "../level/Level1EnemyGroup";
import level2EnemyGroup from "../level/Level2EnemyGroup";
import level3EnemyGroup from "../level/Level3EnemyGroup";
import level4EnemyGroup from "../level/Level4EnemyGroup";
import level5EnemyGroup from "../level/Level5EnemyGroup";
import level6EnemyGroup from "../level/Level6EnemyGroup";
import level7EnemyGroup from "../level/Level7EnemyGroup";
import level8EnemyGroup from "../level/Level8EnemyGroup";


import weakRandomProfile from "./WeakRandomProfile";
import easyRandomProfile from "./EasyRandomProfile";
import midRandomProfile from "./MidRandomProfile";
import hardRandomProfile from "./HardRandomProfile";
import wildRandomProfile from "./WildRandomProfile";
import restInPainRandomProfile from "./RestInPainRandomProfile";

import randomizerEnemyStrategy from "./RandomizerEnemyStrategy";


const randomizerData = 
{
	randomProfile:
	{
		weak: weakRandomProfile,
		easy: easyRandomProfile,
		mid: midRandomProfile,
		hard: hardRandomProfile,
		wild: wildRandomProfile,
		restInPain: restInPainRandomProfile,
	},
	enemyStrategy:
	{
		enemies:
		{
			label: "Randomize Any Normal Enemies",
			enemyKeys: randomizerEnemyStrategy.enemies,
		},
		enemiesNoDrop:
		{
			label: "Randomize Any Normal Enemies (No Thetis)",
			enemyKeys: randomizerEnemyStrategy.enemiesNoDrop,
		},
		dropEnemies:
		{
			label: "Randomize Any Thetis Only",
			enemyKeys: randomizerEnemyStrategy.dropEnemies,
		},
		dropFoodEnemiesOrBoss:
		{
			label: "Randomize Food Thetis or Bakene 1st Form",
			enemyKeys: randomizerEnemyStrategy.dropFoodEnemiesOrBoss
		},
		crystalEnemies:
		{
			label: "Force Thetis Crystal Drop",
			enemyKeys: randomizerEnemyStrategy.crystalEnemies
		},
		enemiesAndBosses: 
		{
			label: "Randomize Any Enemy Or Boss",
			enemyKeys: randomizerEnemyStrategy.enemiesAndBosses,
		},
		bossesOnly:
		{
			label: "Randomize Any Boss Only",
			enemyKeys: randomizerEnemyStrategy.bossesOnly,
		},
		ungrabbableEnemies:
		{
			label: "Ungrabable Enemies Only",
			enemyKeys: randomizerEnemyStrategy.ungrabbableEnemies,
		},
		foodItems:
		{
			label: "Randomize Any Food Item",
			enemyKeys: randomizerEnemyStrategy.foodItems,
		},
		anyItem:
		{
			label: "Randomize Any Item",
			enemyKeys: randomizerEnemyStrategy.anyItem,
		}
	},
	positionStrategy:
	{
		outsideLeft: [-130, -70],
		inside: [80, 240],
		outsideRight: [390, 450]
	},
	levels:
	{
		keys: ["level1", "level2", "level3", "level4",
				"level5", "level6", "level7", "level8"],
		labels: ["Level 1", "Level 2", "Level 3", "Level 4",
				"Level 5", "Level 6", "Level 7", "Level 8"]
	},
	enemyGroups:
	{
		level1: level1EnemyGroup,
		level2: level2EnemyGroup,
		level3: level3EnemyGroup,
		level4: level4EnemyGroup,
		level5: level5EnemyGroup,
		level6: level6EnemyGroup,
		level7: level7EnemyGroup,
		level8: level8EnemyGroup
	},
	enemyBytePattern:
	[
		"RR", "RR",								// Stage position spawn trigger.

		"03", "00", "48", "02",		// Locked values.

		"RR", "00", "00", "00",		// Enemy ID + locked values.

		"RR", "RR", "RR", "RR",		// Position X and Y.

		"RR", "00"								// Posture and Color.
	]
}


export default randomizerData;