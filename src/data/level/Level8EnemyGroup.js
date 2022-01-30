const level8EnemyGroup =
{
	group1:
	{
		label: "Enemy Group 1",
		background: "level8A",
		startPosition: 213976,
		endPosition: 214103,
		screenPositionStart: 100,
		screenPositionEnd: 730,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -160,
		levelEditorLimitEnd: 928,
		levelEditorShiftX: 460,
		defaultAmount: 8,
		maxAmount: 14
	},
	group2:
	{
		label: "Enemy Group 2",
		background: "level8A",
		startPosition: 214134,
		endPosition: 214261,
		screenPositionStart: 1040,
		screenPositionEnd: 1140,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 928,
		levelEditorLimitEnd: 1312,
		levelEditorShiftX: 460,
		defaultAmount: 8,
		maxAmount: 14,
		forbiddenEnemies: ["bakeneForm2", "bakeneRunningAway",
			"bakeneExtra1Form2", "bakeneExtra2Form2"
		]
	},
	bossGroup1:
	{
		label: "Boss Group 1",
		background: "level8A",
		levelEditorStartPosition: 214410,
		levelEditorendPosition: 214441,
		startPosition: 214442,
		endPosition: 214441,
		screenPositionStart: 1216,
		screenPositionEnd: 1216,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 1248,
		levelEditorLimitEnd: 1568,
		levelEditorShiftX: 460,
		defaultAmount: 2,
		maxAmount: 6,
		specialProfile: "max6Strategy"
	},
	group3:
	{
		label: "Enemy Group 3",
		background: "level8A",
		startPosition: 214532,
		endPosition: 214659,
		screenPositionStart: 1700,
		screenPositionEnd: 2250,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 1568,
		levelEditorLimitEnd: 2464,
		levelEditorShiftX: 460,
		defaultAmount: 8,
		maxAmount: 14
	},
	group4:
	{
		label: "Enemy Group 4",
		background: "level8A",
		startPosition: 214690,
		endPosition: 214817,
		screenPositionStart: 2500,
		screenPositionEnd: 3100,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 2464,
		levelEditorLimitEnd: 3328,
		levelEditorShiftX: 460,
		defaultAmount: 8,
		maxAmount: 14
	},


	finalBossGroup:
	{
		label: "Final Boss Group",
		background: "level8B",
		levelEditorStartPosition: 215158,
		levelEditorendPosition: 215173,
		startPosition: 215174,
		endPosition: 215173,
		screenPositionStart: 608,
		screenPositionEnd: 608,
		walkablePositionYTop: 176,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -160,
		levelEditorLimitEnd: 1056,
		levelEditorShiftX: 460,
		defaultAmount: 1,
		maxAmount: 12,
		specialProfile: "max12Strategy"
	}
}


// level8A begins at 00 00 (0000)
// level8B begins at 00 00 (0000)

// level8A			176, 239
// level8B			176, 239			Final Boss
export default level8EnemyGroup;