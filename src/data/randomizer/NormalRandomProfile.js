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
      randomMaxAmount: 1
    }
  },
  specialEnemyStrategy:
  {
    ungrabbableEnemies:
    {
      randomMinAmount: 1,
      randomMaxAmount: 1
    }
  }
}


export default normalRandomProfile;

