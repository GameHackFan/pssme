const dontFreezeOnBossPatch = 
{
	type: "overwrite",
	filename: "bpsm945a.u45",
	byteFormat: "hex",
	data:
	{
    // Remove 1st Stage Player Freezing
		"198366": [
      "00", "00", "03", "00",		"48", "02", "0E", "00",
			"00", "00", "FD", "FD", 	"C8", "00", "11", "00"
    ],

    // Remove 2nd Stage Player Freezing
		"200008": [
      "00", "00", "03", "00",		"48", "02", "0E", "00",
			"00", "00", "FD", "FD", 	"C8", "00", "11", "00"
    ],

		// Remove 3rd Stage Player Freezing
		"202154": [
      "00", "00", "03", "00",		"48", "02", "0E", "00",
			"00", "00", "FD", "FD", 	"C8", "00", "11", "00"
    ],


    // Remove 4th Stage Player Freezing
		"206140": [
      "00", "00", "03", "00",		"48", "02", "0E", "00",
			"00", "00", "FD", "FD", 	"C8", "00", "11", "00"
    ],


    // Remove 5th Stage Player Freezing
		"208974": [
      "00", "00", "03", "00",		"48", "02", "0E", "00",
			"00", "00", "FD", "FD", 	"C8", "00", "11", "00"
    ],

    // Remove 8th Stage Sub Boss Player Freezing
    "214442": [
      "00", "00", "03", "00",		"48", "02", "0E", "00",
			"00", "00", "FD", "FD", 	"C8", "00", "11", "00"
    ],

    // Remove 8th Stage Final Boss Player Freezing
		"215174": [
      "00", "00", "03", "00",		"48", "02", "0E", "00",
			"00", "00", "FD", "FD", 	"C8", "00", "11", "00"
    ],
	}
}


export default dontFreezeOnBossPatch;