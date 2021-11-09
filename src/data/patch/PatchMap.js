import featuresAndFixesPatch from "./FeaturesAndFixesPatch";
import textImprovementPatch from "./TextImprovementPatch";
import textImprovementGenericBossPatch from
		"./TextImprovementGenericBossPatch";
import dontFreezeOnBossPatch from "./DontFreezeOnBossPatch";
import removeCPUDemoPatch from "./RemoveCPUDemoPatch";
import boss1PositionImprovementPatch from
		"./Boss1PositionImprovementPatch";    

import enemyColorExpansionPatch from "./EnemyColorExpansionPatch";
import sailorColorExpansionPatch from "./SailorColorExpansionPatch";
import bakeneImprovementPatch from "./BakeneImprovementPatch"
import foodImprovementPatch from "./FoodImprovementPatch";
import thetisImprovementPatch from "./ThetisImprovementPatch";

import randomizerTextPatch from "./RandomizerTextPatch";
import levelEditorTextPatch from"./LevelEditorTextPatch";
import defaultTextPatch from "./DefaultTextPatch";
import jumouImprovementPatch from "./JumouImprovementPatch";


const patchMap = 
{
	featuresAndFixesPatch:
	{
		label:	"New Features And Fixes Patch",
		text:		"This patch fixes bugs, add features and " + 
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
	foodImprovementPatch:
	{
		label:	"Food Improvement Patch",
		text:		"This patch balances how much each food " +
						"heals instead of 10 for all bad food, " +
						"20 for average food and 30 for the Ice " +
						"Cream Cup. Each food will heal its own " +
						"amount of health now. Popcorn = 6, " +
						"Lollipop = 8, Donut = 10, " +
						"Chocolate Candy = 12, Muffin = 14, " +
						"Ice Cream Cornet = 16, Pudding = 20, " +
						"Soup = 22, Piece of Cake = 24, " +
						"Piece of Pie = 26, Chocolate Bar = 32, " +
						"Meatball = 40, Round Cake = 48, " + 
						"Ice Cream Cup = 64. This patch is used " + 
						"by the Seed Randomizer.",
		patch: foodImprovementPatch,
		show: true
	},
	jumouImprovementPatch:
	{
		label:	"Enemy Improvement Patch",
		text:		"This patch brings improvements to some " + 
						"enemies. Jumou is too slow, that makes " + 
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
	textImprovementPatch:
	{
		label:	"Text Improvement Patch",
		text:		"This patch brings texts improvements " +
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
		label:	"Text Improvement Generic Boss Patch",
		text:		"This patch brings texts improvements " +
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
		label:	"Don't Freeze On Boss Patch",
		text:		"This patch removes the freezing that " +
						"players suffer when first encountering " +
						"any boss or sub boss. Used by the " +
						"Seed Randomizer.",
		patch: dontFreezeOnBossPatch,
		show: true
	},
	sailorColorExpansionPatch:
	{
		label:	"Sailor Color Expansion Patch",
		text:		"This patch will add extra sailor color " +
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
	enemyColorExpansionPatch:
	{
		label:	"Enemy Color Expansion Patch",
		text:		"This patch will add extra enemy color " +
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
	removeCPUDemoPatch:
	{
		label:	"Remove CPU Gameplay Demo Patch",
		text:		"This patch removes the CPU Gameplay " +
						"Demo. It is necessary for ROMs that " +
						"has more or less bytes than the original " +
						"in any level. Used by the Level Editor " +
						"and the Seed Randomizer.",
		patch: removeCPUDemoPatch,
		show: true
	},
	thetisImprovementPatch:
	{
		label:	"Thetis Improvement Patch",
		text:		"This patch improves thetis health from " +
						"16 to 48. This patch is used by the Seed " +
						"Randomizer.",
		patch: thetisImprovementPatch,
		show: false
	},
	bakeneImprovementPatch:
	{
		label:	"Bakene Improvement Patch",
		text:		"This patch brings improvements to Bakene. " + 
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
	randomizerTextPatch:
	{
		label:	"Randomizer Title Screen Patch",
		text:		"Title screen text patch for the Seed " +
						"Randomizer. Used by the Seed Randomizer.",
		patch: randomizerTextPatch,
		show: false
	},
	levelEditorTextPatch:
	{
		label:	"Level Editor Title Screen Patch",
		text:		"Title screen text patch for the Level " +
						"Editor. Used by the Level Editor",
		patch: levelEditorTextPatch,
		show: false
	},
	defaultTextPatch:
	{
		label:	"Default Title Screen Patch",
		text:		"Title screen text patch for anything " +
						"else besides the Seed Randomizer and " +
						"the Level Editor. Used if no text " +
						"was applied.",
		patch: defaultTextPatch,
		show: false
	},
	boss1PositionImprovementPatch:
	{
		label:	"1st Boss Position Improvement Patch",
		text:		"This patch changes the position of " +
						"both Castor and Pollux so they don't " +
						"spawn close to each other making them " +
						"easy to combo from the start. Used by "+
						"the Seed Randomizer.",
		patch: boss1PositionImprovementPatch,
		show: false
	}
}


export default patchMap;