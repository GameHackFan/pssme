const restInPainRandomProfile =
{
  label: "RIP (Rest in Pain)",
  enemyStrategy:
  {
    enemies:
    {
      randomMinAmount: 1,
      randomMaxAmount: 1
    },
    enemiesNoDrop:
    {
      randomMinAmount: 5,
      randomMaxAmount: 6
    },
    dropEnemies:
    {
      randomMinAmount: 1,
      randomMaxAmount: 2
    },
    enemiesAndBosses: 
    {
      randomMinAmount: 0,
      randomMaxAmount: 1
    },
    bossesOnly:
    {
      randomMinAmount: 3,
      randomMaxAmount: 4
    }
  },
  specialEnemyStrategy:
  {
    ungrabbableEnemies:
    {
      randomMinAmount: 4,
      randomMaxAmount: 5
    }
  }
}


export default restInPainRandomProfile;
