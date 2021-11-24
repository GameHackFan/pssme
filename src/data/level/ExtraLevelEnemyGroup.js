const extraLevelEnemyGroup =
{
	group1:
	{
		label: "Enemy Group 1",
		background: "area2",
		startPosition: 218328,
		endPosition: 218343,
		screenPositionStart: 50,
		screenPositionEnd: 140,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -160,
		levelEditorLimitEnd: 320,
		levelEditorShiftX: 386,
		defaultAmount: 1,
		maxAmount: 14,
	},
	group2:
	{
		label: "Enemy Group 2",
		background: "area2",
		startPosition: 218374,
		endPosition: 218389,
		screenPositionStart: 400,
		screenPositionEnd: 1300,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 320,
		levelEditorLimitEnd: 1504,
		levelEditorShiftX: 386,
		defaultAmount: 1,
		maxAmount: 14
	},


	group3:
	{
		label: "Enemy Group 3",
		background: "area13",
		startPosition: 218674,
		endPosition: 218689,
		screenPositionStart: 0,
		screenPositionEnd: 0,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 207,
		levelEditorLimitStart: -160,
		levelEditorLimitEnd: 160,
		levelEditorShiftX: 460,
		defaultAmount: 1,
		maxAmount: 14,
		forbiddenPositionStrategies: ["outsideLeft"]
	},


	group4:
	{
		label: "Enemy Group 4",
		background: "area12",
		startPosition: 219204,
		endPosition: 219219,
		screenPositionStart: 272,
		screenPositionEnd: 272,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -158,
		levelEditorLimitEnd: 430,
		levelEditorShiftX: 462,
		defaultAmount: 1,
		maxAmount: 14,
		forbiddenPositionStrategies: ["outsideRight"]
	},


	group5:
	{
		label: "Enemy Group 5",
		background: "area13",
		startPosition: 219608,
		endPosition: 219623,
		screenPositionStart: 160,
		screenPositionEnd: 160,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -160,
		levelEditorLimitEnd: 320,
		levelEditorShiftX: 460,
		defaultAmount: 1,
		maxAmount: 14,
		forbiddenPositionStrategies: ["outsideRight"]
	},
	group6:
	{
		label: "Enemy Group 6",
		background: "area13",
		startPosition: 219662,
		endPosition: 219677,
		screenPositionStart: 160,
		screenPositionEnd: 160,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -160,
		levelEditorLimitEnd: 320,
		levelEditorShiftX: 460,
		defaultAmount: 1,
		maxAmount: 14,
		forbiddenPositionStrategies: ["outsideRight"]
	},


	bossGroup:
	{
		label: "Boss Group",
		background: "area18",
		levelEditorStartPosition: 220266,
		levelEditorEndPosition: 220281,
		startPosition: 220282,
		endPosition: 220281,
		screenPositionStart: 0,
		screenPositionEnd: 0,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -160,
		levelEditorLimitEnd: 352,
		levelEditorShiftX: 460,
		defaultAmount: 1,
		maxAmount: 2,
		forbiddenPositionStrategies: ["outsideLeft"]
	},
	bossHelperGroup1:
	{
		label: "Boss Helper Group 1",
		background: "area18",
		levelEditorStartPosition: 220290,
		levelEditorEndPosition: 220305,
		startPosition: 220306,
		endPosition: 220305,
		screenPositionStart: 192,
		screenPositionEnd: 192,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 32,
		levelEditorLimitEnd: 352,
		levelEditorShiftX: 460,
		defaultAmount: 1,
		maxAmount: 12
	}
}


// area2 begins at 00 00 (0000)
// area13 begins at 00 00 (0000)
// area12 begins at 00 00 (0000)
// area21 begins at 40 05 (0540)
// area18 begins at 00 00 (0000)

// area2				200, 239
// area13				?, ?
// area12				?, 239
// area21				200, 239
// area18				200, 239
export default extraLevelEnemyGroup;