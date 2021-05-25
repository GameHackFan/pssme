const easyRandomProfile =
{
  label: "Easy",
  enemyStrategy:
  {
    enemiesNoDrop:
    {
      randomMinAmount: 7,
      randomMaxAmount: 9
    },
    dropEnemies:
    {
      randomMinAmount: 2,
      randomMaxAmount: 2
    },
    crystalEnemies:
    {
      randomMinAmount: 0,
      randomMaxAmount: 1
    },
    foodItems:
    {
      randomMinAmount: 1,
      randomMaxAmount: 2
    }
  },
  specialEnemyStrategy:
  {
    ungrabbableEnemies:
    {
      randomMinAmount: 0,
      randomMaxAmount: 0
    }
  }
}


export default easyRandomProfile;
