const easyRandomProfile =
{
	label: "Easy",
	enemyStrategy:
	{
		enemiesNoDrop:
		{
			randomMinAmount: 8,
			randomMaxAmount: 10
		},
		dropEnemies:
		{
			randomMinAmount: 2,
			randomMaxAmount: 3
		},
		foodItems:
		{
			randomMinAmount: 0,
			randomMaxAmount: 1
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
			randomMinAmount: 1,
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
		dropEnemies:
		{
			randomMinAmount: 1,
			randomMaxAmount: 1
		}
	},
	finalBossStrategy:
	{
		ungrabbableEnemies:
		{
			randomMinAmount: 0,
			randomMaxAmount: 1
		}
	}
}


export default easyRandomProfile;
