const level3EnemyGroup =
{
	group1:
	{
		label: "Enemy Group 1",
		background: "level3A",
		startPosition: 200952,
		endPosition: 201031,
		screenPositionStart: 50,
		screenPositionEnd: 150,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -160,
		levelEditorLimitEnd: 320,
		levelEditorShiftX: 460,
		defaultAmount: 5,
		maxAmount: 14
	},
	group2:
	{
		label: "Enemy Group 2",
		background: "level3A",
		startPosition: 201072,
		endPosition: 201167,
		screenPositionStart: 360,
		screenPositionEnd: 600,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 320,
		levelEditorLimitEnd: 784,
		levelEditorShiftX: 460,
		defaultAmount: 6,
		maxAmount: 14
	},
	group3:
	{
		label: "Enemy Group 3",
		background: "level3A",
		startPosition: 201198,
		endPosition: 201357,
		screenPositionStart: 800,
		screenPositionEnd: 850,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 736,
		levelEditorLimitEnd: 1056,
		levelEditorShiftX: 460,
		defaultAmount: 10,
		maxAmount: 14
	},
	group4:
	{
		label: "Enemy Group 4",
		background: "level3A",
		startPosition: 201388,
		endPosition: 201499,
		screenPositionStart: 1380,
		screenPositionEnd: 1600,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 1208,
		levelEditorLimitEnd: 1792,
		levelEditorShiftX: 460,
		levelEditorShiftY: 80,
		defaultAmount: 7,
		maxAmount: 14
	},


	group5:
	{
		label: "Enemy Group 5",
		background: "level3B",
		startPosition: 201762,
		endPosition: 201857,
		screenPositionStart: 100,
		screenPositionEnd: 500,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -160,
		levelEditorLimitEnd: 672,
		levelEditorShiftX: 460,
		levelEditorShiftY: 192,
		defaultAmount: 6,
		maxAmount: 14
	},
	group6A:			// Group6 was split because of the layout of the level.
	{
		label: "Enemy Group 6A",
		background: "level3B",
		startPosition: 201888,
		endPosition: 201935,
		screenPositionStart: 700,
		screenPositionEnd: 740,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 430,
		levelEditorLimitEnd: 750,
		levelEditorShiftX: 460,
		levelEditorShiftY: 192,
		defaultAmount: 3,
		maxAmount: 8,
		specialProfile: "max8Strategy",
		forbiddenEnemies: ["bakeneForm1", "bakeneForm2",
			"bakeneRunningAway", "bakeneExtra1Form2", "bakeneExtra2Form2"
		]
	},
	group6B:
	{
		label: "Enemy Group 6B",
		background: "level3B",
		startPosition: 201936,
		endPosition: 201983,
		screenPositionStart: 1024,
		screenPositionEnd: 1024,
		walkablePositionYTop: 128,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 864,
		levelEditorLimitEnd: 1184,
		levelEditorShiftX: 460,
		levelEditorShiftY: 112,
		defaultAmount: 3,
		maxAmount: 8,
		specialProfile: "max8Strategy",
		forbiddenPositionStrategies: ["outsideLeft"],
		forbiddenEnemies: ["bakeneForm1", "bakeneForm2",
			"bakeneRunningAway", "bakeneExtra1Form2", "bakeneExtra2Form2"
		]
	},
	group7:
	{
		label: "Enemy Group 7",
		background: "level3B",
		startPosition: 202014,
		endPosition: 202077,
		screenPositionStart: 1150,
		screenPositionEnd: 1160,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 1008,
		levelEditorLimitEnd: 1328,
		levelEditorShiftX: 460,
		levelEditorShiftY: 64,
		defaultAmount: 4,
		maxAmount: 14
	},
	bossGroup:
	{
		label: "Boss Group",
		background: "level3B",
		levelEditorStartPosition: 202200,
		levelEditorEndPosition: 202215,
		startPosition: 202216,
		endPosition: 202215,
		screenPositionStart: 1376,
		screenPositionEnd: 1376,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 1216,
		levelEditorLimitEnd: 1536,
		levelEditorShiftX: 460,
		levelEditorShiftY: 64,
		defaultAmount: 1,
		maxAmount: 0,					// Adding enemies here can softlock the game.
	},


	bossHelperGroup1:
	{
		label: "Boss Helper Group 1",
		background: "level3C",
		startPosition: 202714,
		endPosition: 202729,
		screenPositionStart: 0,
		screenPositionEnd: 0,
		walkablePositionYTop: 192,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -160,
		levelEditorLimitEnd: 480,
		levelEditorShiftX: 460,
		levelEditorShiftY: 0,
		defaultAmount: 1,
		maxAmount: 4,
		specialProfile: "max4Type1Strategy",
		forbiddenEnemies: [
			"garobenGreenOrange", "garobenBrownGray",
			"garobenGrayBrown", "garobenGreenBlue",
			"morgaExtra0", "morgaExtra1", "morgaExtra2"
		]
	},
	bossHelperGroup2:
	{
		label: "Boss Helper Group 2",
		background: "level3C",
		startPosition: 202738,
		endPosition: 202753,
		screenPositionStart: 0,
		screenPositionEnd: 0,
		walkablePositionYTop: 192,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -160,
		levelEditorLimitEnd: 480,
		levelEditorShiftX: 460,
		levelEditorShiftY: 0,
		defaultAmount: 1,
		maxAmount: 2,
		specialProfile: "max2Type2Strategy",
		forbiddenEnemies: [
			"garobenGreenOrange", "garobenBrownGray",
			"garobenGrayBrown", "garobenGreenBlue",
			"morgaExtra0", "morgaExtra1", "morgaExtra2"
		]
	},
	bossHelperGroup3:
	{
		label: "Boss Helper Group 3",
		background: "level3C",
		startPosition: 202762,
		endPosition: 202793,
		screenPositionStart: 0,
		screenPositionEnd: 0,
		walkablePositionYTop: 192,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -160,
		levelEditorLimitEnd: 480,
		levelEditorShiftX: 460,
		levelEditorShiftY: 0,
		defaultAmount: 2,
		maxAmount: 2,
		specialProfile: "max2Type1Strategy",
		forbiddenEnemies: [
			"garobenGreenOrange", "garobenBrownGray",
			"garobenGrayBrown", "garobenGreenBlue",
			"morgaExtra0", "morgaExtra1", "morgaExtra2"
		]
	},
	bossHelperGroup4:
	{
		label: "Boss Helper Group 4",
		background: "level3C",
		startPosition: 202802,
		endPosition: 202817,
		screenPositionStart: 0,
		screenPositionEnd: 0,
		walkablePositionYTop: 192,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -160,
		levelEditorLimitEnd: 480,
		levelEditorShiftX: 460,
		levelEditorShiftY: 0,
		defaultAmount: 1,
		maxAmount: 2,
		specialProfile: "max2Type2Strategy",
		forbiddenEnemies: [
			"garobenGreenOrange", "garobenBrownGray",
			"garobenGrayBrown", "garobenGreenBlue",
			"morgaExtra0", "morgaExtra1", "morgaExtra2"
		]
	},
	bossHelperGroup5:
	{
		label: "Boss Helper Group 5",
		background: "level3C",
		startPosition: 202826,
		endPosition: 202841,
		screenPositionStart: 0,
		screenPositionEnd: 0,
		walkablePositionYTop: 192,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -160,
		levelEditorLimitEnd: 480,
		levelEditorShiftX: 460,
		levelEditorShiftY: 0,
		defaultAmount: 1,
		maxAmount: 2,
		specialProfile: "max2Type1Strategy",
		forbiddenEnemies: [
			"garobenGreenOrange", "garobenBrownGray",
			"garobenGrayBrown", "garobenGreenBlue",
			"morgaExtra0", "morgaExtra1", "morgaExtra2"
		]
	},
	bossHelperGroup6:
	{
		label: "Boss Helper Group 6",
		background: "level3C",
		startPosition: 202850,
		endPosition: 202865,
		screenPositionStart: 0,
		screenPositionEnd: 0,
		walkablePositionYTop: 192,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -160,
		levelEditorLimitEnd: 480,
		levelEditorShiftX: 460,
		levelEditorShiftY: 0,
		defaultAmount: 1,
		maxAmount: 2,
		specialProfile: "max2Type2Strategy",
		forbiddenEnemies: [
			"garobenGreenOrange", "garobenBrownGray",
			"garobenGrayBrown", "garobenGreenBlue",
			"morgaExtra0", "morgaExtra1", "morgaExtra2"
		]
	}
}


// level3A begins at 00 00 (0000)
// level3B begins at 00 00 (0000)
// level3C begins at 00 00 (0000)

// level3A			176, 239			1, 2, 3
// level3A1			176, 239			4
// level3B			176, 239			5, 6A
// level3B1			128, 239			6B
// level3B2			176, 239			7, Boss
// level3C			192, 239			BossHelper
export default level3EnemyGroup;
