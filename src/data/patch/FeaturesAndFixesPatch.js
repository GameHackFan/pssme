const featuresAndFixesPatch =
{
	type: "overwrite",
	filename: "bpsm945a.u45",
	byteFormat: "hex",
	data:
	{
		// Allows 2 of the same character to be selected.
		"24071":	["60"],

		// Instruction that redirects the execution to a code 
		// that handles enemy spawning.
		"197192":	["B9", "4E", "07", "00", "00", "DA"],

		// Code that prevents some bugs when some enemies spawn.
		"514560":
		[
			"6E", "0C", "1A", "00", "84", "13", "00", "66",
			"38", "00", "79", "4A", "10", "00", "00", "20",
			"00", "67", "2E", "00", "79", "4A", "10", "00",
			"00", "21", "00", "67", "24", "00", "3C", "30",
			"22", "00", "3C", "32", "00", "00", "3C", "34",
			"C0", "01", "6E", "D4", "86", "13", "3C", "36",
			"C0", "00", "43", "D6", "3C", "38", "00", "00",
			"08", "2F", "B8", "4E", "F0", "66", "5F", "20",
			"18", "30", "18", "32", "18", "34", "75", "4E",
		],

		// Instruction that redirects the execution to a code 
		// that handles enemy spawning.
		"88410":	["F9", "4E", "07", "00", "60", "DA", "71", "4E"],

		// Code that prevents some bugs when some enemies spawn.
		"514656":
		[
			"6E", "4A", "84", "13", "00", "66", "0A", "00",
			"6E", "B0", "C4", "13", "00", "66", "08", "00",
			"F9", "4E", "01", "00", "62", "59", "F9", "4E",
			"01", "00", "7A", "59", "00", "00", "00", "00"
		],



		// Castor & Pollux Fixes
		// Instruction that redirects the execution to where 
		// C&P new health table is handled.
		"85322": ["F9", "4E", "07", "00", "D0", "DC", "71", "4E"],

		// Code that loads the health from the new health table
		// and stores it in the memory position it must be.
		"515280":
		[
			"F9", "43", "07", "00", "E6", "DC", "31", "10",
			"00", "10", "40", "31", "30", "00", "F9", "4E",
			"01", "00", "52", "4D", "00", "00", "30", "30",
			"40", "30", "40", "30", "50", "50", "60", "60"
		],

		// Instruction that redirects the execution to the code 
		// that handle if the enemies should or not die after 
		// C&P dies.
		"85172": ["F9", "4E", "07", "00", "F0", "DC"],

		// Code that forbids any C&P outside stage 1 to kill 
		// their friends after they dies.
		"515312":
		[
			"6E", "0C", "04", "00", "80", "13", "0C", "67",
			"B9", "4E", "01", "00", "EE", "21", "F9", "4E",
			"01", "00", "BA", "4C", "B9", "4E", "01", "00",
			"E4", "21", "F9", "4E", "01", "00", "BA", "4C",
		],



		// Morga Fixes
		// Instruction that redirects the execution to the 
		// code that handles Morga color ID 4+ spawn.
		"105232":
		[
			"F9", "4E", "07", "00", "10", "DC", "71", "4E",
			"71", "4E"
		],

		// Code that forces Morga color ID 4+ to skip the   
		// girl choking animation when she spawns.
		"515088":
		[
			"28", "30", "02", "00", "40", "02", "0F", "00",
			"40", "0C", "04", "00", "06", "65", "F9", "4E",
			"01", "00", "D4", "9F", "7C", "31", "01", "00",
			"04", "00", "F9", "4E", "01", "00", "1A", "9B"
		],

		// Instruction that redirects the execution to the 
		// code that handles Morga color ID 4+ ignoring rose.
		"105006": ["F9", "4E", "07", "00", "40", "DC"],

		// Code that forces Morga color ID 4+ to skip    
		// waiting for the rose.
		"515136":
		[
			"28", "30", "02", "00", "40", "02", "0F", "00",
			"40", "0C", "04", "00", "0C", "6C", "28", "30",
			"30", "00", "48", "E2", "F9", "4E", "01", "00",
			"34", "9A", "F9", "4E", "01", "00", "6A", "9A"
		],

		// Instruction that redirects the execution to the 
		// code that handles Morga color ID 4+ accepting 
		// to lose her HP until she dies.
		"37334":
		[
			"F9", "4E", "07", "00", "70", "DC", "71", "4E",
			"71", "4E", "71", "4E", "71", "4E", "71", "4E"
		],

		"515184":
		[
			"50", "0C", "19", "00", "14", "66", "28", "36",
			"02", "00", "43", "02", "0F", "00", "43", "0C",
			"04", "00", "06", "6C", "F9", "4E", "00", "00",
			"E6", "91", "F9", "4E", "00", "00", "08", "92",
		],

		// Instruction that redirects the execution to the code 
		// that handle if the enemies should or not die after 
		// Morga dies.
		"105106":["F9", "4E", "07", "00", "A0", "DC"],

		// Code that forbids any Morga with color ID 4+ 
		// to kill her friends after she dies.
		"515232":
		[
			"28", "30", "02", "00", "40", "02", "0F", "00",
			"40", "0C", "04", "00", "0C", "65", "B9", "4E",
			"01", "00", "D6", "21", "F9", "4E", "01", "00",
			"98", "9A", "B9", "4E", "01", "00", "CC", "21",
			"F9", "4E", "01", "00", "98", "9A", "00", "00"
		],


		// Bakene Fixes
		// Instruction that redirects the execution to the code 
		// that handle if the enemies should or not die after 
		// Bakene dies.
		"119102":	["F9", "4E", "07", "00", "E0", "DB"],

		// Code that forbids any Bakene that is not posture ID 
		// 40 (3rd Form) to kill his friends after he dies.
		"515040":
		[
			"68", "0C", "40", "00", "02", "00", "0C", "67",
			"B9", "4E", "01", "00", "D6", "21", "F9", "4E",
			"01", "00", "44", "D1", "B9", "4E", "01", "00",
			"CC", "21", "F9", "4E", "01", "00", "44", "D1"
		],


		// Zoisite Fixes
		// Instruction that redirects the execution to the 
		// code that handles Zoisite color ID 4+.
		"122084":
		[
			"F9", "4E", "07", "00", "A0", "DB", "71", "4E",
			"71", "4E", "71", "4E"
		],

		// Code that forces Zoisite color ID 4+ to not 
		// freeze for a short period of time after spawning.
		"514976":
		[
			"28", "30", "02", "00", "40", "02", "0F", "00",
			"40", "0C", "04", "00", "0A", "6C", "2E", "20",
			"86", "13", "AE", "B0", "C4", "13", "06", "66",
			"F9", "4E", "01", "00", "F0", "DC", "F9", "4E",
			"01", "00", "16", "DD", "00", "00", "00", "00",
		],


		// Kunzite Fixes
		// Instruction that redirects the execution to the 
		// code that handles Kunzite color ID 4+.
		"124928":
		[
			"F9", "4E", "07", "00", "60", "DB", "71", "4E", 
			"71", "4E", "71", "4E"
		],

		// Code that forces Kunzite color ID 4+ to not 
		// freeze for a short period of time after spawning.
		"514912":
		[
			"28", "30", "02", "00", "40", "02", "0F", "00",
			"40", "0C", "04", "00", "0A", "6C", "2E", "20",
			"86", "13", "AE", "B0", "C4", "13", "06", "66",
			"F9", "4E", "01", "00", "0C", "E8", "F9", "4E",
			"01", "00", "26", "E8", "00", "00", "00", "00",
		],


		// Queen Beryl Fixes
		// Instruction that redirects the execution to the 
		// code that handles Queen Beryl's color ID 4+.
		"126948":
		[
			"F9", "4E", "07", "00", "00", "DB", "71", "4E", 
			"71", "4E", "71", "4E"
		],

		// Code that forces Queen Beryl's color ID 4+ to not 
		// freeze for a short period of time after spawning.
		"514816":
		[
			"28", "30", "02", "00", "40", "02", "0F", "00",
			"40", "0C", "04", "00", "0A", "6C", "2E", "20",
			"86", "13", "AE", "B0", "C4", "13", "06", "66",
			"F9", "4E", "01", "00", "F0", "EF", "F9", "4E",
			"01", "00", "0A", "F0", "00", "00", "00", "00"
		],

		// Instruction that redirects the execution to the code 
		// that fixes Queen Beryl's Grab Attack bug.
		"128816":	["F9", "4E", "07", "00", "30", "DB"],

		// Code that fixes Queen Beryl's Grab Attack bug.
		"514864":
		[
			"7C", "31", "01", "00", "0C", "00", "7C", "31",
			"01", "00", "0E", "00", "F9", "4E", "01", "00",
			"36", "F7", "00", "00", "00", "00", "00", "00"
		]
	}
}


export default featuresAndFixesPatch;

