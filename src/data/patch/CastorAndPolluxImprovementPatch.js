
const castorAndPolluxImprovementPatch =
{
	type: "overwrite",
	filename: "bpsm945a.u45",
	byteFormat: "hex",
	data:
	{
		// Instruction that redirects the execution to where the
		// new health value is handled.
		"85322": ["F9", "4E", "07", "00", "70", "EA", "00", "80"],


		// Code that loads the health from the new health table
		// and stores it in the memory position it must be.
		"518768":
		[
			"F9", "43", "07", "00", "86", "EA", "31", "10",
			"00", "10", "40", "31", "30", "00", "F9", "4E",
			"01", "00", "52", "4D", "00", "00", "30", "30",
			"40", "30", "40", "30", "50", "50", "60", "60"]
	}
}


export default castorAndPolluxImprovementPatch;


/*	
		This patch improves the health table.
		
		Color ID				Before			After

		00 (Boss 1)			30 (48)			30
		01 (Normal 1)		30 (48)			30
		02 (Normal 2)		30 (48)			30
		03 (Normal 3)		30 (48)			40
		04 (Boss 2)			30 (48)			30
		05 (Normal 4)		30 (48)			40
		06 N/A					?						50
		07 (Extra 1)		N/A					50
		08 N/A					N/A					60
		09 (Extra 2)		N/A					60
		0A N/A					?						N/A
*/