// import { level1EnemyGroup } from "../level/Level1EnemyGroup";
import { level2EnemyGroup } from "../level/Level2EnemyGroup";
import { level3EnemyGroup } from "../level/Level3EnemyGroup";
import { level4EnemyGroup } from "../level/Level4EnemyGroup";
import { level5EnemyGroup } from "../level/Level5EnemyGroup";
import { level6EnemyGroup } from "../level/Level6EnemyGroup";
import { level7EnemyGroup } from "../level/Level7EnemyGroup";
import { level8EnemyGroup } from "../level/Level8EnemyGroup";

import { level1REnemyGroup } from "../level/Level1REnemyGroup";
import { extraLevelEnemyGroup } from "../level/ExtraLevelEnemyGroup";

import { meekRandomProfile } from "./MeekRandomProfile";
import { kindRandomProfile } from "./KindRandomProfile";
import { weakRandomProfile } from "./WeakRandomProfile";
import { easyRandomProfile } from "./EasyRandomProfile";
import { fairRandomProfile } from "./FairRandomProfile";
import { midRandomProfile } from "./MidRandomProfile";
import { hardRandomProfile } from "./HardRandomProfile";
import { wildRandomProfile } from "./WildRandomProfile";
import { restInPainRandomProfile } from "./RestInPainRandomProfile";
import { customRandomProfile } from "./CustomRandomProfile";

import { randomizerEnemyStrategy } from "./RandomizerEnemyStrategy";


export const randomizerData = 
{
  randomProfile:
  {
    meek: meekRandomProfile,
    kind: kindRandomProfile,
    weak: weakRandomProfile,
    easy: easyRandomProfile,
    fair: fairRandomProfile,
    mid: midRandomProfile,
    hard: hardRandomProfile,
    wild: wildRandomProfile,
    restInPain: restInPainRandomProfile,
    custom: customRandomProfile,
  },
  enemyStrategy:
  {
    enemies:
    {
      key: "enemies",
      label: "Normal Enemies",
      information: "Any enemy that is not a boss.",
      enemyKeys: randomizerEnemyStrategy.enemies
    },
    enemiesNoDrop:
    {
      key: "enemiesNoDrop",
      label: "Normal Enemies (No Drop)",
      information: "Any enemy that is not a boss and doesn't drop items.",
      enemyKeys: randomizerEnemyStrategy.enemiesNoDrop
    },
    dropEnemies:
    {
      key: "dropEnemies",
      label: "Item Drop Normal Enemies",
      information: "Any Thetis. She is not a boss and can drop items.",
      enemyKeys: randomizerEnemyStrategy.dropEnemies
    },
    dropAnyFoodEnemies:
    {
      key: "dropAnyFoodEnemies",
      label: "Food Drop Normal Enemies",
      information: "Thetis 3 and 4. They drop any food.",
      enemyKeys: randomizerEnemyStrategy.dropAnyFoodEnemies
    },
    dropBestFoodEnemies:
    {
      key: "dropBestFoodEnemies",
      label: "Best Food Drop Normal Enemies",
      information: "Thetis 5 and 6. They drop the best foods.",
      enemyKeys: randomizerEnemyStrategy.dropBestFoodEnemies
    },
    dropFoodEnemiesOrBoss:
    {
      key: "dropFoodEnemiesOrBoss",
      label: "Food Drop Enemies or Bosses",
      information: "Thetis 3, 4, 5 and 6 or Bakene 1st Form. They drop food.",
      enemyKeys: randomizerEnemyStrategy.dropFoodEnemiesOrBoss
    },
    crystalEnemies:
    {
      key: "crystalEnemies",
      label: "Crystal Drop Enemies",
      information: "Thetis 1 and 2. They can drop crystal.",
      enemyKeys: randomizerEnemyStrategy.crystalEnemies
    },
    enemiesAndBosses: 
    {
      key: "enemiesAndBosses",
      label: "Enemies Or Bosses (No Drop)",
      information: "Any enemy or boss that doens't drop items.",
      enemyKeys: randomizerEnemyStrategy.enemiesAndBosses,
    },
    bossesOnly:
    {
      key: "bossesOnly",
      label: "Bosses (No Drop)",
      information: "Only bosses that doesn't drop items.",
      enemyKeys: randomizerEnemyStrategy.bossesOnly,
    },
    ungrabbableEnemies:
    {
      key: "ungrabbableEnemies",
      label: "Ungrabable Enemies",
      information: "Enemies that cannot be grabbed.",
      enemyKeys: randomizerEnemyStrategy.ungrabbableEnemies,
    },
    cheapFoodItems:
    {
      key: "cheapFoodItems",
      label: "Cheap Foods (Not Good)",
      information: "Ice cream cornet, pudding, lollipop, " +
          "popcorn, donut, chocolateCandy, muffin, soup",
      enemyKeys: randomizerEnemyStrategy.cheapFoodItems,
    },
    foodItems:
    {
      key: "foodItems",
      label: "Foods",
      information: "Any food item.",
      enemyKeys: randomizerEnemyStrategy.foodItems,
    },
    anyItem:
    {
      key: "anyItem",
      label: "Items",
      information: "Any item, which can be a food or a crystal.",
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
    // level1: {key: "level1", label: "Level 1"},
    level1R: {key: "level1R", label: "Level 1 (Remake)"},
    level2: {key: "level2", label: "Level 2"},
    level3: {key: "level3", label: "Level 3"},
    level4: {key: "level4", label: "Level 4"},

    extraLevel: {key: "extraLevel", label: "Extra Level"},

    level5: {key: "level5", label: "Level 5"},
    level6: {key: "level6", label: "Level 6"},
    level7: {key: "level7", label: "Level 7"},
    level8: {key: "level8", label: "Level 8"}
  },
  enemyGroups:
  {
    // level1: level1EnemyGroup,
    level2: level2EnemyGroup,
    level3: level3EnemyGroup,
    level4: level4EnemyGroup,
    level5: level5EnemyGroup,
    level6: level6EnemyGroup,
    level7: level7EnemyGroup,
    level8: level8EnemyGroup,

    level1R: level1REnemyGroup,
    extraLevel: extraLevelEnemyGroup
  },
  enemyBytePattern:
  [
    "RR", "RR",               // Stage position spawn trigger.

    "03", "00", "48", "02",   // Locked values.

    "RR", "00", "00", "00",   // Enemy ID + locked values.

    "RR", "RR", "RR", "RR",   // Position X and Y.

    "RR", "00"                // Posture and Color.
  ]
}