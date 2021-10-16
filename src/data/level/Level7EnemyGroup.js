const level7EnemyGroup =
{
	bossGroup1:
	{
		label: "Boss Group 1",
		background: "level7A",
		levelEditorStartPosition: 211626,
		levelEditorEndPosition: 211641,
		startPosition: 211642,
		endPosition: 211641,
		screenPositionStart: 0,
		screenPositionEnd: 0,
		walkablePositionYTop: 130,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -160,
		levelEditorLimitEnd: 352,
		levelEditorShiftX: 460,
		defaultAmount: 1,
		maxAmount: 12
	},


	bossGroup2:
	{
		label: "Boss Group 2",
		background: "level7B",
		levelEditorStartPosition: 211942,
		levelEditorEndPosition: 211957,
		startPosition: 211958,
		endPosition: 211957,
		screenPositionStart: 480,
		screenPositionEnd: 480,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 320,
		levelEditorLimitEnd: 640,
		levelEditorShiftX: 76,
		defaultAmount: 1,
		maxAmount: 12
	},
	group1:
	{
		label: "Enemy Group 1",
		background: "level7B",
		startPosition: 212096,
		endPosition: 212223,
		screenPositionStart: 1000,
		screenPositionEnd: 1700,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 640,
		levelEditorLimitEnd: 1936,
		levelEditorShiftX: 76,
		defaultAmount: 8,
		maxAmount: 14
	},


	bossGroup3:
	{
		label: "Boss Group 3",
		background: "level7C",
		levelEditorStartPosition: 212398,
		levelEditorEndPosition: 212445,
		startPosition: 212414,
		endPosition: 212445,
		screenPositionStart: 0,
		screenPositionEnd: 0,
		walkablePositionYTop: 130,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: -160,
		levelEditorLimitEnd: 320,
		levelEditorShiftX: 460,
		defaultAmount: 3,
		maxAmount: 12,
		forbiddenPositionStrategies: ["outsideLeft"]
	},


	bossGroup4:
	{
		label: "Boss Group 4",
		background: "level7B",
		levelEditorStartPosition: 212776,
		levelEditorEndPosition: 212791,
		startPosition: 212792,
		endPosition: 212791,
		screenPositionStart: 1952,
		screenPositionEnd: 1952,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 1792,
		levelEditorLimitEnd: 2112,
		levelEditorShiftX: 76,
		defaultAmount: 1,
		maxAmount: 12
	},
	group2:
	{
		label: "Enemy Group 2",
		background: "level7B",
		startPosition: 212940,
		endPosition: 212987,
		screenPositionStart: 2150,
		screenPositionEnd: 2200,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 2112,
		levelEditorLimitEnd: 2672,
		levelEditorShiftX: 76,
		defaultAmount: 3,
		maxAmount: 8
	},
	bossGroup5:
	{
		label: "Boss Group 5",
		background: "level7B",
		levelEditorStartPosition: 213088,
		levelEditorEndPosition: 213103,
		startPosition: 213104,
		endPosition: 213103,
		screenPositionStart: 2380,
		screenPositionEnd: 2380,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 2352,
		levelEditorLimitEnd: 2672,
		levelEditorShiftX: 76,
		defaultAmount: 1,
		maxAmount: 4
	},
	bossHelperGroup1:
	{
		label: "Boss Helper Group 1",
		background: "level7B",
		startPosition: 213124,
		endPosition: 213155,
		screenPositionStart: 2512,
		screenPositionEnd: 2512,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 2352,
		levelEditorLimitEnd: 2672,
		levelEditorShiftX: 76,
		defaultAmount: 2,
		maxAmount: 3,
		specialProfile: "bossHelperType1Strategy"
	},
	bossHelperGroup2:
	{
		label: "Boss Helper Group 2",
		background: "level7B",
		startPosition: 213164,
		endPosition: 213195,
		screenPositionStart: 2512,
		screenPositionEnd: 2512,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 2352,
		levelEditorLimitEnd: 2672,
		levelEditorShiftX: 76,
		defaultAmount: 2,
		maxAmount: 3,
		specialProfile: "bossHelperType1Strategy"
	},
	bossHelperGroup3:
	{
		label: "Boss Helper Group 3",
		background: "level7B",
		startPosition: 213204,
		endPosition: 213219,
		screenPositionStart: 2512,
		screenPositionEnd: 2512,
		walkablePositionYTop: 200,
		walkablePositionYBottom: 239,
		levelEditorLimitStart: 2352,
		levelEditorLimitEnd: 2672,
		levelEditorShiftX: 76,
		defaultAmount: 1,
		maxAmount: 3,
		specialProfile: "bossHelperType1Strategy"
	},
}

// level7A begins at 00 00 (0000)
// level7B begins at 80 01 (0180)
// level7C begins at 00 00 (0000)

// level7A			130, 239
// level7B			200, 239
// level7C			130, 239
export default level7EnemyGroup;