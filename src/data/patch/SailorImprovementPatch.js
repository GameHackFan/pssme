const sailorImprovementPatch = 
{
	type: "overwrite",
	filename: "bpsm945a.u45",
	byteFormat: "hex",
	data:
	{
		// All Sailors Desperation Attack Damage Given (Attack + Jump)
		"40480": ["03", "00"],

		// All Sailors Desperation Attack Damage Taken (Attack + Jump)
		"40512": ["03", "00"],

		// The minimum amount of health the player needs to execute 
		// the Desperation attack (Attack + Jump)
		"44024": ["03", "00"]
	}    
}


export default sailorImprovementPatch;


/*
		Desperation Attack (Attack + Jump) damage given
		and taken is reduced from 6 to 3.
*/

