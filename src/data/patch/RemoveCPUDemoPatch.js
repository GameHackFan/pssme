const removeCPUDemoPatch = 
{
	type: "overwrite",
	filename: "bpsm945a.u45",
	byteFormat: "hex",
	data:
	{
		// TODO: 7th level was the one bugging, force it to use only the 3rd and 5th level demo?
		// The Pointer of the 1st CPU Demo ???
		"197704": ["52", "04"],

		// The Pointer of the 2nd CPU Demo ???
		"197708": ["52", "04"],

		// The Pointer of the 3rd CPU Demo ???
		"197712": ["52", "04"]
	}
}


export default removeCPUDemoPatch;