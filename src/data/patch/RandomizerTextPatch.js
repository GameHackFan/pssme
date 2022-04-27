const randomizerTextPatch = 
{
	priority: 16,
	type: "overwrite",
	filename: "bpsm945a.u45",
	byteFormat: "hex",
	levelByteIndex: 520040,
	levelSize: 10,
	seedByteIndex: 520064,
	seedSize: 20,
	data:
	{
		// Instruction that redirects the execution to where the 
		// new text is going to be handled.
		"146824":
		[
			"F9", "4E", "07", "00", "00", "EF", "71", "4E",
			"71", "4E", "71", "4E", "71", "4E", "71", "4E",
			"71", "4E", "71", "4E", "71", "4E", "71", "4E",
			"71", "4E"
		],


		// Code that draws the new text from the address 7EF30 in
		// the title screen.
		"519936":
		[
			"F9", "47", "07", "00", "30", "EF", "B9", "4E",
			"00", "00", "FE", "14", "42", "06", "10", "00",
			"B9", "4E", "00", "00", "FE", "14", "42", "06",
			"10", "00", "B9", "4E", "00", "00", "FE", "14",
			"F9", "47", "02", "00", "24", "3E", "F9", "4E",
			"02", "00", "A2", "3D"
		],


		// Title Screen Text.
		"519984":
		[
			"74", "68", "70", "74", "3A", "73", "2F", "2F",
			"69", "67", "68", "74", "62", "75", "63", "2E",
			"6D", "6F", "47", "2F", "6D", "61", "48", "65",
			"63", "61", "46", "6B", "6E", "61", "70", "2F",
			"73", "73", "65", "6D", "20", "00", "52", "20",
			"6E", "61", "6F", "64", "69", "6D", "65", "7A",
			"20", "72", "65", "4C", "65", "76", "20", "6C",
			"2A", "2A", "2A", "2A", "2A", "2A", "2A", "2A",
			"2A", "2A", "76", "20", "2E", "31", "20", "36",
			"00", "20", "53", "20", "65", "65", "20", "64",
			"2A", "2A", "2A", "2A", "2A", "2A", "2A", "2A",
			"2A", "2A", "2A", "2A", "2A", "2A", "2A", "2A",
			"2A", "2A", "2A", "2A", "00", "20"
		]
	}
}


export default randomizerTextPatch;
