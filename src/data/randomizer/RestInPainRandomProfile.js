const restInPainRandomProfile =
{
	label: "RIP (Rest in Pain)",
	enemyStrategy:
	{
		enemiesNoDrop:
		{
			randomMinAmount: 6,
			randomMaxAmount: 7
		},
		dropAnyFoodEnemies:
		{
			randomMinAmount: 1,
			randomMaxAmount: 1
		},
		dropBestFoodEnemies:
		{
			randomMinAmount: 0,
			randomMaxAmount: 1
		},
		crystalEnemies:
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
	max8Strategy:
	{
		enemiesNoDrop:
		{
			randomMinAmount: 3,
			randomMaxAmount: 3
		},
		dropAnyFoodEnemies:
		{
			randomMinAmount: 2,
			randomMaxAmount: 2
		},
		bossesOnly: 
		{
			randomMinAmount: 3,
			randomMaxAmount: 3
		}
	},
	max12Strategy:
	{
		enemiesNoDrop:
		{
			randomMinAmount: 6,
			randomMaxAmount: 7
		},
		dropBestFoodEnemies:
		{
			randomMinAmount: 1,
			randomMaxAmount: 1
		},
		bossesOnly: 
		{
			randomMinAmount: 3,
			randomMaxAmount: 4
		}
	},
	max2Type1Strategy:
	{
		enemiesNoDrop:
		{
			randomMinAmount: 2,
			randomMaxAmount: 2
		}
	},
	max2Type2Strategy:
	{
		enemiesNoDrop:
		{
			randomMinAmount: 1,
			randomMaxAmount: 1
		},
		dropAnyFoodEnemies:
		{
			randomMinAmount: 1,
			randomMaxAmount: 1
		}
	},
	max3Type1Strategy:
	{
		enemiesNoDrop:
		{
			randomMinAmount: 2,
			randomMaxAmount: 2
		},
		dropAnyFoodEnemies:
		{
			randomMinAmount: 1,
			randomMaxAmount: 1
		}
	},
	max3Type2Strategy:
	{
		enemiesNoDrop:
		{
			randomMinAmount: 2,
			randomMaxAmount: 2
		},
		dropAnyFoodEnemies:
		{
			randomMinAmount: 1,
			randomMaxAmount: 1
		}
	},
	max4Type1Strategy:
	{
		bossesOnly: 
		{
			randomMinAmount: 4,
			randomMaxAmount: 4
		}
	},
	max4Type2Strategy:
	{
		enemiesNoDrop:
		{
			randomMinAmount: 3,
			randomMaxAmount: 3
		},
		dropAnyFoodEnemies:
		{
			randomMinAmount: 1,
			randomMaxAmount: 1
		}
	},
	max6Strategy:
	{
		enemiesNoDrop:
		{
			randomMinAmount: 2,
			randomMaxAmount: 2
		},
		dropBestFoodEnemies:
		{
			randomMinAmount: 1,
			randomMaxAmount: 1
		},
		bossesOnly: 
		{
			randomMinAmount: 3,
			randomMaxAmount: 3
		}
	}
}


export default restInPainRandomProfile;
