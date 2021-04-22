const level1EnemyGroup =
{
  group1:
  {
    label: "Enemy Group 1",
    background: "level1",
    startPosition: 197974,
    endPosition: 198069,
    screenPositionStart: 700,
    screenPositionEnd: 1400,
    walkablePositionYTop: 169,
    walkablePositionYBottom: 239,
    levelEditorLimitStart: 512,
    levelEditorLimitEnd: 1600,
    defaultAmount: 6,
    maxAmount: 14
  },
  group2:
  {
    label: "Enemy Group 2",
    background: "level1",
    startPosition: 198100,
    endPosition: 198179,
    screenPositionStart: 1750,
    screenPositionEnd: 1950,
    walkablePositionYTop: 169,
    walkablePositionYBottom: 239,
    levelEditorLimitStart: 1600,
    levelEditorLimitEnd: 2144,
    defaultAmount: 5,
    maxAmount: 14
  },
  bossGroup:
  {
    label: "Boss Group",
    background: "level1",
    levelEditorStartPosition: 198220,
    levelEditorEndPosition: 198251,
    startPosition: 198252, // It won't overwrite.
    endPosition: 198251,
    screenPositionStart: 2200,    
    screenPositionEnd: 2496,      
    walkablePositionYTop: 169,
    walkablePositionYBottom: 239,
    levelEditorLimitStart: 2144,
    levelEditorLimitEnd: 2656,
    defaultAmount: 2,
    maxAmount: 1
  },
  bossHelperGroup1:
  {
    label: "Boss Helper Group 1",
    background: "level1",
    startPosition: 198432,
    endPosition: 198447,
    screenPositionStart: 2496,   // 0
    screenPositionEnd: 2496,     // 0
    walkablePositionYTop: 169,
    walkablePositionYBottom: 239,
    levelEditorLimitStart: 2336,
    levelEditorLimitEnd: 2656,
    defaultAmount: 1,
    maxAmount: 2
  },
  bossHelperGroup2:
  {
    label: "Boss Helper Group 2",
    background: "level1",
    startPosition: 198456,
    endPosition: 198471,
    screenPositionStart: 2496,   // 0
    screenPositionEnd: 2496,     // 0
    walkablePositionYTop: 169,
    walkablePositionYBottom: 239,
    levelEditorLimitStart: 2336,
    levelEditorLimitEnd: 2656,
    defaultAmount: 1,
    maxAmount: 2
  },
  bossHelperGroup3:
  {
    label: "Boss Helper Group 3",
    background: "level1",
    startPosition: 198480,
    endPosition: 198495,
    screenPositionStart: 2496,   // 0
    screenPositionEnd: 2496,     // 0
    walkablePositionYTop: 169,
    walkablePositionYBottom: 239,
    levelEditorLimitStart: 2336,
    levelEditorLimitEnd: 2656,
    defaultAmount: 1,
    maxAmount: 2
  },
  bossHelperGroup4:
  {
    label: "Boss Helper Group 4",
    background: "level1",
    startPosition: 198504,
    endPosition: 198519,
    screenPositionStart: 2496,   // 0
    screenPositionEnd: 2496,     // 0
    walkablePositionYTop: 169,
    walkablePositionYBottom: 239,
    levelEditorLimitStart: 2336,
    levelEditorLimitEnd: 2656,
    defaultAmount: 1,
    maxAmount: 2
  },
  bossHelperGroup5:
  {
    label: "Boss Helper Group 5",
    background: "level1",
    startPosition: 198528,
    endPosition: 198543,
    screenPositionStart: 2496,   // 0
    screenPositionEnd: 2496,     // 0
    walkablePositionYTop: 169,
    walkablePositionYBottom: 239,
    levelEditorLimitStart: 2336,
    levelEditorLimitEnd: 2656,
    defaultAmount: 1,
    maxAmount: 2
  },
  bossHelperGroup6:
  {
    label: "Boss Helper Group 6",
    background: "level1",
    startPosition: 198552,
    endPosition: 198567,
    screenPositionStart: 2496,   // 0
    screenPositionEnd: 2496,     // 0
    walkablePositionYTop: 169,
    walkablePositionYBottom: 239,
    levelEditorLimitStart: 2336,
    levelEditorLimitEnd: 2656,
    defaultAmount: 1,
    maxAmount: 2
  },
  bossHelperGroup7:
  {
    label: "Boss Helper Group 7",
    background: "level1",
    startPosition: 198576,
    endPosition: 198591,
    screenPositionStart: 2496,   // 0
    screenPositionEnd: 2496,     // 0
    walkablePositionYTop: 169,
    walkablePositionYBottom: 239,
    levelEditorLimitStart: 2336,
    levelEditorLimitEnd: 2656,
    defaultAmount: 1,
    maxAmount: 2
  }
}

// level1 begins at A0 02 (02A0)

// level1     169, 239
export default level1EnemyGroup;