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
		bossesOnly:
		{
			randomMinAmount: 1,
			randomMaxAmount: 2
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
			randomMaxAmount: 2
		}
	}
}


export default hardRandomProfile;
