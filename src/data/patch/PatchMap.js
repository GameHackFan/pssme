import { featuresAndFixesPatch } from "./FeaturesAndFixesPatch";
import { areaImprovementPatch } from "./AreaImprovementPatch";
import { timeImprovementPatch } from "./TimeImprovementPatch";
import { infiniteTimePatch } from "./InfiniteTimePatch";
import { maximumTimePatch } from "./MaximumTimePatch";
import { level1RemakePatch } from "./Level1RemakePatch";
import { extraLevelPatch } from "./ExtraLevelPatch";

import { randomizerTextPatch } from "./RandomizerTextPatch";
import { levelEditorTextPatch } from"./LevelEditorTextPatch";
import { defaultTextPatch } from "./DefaultTextPatch";

import { textImprovementPatch } from "./TextImprovementPatch";
import { textImprovementGenericBossPatch } from "./TextImprovementGenericBossPatch";
import { dontFreezeOnBossPatch } from "./DontFreezeOnBossPatch";
import { fixCPUDemoPatch } from "./FixCPUDemoPatch";
import { boss1PositionImprovementPatch } from "./Boss1PositionImprovementPatch";

import { sailorColorExpansionPatch } from "./SailorColorExpansionPatch";
import { foodImprovementPatch } from "./FoodImprovementPatch";
import { playerHealthImprovementPatch } from "./PlayerHealthImprovementPatch";
import { sailorImprovementPatch } from "./SailorImprovementPatch";
import { sailorDashImprovementPatch } from "./SailorDashImprovementPatch";
import { crystalImprovementPatch } from "./CrystalImprovementPatch";
import { crystalImprovement2Patch } from "./CrystalImprovement2Patch";

import { enemyColorExpansionPatch } from "./EnemyColorExpansionPatch";
import { itemDropFixesPatch } from "./ItemDropFixesPatch"
import { jumouImprovementPatch } from "./JumouImprovementPatch";
import { thetisImprovementPatch } from "./ThetisImprovementPatch";
import { bakeneImprovementPatch } from "./BakeneImprovementPatch"


import { newLevelsTextImprovementPatch } from
    "./NewLevelsTextImprovementPatch";
import { newLevelsTextImprovementGenericBossPatch } from
    "./NewLevelsTextImprovementGenericBossPatch";

