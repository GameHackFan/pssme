const areaImprovementPatch = 
{
	priority: 0,
	type: "overwrite",
	filename: "bpsm945a.u45",
	byteFormat: "hex",
	data:
	{
		// Instruction that redirects the execution to where it 
		// handles area IDs with the second byte bigger than 0
		"8320":
		[
			"F9", "4E", "07", "00", "00", "E0", "71", "4E",
			"71", "4E", "71", "4E"
		],

		// Code that adds the possibility of reading customized 
		// data for areas based on their second bytes.
		"516096":
		[
			"40", "3D", "84", "13", "48", "E0", "40", "3D",
			"80", "13", "2E", "30", "84", "13", "40", "02",
			"FF", "00", "40", "3D", "84", "13", "6E", "4A",
			"80", "13", "24", "67", "2E", "30", "80", "13",
			"FC", "C0", "02", "00", "F9", "41", "07", "00",
			"52", "E0", "30", "30", "00", "00", "F9", "41",
			"03", "00", "00", "00", "C0", "D0", "2E", "30",
			"84", "13", "F9", "4E", "00", "00", "8C", "20",
			"F9", "41", "07", "00", "00", "A1", "FC", "C0",
			"3A", "00", "C0", "D0", "F9", "4E", "00", "00",
			"8C", "20", "00", "00", "A0", "FB", "DA", "FB",
			"14", "FC", "4E", "FC", "88", "FC", "C2", "FC",
			"FC", "FC", "36", "FD", "70", "FD", "AA", "FD"
		],

		// Code that changes the position X of both players.
		"516256":
		[
			"D8", "33", "10", "00", "40", "20", "D8", "33",
			"10", "00", "40", "21", "75", "4E", "00", "00"
		],

		// Code that changes the position Y of both players.
		"516272":
		[
			"D8", "33", "10", "00", "44", "20", "D8", "33",
			"10", "00", "44", "21", "75", "4E", "00", "00"
		],

		// Code that changes the looking direction of both players.
		"516288":
		[
			"D8", "33", "10", "00", "26", "20", "D8", "33",
			"10", "00", "26", "21", "75", "4E", "00", "00"
		]
	}
}


export default areaImprovementPatch;