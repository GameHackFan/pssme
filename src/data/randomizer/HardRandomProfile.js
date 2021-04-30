const hardRandomProfile =
{
  label: "Hard",
  enemyStrategy:
  {
    enemies:
    {
      randomMinAmount: 1,
      randomMaxAmount: 3
    },
    enemiesNoDrop:
    {
      randomMinAmount: 4,
      randomMaxAmount: 6
    },
    dropEnemies:
    {
      randomMinAmount: 1,
      randomMaxAmount: 3
    },
    enemiesAndBosses: 
    {
      randomMinAmount: 1,
      randomMaxAmount: 1
    },
    bossesOnly:
    {
      randomMinAmount: 1,
      randomMaxAmount: 1
    },
    foodItems:
    {
      randomMinAmount: 0,
      randomMaxAmount: 1
    }
  },
  specialEnemyStrategy:
  {
    ungrabbableEnemies:
    {
      randomMinAmount: 1,
      randomMaxAmount: 2
    }
  }
}


export default hardRandomProfile;