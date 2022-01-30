const level2EnemyGroup =
{
	group1:
	{
		label: "Enemy Group 1",
		background: "level2A",
		startPosition: 199054,
		endPosition: 199149,
		screenPositionStart: 500,
		screenPositionEnd: 1150,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 320,
		levelEditorLimitEnd: 1392,
		defaultAmount: 6,
		maxAmount: 14
	},
	group2:
	{
		label: "Enemy Group 2",
		background: "level2A",
		startPosition: 199180,
		endPosition: 199211,
		screenPositionStart: 1400,
		screenPositionEnd: 1600,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 1392,
		levelEditorLimitEnd: 2432,
		defaultAmount: 2,
		maxAmount: 8,
		specialProfile: "max8Strategy"
	},
	group3:
	{
		label: "Enemy Group 3",
		background: "level2A",
		startPosition: 199222,
		endPosition: 199317,
		screenPositionStart: 1700,
		screenPositionEnd: 2200,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 1392,
		levelEditorLimitEnd: 2432,
		defaultAmount: 6,
		maxAmount: 8,
		specialProfile: "max8Strategy"
	},
	group4:
	{
		label: "Enemy Group 4",
		background: "level2A",
		startPosition: 199348,
		endPosition: 199459,
		screenPositionStart: 2450,
		screenPositionEnd: 2800,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 2432,
		levelEditorLimitEnd: 3008,
		defaultAmount: 7,
		maxAmount: 14
	},
	group5:
	{
		label: "Enemy Group 5",
		background: "level2A",
		startPosition: 199490,
		endPosition: 199569,
		screenPositionStart: 3100,
		screenPositionEnd: 3550,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 3008,
		levelEditorLimitEnd: 3760,
		defaultAmount: 5,
		maxAmount: 14
	},


	bossGroup:
	{
		label: "Boss Group",
		background: "level2B",
		levelEditorStartPosition: 199992,
		levelEditorEndPosition: 200007,
		startPosition: 200008,				// It won't overwrite
		endPosition: 200007,
		screenPositionStart: 512,			// 0
		screenPositionEnd: 704,				// 0
		walkablePositionYTop: 184,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 224,
		levelEditorLimitEnd: 864,
		defaultAmount: 1,
		maxAmount: 4,
		specialProfile: "max4Type1Strategy",
		forbiddenPositionStrategies: ["outsideRight"],
		forbiddenEnemies: [
			"garobenGreenOrange", "garobenBrownGray",
			"garobenGrayBrown", "garobenGreenBlue",
			"morgaExtra0", "morgaExtra1", "morgaExtra2",
			"bakeneForm3", "bakeneForm3", "bakeneExtra1Form3",
			"bakeneExtra2Form3"
		]
	},
	bossHelperGroup1:
	{
		label: "Boss Helper Group 1",
		background: "level2B",
		startPosition: 200074,
		endPosition: 200105,
		screenPositionStart: 704,
		screenPositionEnd: 704,
		walkablePositionYTop: 184,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 224,
		levelEditorLimitEnd: 864,
		defaultAmount: 2,
		maxAmount: 3,
		specialProfile: "max3Type2Strategy",
		forbiddenPositionStrategies: ["outsideRight"],
		forbiddenEnemies: [
			"garobenGreenOrange", "garobenBrownGray",
			"garobenGrayBrown", "garobenGreenBlue",
			"morgaExtra0", "morgaExtra1", "morgaExtra2",
			"bakeneForm3", "bakeneForm3", "bakeneExtra1Form3",
			"bakeneExtra2Form3"
		]
	},
	bossHelperGroup2:
	{
		label: "Boss Helper Group 2",
		background: "level2B",
		startPosition: 200114,
		endPosition: 200145,
		screenPositionStart: 704,
		screenPositionEnd: 704,
		walkablePositionYTop: 184,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 224,
		levelEditorLimitEnd: 864,
		defaultAmount: 2,
		maxAmount: 3,
		specialProfile: "max3Type1Strategy",
		forbiddenPositionStrategies: ["outsideRight"],
		forbiddenEnemies: [
			"garobenGreenOrange", "garobenBrownGray",
			"garobenGrayBrown", "garobenGreenBlue",
			"morgaExtra0", "morgaExtra1", "morgaExtra2",
			"bakeneForm3", "bakeneForm3", "bakeneExtra1Form3",
			"bakeneExtra2Form3"
		]
	},
	bossHelperGroup3:
	{
		label: "Boss Helper Group 3",
		background: "level2B",
		startPosition: 200154,
		endPosition: 200169,
		screenPositionStart: 704,
		screenPositionEnd: 704,
		walkablePositionYTop: 184,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 224,
		levelEditorLimitEnd: 864,
		defaultAmount: 1,
		maxAmount: 3,
		specialProfile: "max3Type2Strategy",
		forbiddenPositionStrategies: ["outsideRight"],
		forbiddenEnemies: [
			"garobenGreenOrange", "garobenBrownGray",
			"garobenGrayBrown", "garobenGreenBlue",
			"morgaExtra0", "morgaExtra1", "morgaExtra2",
			"bakeneForm3", "bakeneForm3", "bakeneExtra1Form3",
			"bakeneExtra2Form3"
		]
	},
	bossHelperGroup4:
	{
		label: "Boss Helper Group 4",
		background: "level2B",
		startPosition: 200448,
		endPosition: 200479,
		screenPositionStart: 704,
		screenPositionEnd: 704,
		walkablePositionYTop: 184,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 224,
		levelEditorLimitEnd: 864,
		defaultAmount: 2,
		maxAmount: 4,
		specialProfile: "max4Type1Strategy",
		forbiddenPositionStrategies: ["outsideRight"],
		forbiddenEnemies: [
			"garobenGreenOrange", "garobenBrownGray",
			"garobenGrayBrown", "garobenGreenBlue",
			"morgaExtra0", "morgaExtra1", "morgaExtra2",
			"bakeneForm3", "bakeneForm3", "bakeneExtra1Form3",
			"bakeneExtra2Form3"
		]
	},
	bossHelperGroup5:
	{
		label: "Boss Helper Group 5",
		background: "level2B",
		startPosition: 200488,
		endPosition: 200519,
		screenPositionStart: 704,
		screenPositionEnd: 704,
		walkablePositionYTop: 184,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 224,
		levelEditorLimitEnd: 864,
		defaultAmount: 2,
		maxAmount: 4,
		specialProfile: "max4Type2Strategy",
		forbiddenPositionStrategies: ["outsideRight"],
		forbiddenEnemies: [
			"garobenGreenOrange", "garobenBrownGray",
			"garobenGrayBrown", "garobenGreenBlue",
			"morgaExtra0", "morgaExtra1", "morgaExtra2",
			"bakeneForm3", "bakeneForm3", "bakeneExtra1Form3",
			"bakeneExtra2Form3"
		]
	},
	bossHelperGroup6:
	{
		label: "Boss Helper Group 6",
		background: "level2B",
		startPosition: 200528,
		endPosition: 200543,
		screenPositionStart: 704,
		screenPositionEnd: 704,
		walkablePositionYTop: 184,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 224,
		levelEditorLimitEnd: 864,
		defaultAmount: 1,
		maxAmount: 4,
		specialProfile: "max4Type2Strategy",
		forbiddenPositionStrategies: ["outsideRight"],
		forbiddenEnemies: [
			"garobenGreenOrange", "garobenBrownGray",
			"garobenGrayBrown", "garobenGreenBlue",
			"morgaExtra0", "morgaExtra1", "morgaExtra2",
			"bakeneForm3", "bakeneForm3", "bakeneExtra1Form3",
			"bakeneExtra2Form3"
		]
	}
}


// level2A begins at 80 01 (0180)
// level2B begins at 80 01 (0180)


// level2A			200, 239
// level2B			184, 239
export default level2EnemyGroup;
