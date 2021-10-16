const wildRandomProfile =
{
	label: "Wild (Savage)",
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
		bossesOnly:
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
			randomMinAmount: 0,
			randomMaxAmount: 1
		}
	},
	bossHelperType2Strategy:
	{
		enemiesNoDrop:
		{
			randomMinAmount: 3,
			randomMaxAmount: 3
		},
		bossesOnly:
		{
			randomMinAmount: 1,
			randomMaxAmount: 2
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
			randomMinAmount: 2,
			randomMaxAmount: 4
		}
	}
}


export default wildRandomProfile;
