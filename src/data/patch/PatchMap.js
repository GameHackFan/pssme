import featuresAndFixesPatch from
    "./FeaturesAndFixesPatch";
import textImprovementPatch from
    "./TextImprovementPatch";
import textImprovementGenericBossPatch from
    "./TextImprovementGenericBossPatch";
import dontFreezeOnBossPatch from
    "./DontFreezeOnBossPatch";

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
          "all levels.",
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
          "feels more appropriate.",
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
          "any boss or sub boss.",
    patch: dontFreezeOnBossPatch,
    show: true
  },
  randomizerTextPatch:
  {
    label: "Randomizer Title Screen Patch",
    text: "Title screen text patch for the Seed " +
          "Randomizer.",
    patch: randomizerTextPatch,
    show: false
  },
  levelEditorTextPatch:
  {
    label: "Level Editor Title Screen Patch",
    text: "Title screen text patch for the Level " +
          "Editor.",
    patch: levelEditorTextPatch,
    show: false
  }
}


export default patchMap;