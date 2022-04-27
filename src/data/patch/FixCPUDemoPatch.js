const fixCPUDemoPatch = 
{
	priority: 17,
	type: "overwrite",
	filename: "bpsm945a.u45",
	byteFormat: "hex",
	data:
	{
		// Forces to run only 2nd and 3rd CPU Demo pointers.
		"151370":
		[
			"7C", "C0", "01", "00", "40", "06", "0A", "00",
			"71", "4E"
		],



		// CPU Demo 2
		// Area ID
		"10880": ["00"],

		// Area Camera Starting Position X
		"10890": ["20", "03"],

		// Area Camera Starting Position Y
		"10896": ["20", "00"],

		// Demo Content
		"215410":
		[
			// Inputs
			"00", "00", "03", "00", "CE", "00", "FE", "72",
			"04", "00", "00", "00",

			// Area
			"00", "00", "03", "00", "B6", "00", "02", "73",
			"60", "06", "00", "00", "00", "00", "78", "2A",

			// 1st Sailor
			"00", "00", "03", "00", "26", "02", "01", "00",
			"00", "00", "80", "00", "D8", "00", "07", "00",
			"00", "00",
			
			// 2nd Sailor
			"00", "00", "03", "00", "26", "02", "02", "00",
			"00", "00", "5C", "00", "E8", "00", "07", "00",
			"01", "00",
			
			"00", "00", "03", "00", "1A", "02", "00", "00",
			"00", "00", "80", "62", "00", "00", "00", "00",
			"AC", "62",

			"00", "00", "03", "00", "0E", "02", "00", "00",
			"C6", "18", "00", "00", "00", "00", "20", "00",
			"01", "00", "17", "00", "BF", "00", "00", "00",
			"03", "00", "CE", "00", "D0", "13", "00", "00",
			"C6", "24", "00", "00", "03", "00", "96", "01",
			"99", "60", "00", "00", "03", "00", "78", "00",
			"00", "00",
			
			// Area Lock Pointer
			"00", "00", "03", "00", "4C", "05"
		],



		// CPU Demo 3
		// Area ID
		"10988": ["00"],

		// Area Camera Starting Position X
		"10998": ["A0", "02"],

		// Area Camera Starting Position Y
		"11004": ["20", "00"],

		// Demo Content
		"215548":
		[
			// Inputs
			"00", "00", "03", "00", "CE", "00", "FE", "72",
			"04", "00", "00", "40",

			// Area
			"00", "00", "03", "00", "B6", "00", "02", "73",
			"C0", "07", "00", "00", "00", "00", "E4", "2A",
			
			// 1st Sailor
			"00", "00", "03", "00", "26", "02", "05", "00",
			"00", "00", "7A", "00", "B8", "00", "07", "00",
			"00", "00",
			
			// 2nd Sailor
			"00", "00", "03", "00", "26", "02", "03", "00",
			"00", "00", "52", "00", "C8", "00", "07", "00",
			"01", "00",

			"00", "00", "03", "00", "1A", "02", "00", "00",
			"00", "00", "80", "62", "00", "00", "00", "00",
			"AC", "62",
			
			"00", "00", "03", "00", "0E", "02", "00", "00",
			"C6", "18", "00", "00", "00", "00", "20", "00",
			"01", "00", "17", "00", "BF", "00", "00", "00",
			"03", "00", "CE", "00", "D0", "13", "00", "00",
			"C6", "24", "00", "00", "03", "00", "96", "01",
			"99", "60", "00", "00", "03", "00", "78", "00",
			"00", "00",
			
			// Area Lock Pointer
			"00", "00", "03", "00", "4C", "05"
		],



		// It removes junk bytes
		"215686":
		[
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",

			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",

			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",

			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00",
			"00", "00", "00", "00", "00", "00", "00", "00"
		]
	}
}


export default fixCPUDemoPatch;


// CPU Demo 1 pointer might be used by the Extra Level
// Demo 2 sucks hard.
// Demo 1 inputs sucks hard.