const level1REnemyGroup =
{
	group1:
	{
		label: "Enemy Group 1",
		background: "area0",
		startPosition: 216324,
		endPosition: 216339,
		screenPositionStart: 250,
		screenPositionEnd: 780,
		walkablePositionYTop: 169,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 0,
		levelEditorLimitEnd: 960,
		levelEditorShiftX: 300,
		defaultAmount: 1,
		maxAmount: 14
	},
	group2:
	{
		label: "Enemy Group 2",
		background: "area0",
		startPosition: 216370,
		endPosition: 216385,
		screenPositionStart: 850,
		screenPositionEnd: 1400,
		walkablePositionYTop: 169,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 960,
		levelEditorLimitEnd: 1600,
		levelEditorShiftX: 300,
		defaultAmount: 6,
		maxAmount: 14
	},
	group3:
	{
		label: "Enemy Group 3",
		background: "area0",
		startPosition: 216416,
		endPosition: 216431,
		screenPositionStart: 1480,
		screenPositionEnd: 1950,
		walkablePositionYTop: 169,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 1600,
		levelEditorLimitEnd: 2144,
		levelEditorShiftX: 300,
		defaultAmount: 5,
		maxAmount: 14
	},
	group4:
	{
		label: "Enemy Group 4",
		background: "area0",
		startPosition: 216462,
		endPosition: 216477,
		screenPositionStart: 2000,
		screenPositionEnd: 2400,
		walkablePositionYTop: 169,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 2144,
		levelEditorLimitEnd: 2608,
		levelEditorShiftX: 300,
		defaultAmount: 7,
		maxAmount: 14
	},


	group5:
	{
		label: "Enemy Group 5",
		background: "area1",
		startPosition: 216974,
		endPosition: 216989,
		screenPositionStart: 624,
		screenPositionEnd: 624,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 464,
		levelEditorLimitEnd: 784,
		levelEditorShiftX: 460,
		levelEditorShiftY: 64,
		defaultAmount: 1,
		maxAmount: 14
	},


	bossGroup:
	{
		label: "Boss Group",
		background: "area21",
		levelEditorStartPosition: 217586,
		levelEditorendPosition: 217617,
		startPosition: 217618,
		endPosition: 217617,
		screenPositionStart: 0,
		screenPositionEnd: 0,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -80,
		levelEditorLimitEnd: 240,
		levelEditorShiftX: 460,
		defaultAmount: 2,
		maxAmount: 0,
		specialProfile: "bossHelperType2Strategy",
		forbiddenEnemies: ["castorAndPolluxBossBoth", 
			"castorAndPolluxBoss1", "castorAndPolluxBoss2"
		]
	},
	bossHelperGroup1:
	{
		label: "Boss Helper Group 1",
		background: "area21",
		startPosition: 217652,
		endPosition: 217667,
		screenPositionStart: 80,
		screenPositionEnd: 80,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -80,
		levelEditorLimitEnd: 240,
		levelEditorShiftX: 460,
		defaultAmount: 1,
		maxAmount: 3,
		specialProfile: "bossHelperType1Strategy",
		forbiddenEnemies: ["castorAndPolluxBossBoth", 
			"castorAndPolluxBoss1", "castorAndPolluxBoss2"
		]
	},
	bossHelperGroup2:
	{
		label: "Boss Helper Group 2",
		background: "area21",
		startPosition: 217676,
		endPosition: 217691,
		screenPositionStart: 80,
		screenPositionEnd: 80,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -80,
		levelEditorLimitEnd: 240,
		levelEditorShiftX: 460,
		defaultAmount: 1,
		maxAmount: 3,
		specialProfile: "bossHelperType1Strategy",
		forbiddenEnemies: ["castorAndPolluxBossBoth", 
			"castorAndPolluxBoss1", "castorAndPolluxBoss2"
		]
	},
	bossHelperGroup3:
	{
		label: "Boss Helper Group 3",
		background: "area21",
		startPosition: 217700,
		endPosition: 217715,
		screenPositionStart: 80,
		screenPositionEnd: 80,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -80,
		levelEditorLimitEnd: 240,
		levelEditorShiftX: 460,
		defaultAmount: 1,
		maxAmount: 3,
		specialProfile: "bossHelperType2Strategy",
		forbiddenEnemies: ["castorAndPolluxBossBoth", 
			"castorAndPolluxBoss1", "castorAndPolluxBoss2"
		]
	},
	bossHelperGroup4:
	{
		label: "Boss Helper Group 4",
		background: "area21",
		startPosition: 217724,
		endPosition: 217739,
		screenPositionStart: 80,
		screenPositionEnd: 80,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -80,
		levelEditorLimitEnd: 240,
		levelEditorShiftX: 460,
		defaultAmount: 1,
		maxAmount: 3,
		specialProfile: "bossHelperType1Strategy",
		forbiddenEnemies: ["castorAndPolluxBossBoth", 
			"castorAndPolluxBoss1", "castorAndPolluxBoss2"
		]
	}
}


// area0 begins at 00 00 (0000)
// area1 begins at 00 00 (0000)
// area1 begins at 70 02 (0270)
// area1 begins at C0 05 (05C0)
// area21 begins at 00 00 (0000)

// area0				169, 239
// area1				245, 335
// area21				200, 239
export default level1REnemyGroup;