export const patchMap = 
{
  featuresAndFixesPatch:
  {
    key:    "featuresAndFixesPatch",
    label:  "New Features And Fixes Patch",
    text:   "This patch fixes bugs, add features and " + 
            "change the bosses so they behave properly " + 
            "when they spawn outside their boss area. " + 
            "One important feature it brings is allowing " + 
            "2 equal character to be selected. Castor & " +
            "Pollux now will load their HP from a " + 
            "different table, based on their color ID, " +
            "the new values are 48, 48, 48, 64, 48, 64, " +
            "80, 80, 90, 90. Castor & Pollux now will " + 
            "kill their friends after they die only if " + 
            "they are in the 1st stage. Morga with color " +
            "ID 4+ will spawn without choking the girl, " + 
            "will not wait for the rose, will allow you " + 
            "to kill her without taking the hit from the " + 
            "rose and will not kill her friends after she " + 
            "dies. Garoben with posture ID less than 10 " + 
            "will not wait for the rose and will allow " + 
            "you to kill her without taking the hit from " +
            "the rose. Only Bakene's 3rd form will kill " +
            "his friends when he dies. Kunzite, Zoisite " +
            "and Queen Beryl with color ID 4+ will spawn " +
            "moving instead of delaying a lot of time to " +
            "start moving. A bug that was allowing Queen "+
            "Beryl to grab her friends and cause bugs, " +
            "sometimes even crash the game is also fixed. " +
            "This patch brings a lot of changes and is " +
            "essential. This patch is used by the Level " + 
            "Editor and Seed Randomizer.",
    patch: featuresAndFixesPatch,
    show: true
  },
  crystalImprovementPatch:
  {
    key:    "crystalImprovementPatch",
    label:  "Crystal Usage Improvement Patch",
    text:   "This patch will allow players to change the " + 
            "amount of crystals they want to use by pressing " +
            "the Crystal when jumping, punching or doing " +
            "something that doesn't let the sailor execute " +
            "her crystal power. The best way to do it, is to " +
            "piano input Punch and Crystal, it also work if " + 
            "you press Punch + Crystal together, and the " +
            "last way to do it is by holding Punch and Pressing " +
            "Crystal (this way is the most unsafe, if the " + 
            "sailor is not busy doing another action, she " + 
            "might use her crystals). This patch is used " + 
            "by the Seed Randomizer.",
    patch: crystalImprovementPatch,
    show: true
  },
  crystalImprovement2Patch:
  {
    key:    "crystalImprovement2Patch",
    label:  "Crystal Usage Improvement 2 Patch",
    text:   "This patch will allow players to change the " + 
            "amount of crystals they want to use by pressing " +
            "the Crystal when jumping, punching or doing " +
            "something that doesn't let the sailor execute " +
            "her crystal power. This patch is an alternative " +
            "to the main one, the only difference is that to " + 
            "change the amount of crystals to use you have " + 
            "to press Start instead.",
    patch: crystalImprovement2Patch,
    show: true
  },
  timeImprovementPatch:
  {
    key:    "timeImprovementPatch",
    label:  "Time Improvement Patch",
    text:   "This patch will force the game to process " +
            "the time 60% slower than normal, it sets " + 
            "the starting time to 99, and it also makes " + 
            "all time increments to be 99. This patch " + 
            "is used by the Seed Randomizer.",
    patch: timeImprovementPatch,
    show: true
  },
  infiniteTimePatch:
  {
    key:    "infiniteTimePatch",
    label:  "Infinite Time Patch",
    text:   "This patch will force the game to ignore " +
            "updating the time time, which will lead to " + 
            "infinite time. it also sets the starting " + 
            "time to 99.",
    patch: infiniteTimePatch,
    show: true
  },
  maximumTimePatch:
  {
    key:    "maximumTimePatch",
    label:  "Maximum Time Patch",
    text:   "This patch will set the starting time to 99, " + 
            "it also makes all time increments to be 99.",
    patch: maximumTimePatch,
    show: true
  },
  level1RemakePatch:
  {
    key:    "level1RemakePatch",
    label:  "Level 1 Remake Patch",
    text:   "This patch brings a Remake version of the " +
            "1st stage. This new version increases the " +
            "size of the 1st stage, it add an area that " +
            "is connected to the first stage and another " +
            "area, increasing its size. It also is spawning " +
            "the players a little bit behind, which increased " +
            "even more the size. This patch is used by the " + 
            "Level Editor and Seed Randomizer.",
    patch: level1RemakePatch,
    show: true
  },
  extraLevelPatch:
  {
    key:    "extraLevelPatch",
    label:  "Extra Level Patch (Bank Robbery)",
    text:   "This patch brings a new stage made using " +
            "unused areas + some known areas to create " + 
            "the bank robbery stage that wasn't finished. " +
            "Those areas were selected in a way that felt " +
            "they made sense to be together to build the " + 
            "bank robbery stage in a way that makes it " + 
            "look like a complete level, since the areas " +
            "related to the bank robbery were very short, " +
            "and also considering that the 5th stage, the " +
            "stage you rescue the money happens at night, " + 
            "known areas + the unused areas were placed " +
            "together building this new map, starting in " + 
            "the morning and ending at night, going to " +
            "going to places that you can claim they are " +
            "connected, instead of making it in a way " +
            "just adding new areas and claiming to be " +
            "a new stage. It was made having in mind " +
            "how it could look if the game had included " +
            "a complete version of the bank robbery level. " +
            "This patch is used by the Level Editor and " + 
            "Seed Randomizer.",
    patch: extraLevelPatch,
    show: true
  },
  foodImprovementPatch:
  {
    key:    "foodImprovementPatch",
    label:  "Food Improvement Patch",
    text:   "This patch balances how much each food " +
            "heals instead of 10 for all bad food, " +
            "20 for average food and 30 for the Ice " +
            "Cream Cup. Each food will heal its own " +
            "amount of health now. Popcorn = 6, " +
            "Lollipop = 8, Donut = 10, " +
            "Chocolate Candy = 12, Muffin = 14, " +
            "Ice Cream Cornet = 16, Pudding = 20, " +
            "Soup = 24, Piece of Cake = 28, " +
            "Piece of Pie = 32, Chocolate Bar = 40, " +
            "Meatball = 48, Round Cake = 56, " + 
            "Ice Cream Cup = 64. This patch is used " + 
            "by the Seed Randomizer.",
    patch: foodImprovementPatch,
    show: true
  },
  textImprovementPatch:
  {
    key:    "textImprovementPatch",
    label:  "Text Improvement Patch",
    text:   "This patch brings texts improvements " +
            "for all levels. It has some text " +
            "changes and it also places the texts " +
            "at the bottom of the screen, which " +
            "feels more appropriate. Used by the " +
            "Seed Randomizer.",
    patch: textImprovementPatch,
    show: true
  },
  textImprovementGenericBossPatch:
  {
    key:    "textImprovementGenericBossPatch",
    label:  "Text Improvement Generic Boss Patch",
    text:   "This patch brings texts improvements " +
            "for all levels. It has some text " +
            "changes and it also places the texts " +
            "at the bottom of the screen, which " +
            "feels more appropriate. The text for " +
            "bosses all changed to 'Boss Fight', " +
            "ideal to use in a hack with changed " +
            "bosses for some levels.",
    patch: textImprovementGenericBossPatch,
    show: true
  },
  newLevelsTextImprovementPatch:
  {
    key:    "newLevelsTextImprovementPatch",
    label:  "New Levels Text Improvement Patch",
    text:   "This patch brings texts improvements " +
            "for the new levels. It has some text " +
            "changes and it also places the texts " +
            "at the bottom of the screen, which " +
            "feels more appropriate. Used by the " +
            "Seed Randomizer.",
    patch: newLevelsTextImprovementPatch,
    show: true
  },
  newLevelsTextImprovementGenericBossPatch:
  {
    key:    "newLevelsTextImprovementGenericBossPatch",
    label:  "New Levels Text Improvement Generic Boss Patch",
    text:   "This patch brings texts improvements " +
            "for the new levels. It has some text " +
            "changes and it also places the texts " +
            "at the bottom of the screen, which " +
            "feels more appropriate. The text for " +
            "bosses all changed to 'Boss Fight', " +
            "ideal to use in a hack with changed " +
            "bosses for the new levels.",
    patch: newLevelsTextImprovementGenericBossPatch,
    show: true
  },
  areaImprovementPatch:
  {
    key:    "areaImprovementPatch",
    label:  "Area Improvement Patch",
    text:   "This patch brings assembly code that allows " + 
            "the use of customized areas, and also " + 
            "some extra code that can be used inside the " + 
            "scripts of the levels to make things like " +
            "change the look direction of the players " + 
            "and change their position in the area. " +
            "This patch is used by the Level Editor " +
            "and the Seed Randomizer.",
    patch: areaImprovementPatch,
    show: true
  },
  dontFreezeOnBossPatch:
  {
    key:    "dontFreezeOnBossPatch",
    label:  "Don't Freeze On Boss Patch",
    text:   "This patch removes the freezing that " +
            "players suffer when first encountering " +
            "any boss or sub boss. Used by the " +
            "Seed Randomizer.",
    patch: dontFreezeOnBossPatch,
    show: true
  },
  fixCPUDemoPatch:
  {
    key:    "fixCPUDemoPatch",
    label:  "Fix CPU Gameplay Demo Patch",
    text:   "This patch fixes the CPU Gameplay Demo. " +
            "It is necessary if ROMs have levels with " +
            "more or less bytes than the original game, " +
            "since it crashes the CPU Gameplay Demo. " +
            "Used by the Level Editor and the Seed " + 
            "Randomizer.",
    patch: fixCPUDemoPatch,
    show: true
  },
  sailorColorExpansionPatch:
  {
    key:    "sailorColorExpansionPatch",
    label:  "Sailor Color Expansion Patch",
    text:   "This patch will add extra sailor color " +
            "palletes. To allow all sailors to have " +
            "new palletes, new assembly code had " +
            "to be written and some changes to " +
            "point to the new code had to also be " +
            "made. The 1st player will always play " +
            "with the original colors and the 2nd " +
            "player will always play with the extra " +
            "colors. Because Mercury in the select " +
            "uses the same memory space as the player " +
            "2, she will be draw with the 2nd color in " +
            "the screen. This patch is used by the " +
            "Level Editor and the Seed Randomizer.",
    patch: sailorColorExpansionPatch,
    show: true,
  },
  sailorImprovementPatch:
  {
    key:    "sailorImprovementPatch",
    label:  "Sailor Improvement Patch",
    text:   "This patch brings improvements to all " + 
            "Sailors Desperation Attack. The damage " + 
            "all Sailors Desperation Attack gives and " + 
            "takes is reduced from 6 to 3. This patch " + 
            "is used by the Seed Randomizer.",
    patch: sailorImprovementPatch,
    show: true
  },
  sailorDashImprovementPatch:
  {
    key:    "sailorDashImprovementPatch",
    label:  "Sailor Dash Improvement Patch",
    text:   "This patch brings improvements to the dash " + 
            "of all Sailors. This patch changes the " + 
            "duration of the dash from 60 to 1200 frames. " + 
            "This patch is used by the Seed Randomizer.",
    patch: sailorDashImprovementPatch,
    show: true
  },
  itemDropFixesPatch:
  {
    key:    "itemDropFixesPatch",
    label:  "Item Drop Fixes Patch",
    text:   "This patch will brings a lot of changes " + 
            "to the item drop feature. The first change " + 
            "is that it disables the item drop from the " + 
            "enemy action ID 8 (falling action) and it " + 
            "removes the item drop restriction from the " + 
            "enemy action ID 9 (fallen / bouncing action), " + 
            "which means now action ID 9 will 100% of the " + 
            "times drop the item, that change was made " + 
            "because when you kill enemies that drop items " + 
            "with crystals, the effects of the crystals " + 
            "might use all the objects memory space, which " + 
            "will lead to the game skipping the item drop " + 
            "since there is no memory space to put it, so " + 
            "this change will ensure that the item drop " + 
            "happens after the game process all effects " + 
            "and all the memory slots they were using " + 
            "become empty, the result is the item drop " + 
            "will happen almost 100% of the cases. The " + 
            "second change is in the item drop movement, " + 
            "in the original game if you throw an enemy " + 
            "out of the screen, you will lose the drop, " +
            "so this change will ensure the item drop has " + 
            "enough impulse to fall inside the screen, of " + 
            "course there will still have a few cases " + 
            "where the item will still be dropped outside " + 
            "the screen, but again, this will be insanely " +
            "rare now. This patch is used by the Seed " + 
            "Seed Randomizer.",
    patch: itemDropFixesPatch,
    show: true
  },
  enemyColorExpansionPatch:
  {
    key:    "enemyColorExpansionPatch",
    label:  "Enemy Color Expansion Patch",
    text:   "This patch will add extra enemy color " +
            "palletes over some pallets that look " +
            "empty. To allow all sailors to have " +
            "new palletes, new assembly code had " +
            "to be written and some changes to " +
            "point to the new code had to also be " +
            "made. The new palletes added are: " +
            "2 Furau, 2 Oniwabandana, 1 Tesuni, " +
            "2 Castor & Pollux, 2 Thetis, 2 Jumou, " +
            "2 Criminal, 3 Kyurene, 2 Bakene, " +
            "2 Zoisite, 2 Kunzite and 2 Queen Beryl. " +
            "This patch is used by the Level Editor " +
            "and the Seed Randomizer.",
    patch: enemyColorExpansionPatch,
    show: true
  },
  thetisImprovementPatch:
  {
    key:    "thetisImprovementPatch",
    label:  "Thetis Improvement Patch",
    text:   "This patch improves thetis health from " +
            "16 to 48. This patch is used by the Seed " +
            "Randomizer.",
    patch: thetisImprovementPatch,
    show: false
  },
  jumouImprovementPatch:
  {
    key:    "jumouImprovementPatch",
    label:  "Jumou Improvement Patch",
    text:   "This patch brings improvements to Jumou's " + 
            "attacks. Jumou is too slow, that makes " + 
            "her rarely able to hit any player. Her " + 
            "importance as an enemy is questionable, " + 
            "so this patch turns her into a heavy hitter, " +
            "a type of enemy that lacks in this game. " + 
            "With this patch, Jumou's damage output " + 
            "is changed as described: Straight Punch " + 
            "from 04 to 18, Stomach Punch from 04 to " + 
            "20, Kick from 06 to 24, Head Throw from " + 
            "08 to 16. Thetis also has way too little " +
            "HP, this patch increases her HP from 10 " + 
            "to 30. This patch is used by the Seed " +
            "Randomizer.",
    patch: jumouImprovementPatch,
    show: true
  },
  bakeneImprovementPatch:
  {
    key:    "bakeneImprovementPatch",
    label:  "Bakene Improvement Patch",
    text:   "This patch brings improvements to Bakene. " + 
            "His 1st, 2nd and 3rd form can only take " +
            "33% of damage, which makes him a pretty " +
            "easy boss to deal with. This patch increases " + 
            "the starting and minimum health for all " +
            "Bakene's forms. 1st form minimum HP decreases " + 
            "from 64 to 4, 2nd form starting HP increases " + 
            "from 64 to 96, 2nd form minimum HP decreases " + 
            "from 32 to 4 and 3rd form HP increases from " + 
            "32 to 96. This patch is used by the Seed " +
            "Randomizer.",
    patch: bakeneImprovementPatch,
    show: true
  },
  playerHealthImprovementPatch:
  {
    key:    "playerHealthImprovementPatch",
    label:  "Player Health Improvement Patch",
    text:   "This patch increases the player HP from 64 " + 
            "to 96. This patch is used by the Seed " +
            "Randomizer.",
    patch: playerHealthImprovementPatch,
    show: false
  },
  randomizerTextPatch:
  {
    key:    "randomizerTextPatch",
    label:  "Randomizer Title Screen Patch",
    text:   "Title screen text patch for the Seed " +
            "Randomizer. Used by the Seed Randomizer.",
    patch: randomizerTextPatch,
    show: false
  },
  levelEditorTextPatch:
  {
    key:    "levelEditorTextPatch",
    label:  "Level Editor Title Screen Patch",
    text:   "Title screen text patch for the Level " +
            "Editor. Used by the Level Editor",
    patch: levelEditorTextPatch,
    show: false
  },
  defaultTextPatch:
  {
    key:    "defaultTextPatch",
    label:  "Default Title Screen Patch",
    text:   "Title screen text patch for anything " +
            "else besides the Seed Randomizer and " +
            "the Level Editor. Used if no text " +
            "was applied.",
    patch: defaultTextPatch,
    show: false
  },
  boss1PositionImprovementPatch:
  {
    key:    "boss1PositionImprovementPatch",
    label:  "1st Boss Position Improvement Patch",
    text:   "This patch changes the position of " +
            "both Castor and Pollux so they don't " +
            "spawn close to each other making them " +
            "easy to combo from the start. Used by "+
            "the Seed Randomizer.",
    patch: boss1PositionImprovementPatch,
    show: false
  }
}