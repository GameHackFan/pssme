const jumouImprovementPatch =
{
	type: "overwrite",
	filename: "bpsm945a.u45",
	byteFormat: "hex",
	data:
	{
		// Jumou's Straight Punch
		"98078": ["12"],

		// Jumou's Stomach Punch
		"98086": ["14"],

		// Jumou's Kick
		"98094": ["18"],

		// Jumou's Head Throw
		"98454": ["10"],
	}
}


export default jumouImprovementPatch;


/*	
		This patch balances how much damage Jumou does.
		Jumou is very slow and he hardly hits you, and when
		he does, it does way too little damage. With this
		patch, Jumou turns into a heavy hitter.


		Attack							Before			After

		Straight Punch			04 (04)			12 (18)			x4.5
		Stomach Punch				04 (04)			14 (20)			x5
		Kick								06 (06)			18 (24)			x4
		Head Throw					08 (08)			10 (16)			x2
*/