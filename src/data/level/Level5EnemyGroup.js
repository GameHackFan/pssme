const level5EnemyGroup =
{
	group1:
	{
		label: "Enemy Group 1",
		background: "level5A",
		startPosition: 206916,
		endPosition: 207011,
		screenPositionStart: 300,
		screenPositionEnd: 750,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -160,
		levelEditorLimitEnd: 928,
		levelEditorShiftX: 460,
		defaultAmount: 6,
		maxAmount: 14
	},
	group2:
	{
		label: "Enemy Group 2",
		background: "level5A",
		startPosition: 207042,
		endPosition: 207137,
		screenPositionStart: 1000,
		screenPositionEnd: 1500,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 928,
		levelEditorLimitEnd: 1696,
		levelEditorShiftX: 460,
		defaultAmount: 6,
		maxAmount: 14
	},
	group3:
	{
		label: "Enemy Group 3",
		background: "level5A",
		startPosition: 207168,
		endPosition: 207327,
		screenPositionStart: 1750,
		screenPositionEnd: 2500,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 1696,
		levelEditorLimitEnd: 2704,
		levelEditorShiftX: 460,
		defaultAmount: 10,
		maxAmount: 14,
		forbiddenEnemies: ["bakeneForm1", "bakeneRunningAway"]
	},


	group4:
	{
		label: "Enemy Group 4",
		background: "level5B",
		startPosition: 207620,
		endPosition: 207747,
		screenPositionStart: 100,
		screenPositionEnd: 450,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -160,
		levelEditorLimitEnd: 800,
		levelEditorShiftX: 460,
		defaultAmount: 8,
		maxAmount: 14
	},


	group5:
	{
		label: "Enemy Group 5",
		background: "level5C",
		startPosition: 208022,
		endPosition: 208117,
		screenPositionStart: 100,
		screenPositionEnd: 500,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -160,
		levelEditorLimitEnd: 672,
		levelEditorShiftX: 460,
		defaultAmount: 6,
		maxAmount: 14,
		forbiddenEnemies: ["bakeneForm2", "bakeneRunningAway",
			"bakeneExtra1Form2", "bakeneExtra2Form2"
		]
	},
	group6:
	{
		label: "Enemy Group 6",
		background: "level5C",
		startPosition: 208148,
		endPosition: 208211,
		screenPositionStart: 750,
		screenPositionEnd: 900,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 672,
		levelEditorLimitEnd: 1072,
		levelEditorShiftX: 460,
		defaultAmount: 4,
		maxAmount: 14,
		forbiddenEnemies: ["bakeneForm1", "bakeneForm2",
			"bakeneRunningAway", "bakeneExtra1Form2", "bakeneExtra2Form2"
		]
	},


	group7:
	{
		label: "Enemy Group 7",
		background: "level5D",
		startPosition: 208720,
		endPosition: 208751,
		screenPositionStart: 300,
		screenPositionEnd: 500,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 114,
		levelEditorLimitEnd: 1074,
		levelEditorShiftX: 186,
		defaultAmount: 2,
		maxAmount: 8,
		specialProfile: "max8Strategy"
	},
	bossGroup:
	{
		label: "Boss Group",
		background: "level5D",
		levelEditorStartPosition: 208862,
		levelEditorEndPosition: 208877,
		startPosition: 208878,				// It will not overwrite the boss.
		endPosition: 208877,
		screenPositionStart: 720,
		screenPositionEnd: 720,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 114,
		levelEditorLimitEnd: 1074,
		levelEditorShiftX: 186,
		defaultAmount: 1,
		maxAmount: 0
	},
	bossHelperGroup1:
	{
		label: "Boss Helper Group 1",
		background: "level5D",
		startPosition: 208878,
		endPosition: 208973,
		screenPositionStart: 720,
		screenPositionEnd: 720,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 114,
		levelEditorLimitEnd: 1074,
		levelEditorShiftX: 186,
		defaultAmount: 6,
		maxAmount: 6,
		specialProfile: "max6Strategy"
	}
}


// level5A begins at 00 00 (0000)
// level5B begins at 00 00 (0000)
// level5C begins at 00 00 (0000)
// level5D begins at 00 01 (0100)

// level5A			176, 239
// level5B			176, 239
// level5C			176, 239
// level5D			176, 239
export default level5EnemyGroup;