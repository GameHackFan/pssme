const weakRandomProfile =
{
	label: "Weak",
	enemyStrategy:
	{
		enemiesNoDrop:
		{
			randomMinAmount: 7,
			randomMaxAmount: 9
		},
		dropEnemies:
		{
			randomMinAmount: 2,
			randomMaxAmount: 2
		},
		crystalEnemies:
		{
			randomMinAmount: 0,
			randomMaxAmount: 1
		},
		foodItems:
		{
			randomMinAmount: 1,
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
			randomMaxAmount: 0
		}
	}
}


export default weakRandomProfile;
