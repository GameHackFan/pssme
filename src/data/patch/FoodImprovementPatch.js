const foodImprovementPatch =
{
	type: "overwrite",
	filename: "bpsm945a.u45",
	byteFormat: "hex",
	data:
	{
		// New healing values for the foods.
		"42446":
		[
			"10", "20", "40", "14", "18", "08", "1A",
			"30", "28", "06", "0C", "0A", "16", "0E"
		],
	}
}


export default foodImprovementPatch;


/*	This patch balances how much each food heals instead of the
		default 0A for most food, 14 for some food or 1E for ice cream cup.
		Each food will heal its own amount of health now.
		Popcorn and Lollipop is healing less than the default value.
		Donut is healing the same as before.
		Everything else is healing more than before.
		The concept of 3 groups of food like bad, average and good is still
		there but, it is more balanced now.

		Popcorn:						06
		Lollipop:						08
		Donut:							0A
		Chocolate Candy:		0C
		Muffin:							0E
		Ice Cream Cornet:		10

		Pudding:						14
		Soup:								16
		Piece of Cake:			18
		Piece of Pie:				1A
		
		Chocolate Bar:			20
		Meatball:						28
		Round Cake:					30
		Ice Cream Cup:			40
*/