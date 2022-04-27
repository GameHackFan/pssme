const crystalImprovementPatch2 = 
{
	priority: 19,
	type: "overwrite",
	filename: "bpsm945a.u45",
	byteFormat: "hex",
	data:
	{
		// The maximum amount of crystal you can get. Default is 5
		"42352":	["07", "00"],


		// Instruction that redirects the execution to where the 
		// amount of crystal to use is changed.
		"151588":	["F9", "4E", "07", "00", "00", "EE"],


		// Code that handles when the player press Punch + Jump, 
		// it changes the amount of crystals to be used.
		"519680":
		[
			"0E", "60", "3E", "60", "B9", "4E", "03", "00",
			"1C", "00", "F9", "4E", "02", "00", "2A", "50",
			"3C", "30", "80", "00", "6E", "C0", "AA", "01",
			"71", "4E", "71", "4E", "6E", "C0", "A8", "01",
			"7C", "B0", "80", "00", "DC", "66", "2E", "30",
			"8C", "15", "40", "52", "6E", "B0", "C4", "14",
			"06", "6C", "7C", "B0", "05", "00", "04", "6D",
			"3C", "30", "00", "00", "40", "3D", "8C", "15",
			"C0", "60", "3C", "30", "80", "00", "6E", "C0",
			"FA", "01", "71", "4E", "71", "4E", "6E", "C0",
			"F8", "01", "7C", "B0", "80", "00", "AC", "66",
			"2E", "30", "8C", "16", "40", "52", "6E", "B0",
			"C4", "15", "06", "6C", "7C", "B0", "05", "00",
			"04", "6D", "3C", "30", "00", "00", "40", "3D",
			"8C", "16", "90", "60"
		],



		// Instruction that redirects the execution to where the 
		// new code printing the crystal indicator is handled.
		"24782":
		[
			"F9", "4E", "07", "00", "B0", "EE", "71", "4E",
			"71", "4E", "71", "4E", "71", "4E", "71", "4E",
			"71", "4E", "71", "4E", "71", "4E", "71", "4E",
			"71", "4E", "71", "4E"
		],



		// Code that prints the amount of crystal disired to be 
		// used in red and the rest with the default blue color.
		"519856":
		[
			"2D", "3E", "F6", "00", "3C", "36", "20", "10",
			"2D", "34", "2E", "00", "42", "53", "24", "6B",
			"47", "48", "42", "48", "3C", "30", "5B", "0A",
			"B8", "4E", "64", "12", "41", "5C", "42", "48",
			"47", "48", "47", "53", "47", "4A", "08", "6C",
			"3C", "36", "20", "12", "3C", "1E", "09", "00",
			"CA", "51", "DE", "FF", "F8", "4E", "EA", "60"					
		],



		// Instruction that redirects the execution to where 
		// the new code that handles the power the sailor 
		// should use and the result of that.
		"42644":
		[
			"F9", "4E", "07", "00", "80", "EE", "71", "4E",
			"71", "4E", "71", "4E", "71", "4E"
		],

		// Code that handles the new execution of crystals,
		// forcing the correct power to be executed and 
		// setting the correct amount of crystals the player 
		// has after it.
		"519808":
		[
			"29", "30", "F6", "00", "40", "52", "29", "34",
			"2E", "00", "40", "B4", "02", "6E", "02", "30",
			"40", "94", "42", "33", "2E", "00", "40", "3D",
			"2A", "24", "F9", "4E", "00", "00", "A2", "A6"			
		]
	}
}


export default crystalImprovementPatch2;









