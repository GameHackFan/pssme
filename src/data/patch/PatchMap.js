import featuresAndFixesPatch from
    "./FeaturesAndFixesPatch";
import textImprovementPatch from
    "./TextImprovementPatch";
import textImprovementGenericBossPatch from
    "./TextImprovementGenericBossPatch";
import dontFreezeOnBossPatch from
    "./DontFreezeOnBossPatch";
import removeCPUDemoPatch from "./RemoveCPUDemoPatch";
import boss1PositionImprovementPatch from
    "./Boss1PositionImprovementPatch";    

import enemyColorExpansionPatch from
    "./EnemyColorExpansionPatch";

import randomizerTextPatch from
    "./RandomizerTextPatch";
import levelEditorTextPatch from
    "./LevelEditorTextPatch";


const patchMap = 
{
  featuresAndFixesPatch:
  {
    label: "New Features And Fixes Patch",
    text: "This patch allows you to add Morga " +
          "without softlocking the game. Garoben " +
          "also will not have bugged lifebar. " +
          "It allows players to select the same " +
          "sailor and also increases the time for " +
          "all levels. Used by the Seed Randomizer.",
    patch: featuresAndFixesPatch,
    show: true
  },
  textImprovementPatch:
  {
    label: "Text Improvement Patch",
    text: "This patch brings texts improvements " +
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
    label: "Text Improvement Generic Boss Patch",
    text: "This patch brings texts improvements " +
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
  dontFreezeOnBossPatch:
  {
    label: "Don't Freeze On Boss Patch",
    text: "This patch removes the freezing that " +
          "players suffer when first encountering " +
          "any boss or sub boss. Used by the " +
          "Seed Randomizer.",
    patch: dontFreezeOnBossPatch,
    show: true
  },
  enemyColorExpansionPatch:
  {
    label: "Enemy Color Expansion Patch",
    text: "This patch will add extra enemy color " +
          "palletes over some pallets that look " +
          "empty. To allow some enemies to have " +
          "new palletes, some original pallets " +
          "had to be moved to another location. " +
          "The new palletes are: 1 Furau, " +
          "2 Oniwabandana, 1 Tesuni, 1 Castor " + 
          "and Pollux, 3 Kyurene and 2 Bakene.",
    patch: enemyColorExpansionPatch,
    show: true
  },
  removeCPUDemoPatch:
  {
    label: "Remove CPU Gameplay Demo Patch",
    text: "This patch removes the CPU Gameplay " +
          "Demo. It is necessary for ROMs that " +
          "has more or less bytes than the original " +
          "in any level. Used by the Level Editor " +
          "and the Seed Randomizer.",
    patch: removeCPUDemoPatch,
    show: true
  },
  randomizerTextPatch:
  {
    label: "Randomizer Title Screen Patch",
    text: "Title screen text patch for the Seed " +
          "Randomizer. Used by the Seed Randomizer.",
    patch: randomizerTextPatch,
    show: false
  },
  levelEditorTextPatch:
  {
    label: "Level Editor Title Screen Patch",
    text: "Title screen text patch for the Level " +
          "Editor. Used by the Level Editor",
    patch: levelEditorTextPatch,
    show: false
  },
  boss1PositionImprovementPatch:
  {
    label: "1st Boss Position Improvement Patch",
    text: "This patch changes the position of " +
          "both Castor and Pollux so they don't " + "spawn close to each other making them " +
          "easy to combo from the start. Used by the Level Editor",
    patch: boss1PositionImprovementPatch,
    show: false
  }
}


export default patchMap;