const normalRandomProfile =
{
  label: "Normal",
  enemyStrategy:
  {
    enemiesNoDrop:
    {
      randomMinAmount: 7,
      randomMaxAmount: 10
    },
    dropEnemies:
    {
      randomMinAmount: 1,
      randomMaxAmount: 2
    },
    bossesOnly: 
    {
      randomMinAmount: 0,
      randomMaxAmount: 1
    },
    foodItems:
    {
      randomMinAmount: 0,
      randomMaxAmount: 2
    }
  },
  bossHelperType1Strategy:
  {
    enemiesNoDrop:
    {
      randomMinAmount: 4,
      randomMaxAmount: 4
    },
    dropEnemies:
    {
      randomMinAmount: 0,
      randomMaxAmount: 1
    }
  },
  bossHelperType2Strategy:
  {
    enemiesNoDrop:
    {
      randomMinAmount: 4,
      randomMaxAmount: 4
    },
    bossesOnly:
    {
      randomMinAmount: 0,
      randomMaxAmount: 1
    },
    dropEnemies:
    {
      randomMinAmount: 0,
      randomMaxAmount: 1
    }
  },
  finalBossStrategy:
  {
    ungrabbableEnemies:
    {
      randomMinAmount: 1,
      randomMaxAmount: 1
    },
  }
}


export default normalRandomProfile;

