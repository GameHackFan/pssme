const randomizerTextPatch = 
{
	type: "overwrite",
	filename: "bpsm945a.u45",
	byteFormat: "hex",
  levelByteIndex: 147020,
  levelSize: 6,
  seedByteIndex: 147026,
  seedSize: 20,
	data:
	{
    /*
      Title Screen Text

      The 6th last byte is the beginning of the
      version text
    */
		"146980": [
      "69", "67", "68", "74", "62", "75", "63", "2E",
      "6D", "6F", "47", "2F", "6D", "61", "48", "65",
      "63", "61", "46", "6B", "6E", "61", "70", "2F",
      "73", "73", "65", "6D", "00", "20", "61", "52",
      "64", "6E", "6D", "6F", "7A", "69", "72", "65",
      "53", "20", "65", "65", "20", "64", "39", "39",
      "39", "39", "39", "39", "39", "39", "39", "39",
      "39", "39", "39", "39", "39", "39", "39", "39",
      "39", "39", "76", "00", "30", "20", "35", "2E",
      "00", "20"
    ]
	}    
}


export default randomizerTextPatch;