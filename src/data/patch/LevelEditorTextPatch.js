const levelEditorTextPatch = 
{
	type: "overwrite",
	filename: "bpsm945a.u45",
	byteFormat: "hex",
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
      "73", "73", "65", "6D", "00", "20", "52", "20",
      "4D", "4F", "43", "20", "73", "75", "6F", "74",
      "69", "6D", "65", "7A", "20", "64", "79", "42",
      "54", "20", "65", "68", "4C", "20", "76", "65",
      "6C", "65", "45", "20", "69", "64", "6F", "74",
      "20", "72", "76", "00", "30", "20", "35", "2E",
      "00", "20"
    ]
	}    
}


export default levelEditorTextPatch;
