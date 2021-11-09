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
		bossesOnly:
		{
			randomMinAmount: 3,
			randomMaxAmount: 4
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
			randomMinAmount: 2,
			randomMaxAmount: 2
		},
		dropEnemies:
		{
			randomMinAmount: 0,
			randomMaxAmount: 1
		}
	}
}


export default restInPainRandomProfile;
