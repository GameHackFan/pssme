const savageRandomProfile =
{
  label: "Savage",
  enemyStrategy:
  {
    enemies:
    {
      randomMinAmount: 1,
      randomMaxAmount: 1
    },
    enemiesNoDrop:
    {
      randomMinAmount: 4,
      randomMaxAmount: 7
    },
    dropEnemies:
    {
      randomMinAmount: 2,
      randomMaxAmount: 3
    },
    enemiesAndBosses: 
    {
      randomMinAmount: 0,
      randomMaxAmount: 1
    },
    bossesOnly:
    {
      randomMinAmount: 2,
      randomMaxAmount: 2
    }
  },
  specialEnemyStrategy:
  {
    ungrabbableEnemies:
    {
      randomMinAmount: 2,
      randomMaxAmount: 4
    }
  }
}


export default savageRandomProfile;