const sailorColorExpansionPatch =
{
	type: "overwrite",
	filename: "bpsm945a.u45",
	byteFormat: "hex",
  data:
  {    
    // Instruction that redirects the execution to where the
    // extra color for the player 2 is handled.
    "36794": ["F9", "4E", "07", "00", "00", "E8"],
    
    // A Label to make it obvious where the new colors start
    "374528":
    [
      "20", "20", "4E", "45", "57", "20", "20", "20",
      "43", "4F", "4C", "4F", "52", "53", "20", "20"
    ],

    // Sailor Moon Extra Color
    // Replacing what looks like an empty pallete
    // Old Address: 365760
    // "360256":
    "374592":
    [
      "0B", "48", "FE", "7F", "F7", "73", "F1", "5F",
      "AC", "4F", "E7", "3A", "E2", "19", "CC", "7B",
      "C0", "5F", "E8", "43", "02", "27", "96", "56",
      "AF", "39", "2B", "29", "A7", "18", "23", "08"
    ],

    // Sailor Mercury Extra Color
    // Replacing what looks like an empty pallete
    // Old Address: 366176
    // "360288":
    "374720":
    [
      "E9", "31", "86", "0C", "2B", "21", "D1", "35",
      "98", "4E", "FC", "7F", "37", "63", "18", "2E",
      "92", "21", "E3", "19", "EA", "32", "8B", "4B",
      "EF", "5B", "D7", "6F", "C9", "6F", "23", "00"
    ],

    // Sailor Mars Extra Color
    // Replacing what looks like an empty pallete
    // Old Address: 366304
    // "360320":
    "374848":
    [
      "B4", "24", "D7", "6F", "F4", "63", "6E", "4B",
      "CA", "36", "E5", "1D", "C6", "6F", "5B", "5A",
      "98", "3D", "F3", "24", "C8", "08", "FC", "7F",
      "D9", "46", "D2", "25", "2C", "11", "44", "00"
    ],

    // Sailor Jupiter Extra Color
    // Replacing what looks like an empty pallete
    // Old Address: 366432
    // "360352":
    "374976":
    [
      "30", "26", "F7", "6F", "F2", "5F", "8C", "4F",
      "C8", "32", "A3", "19", "E7", "73", "E6", "5B",
      "FC", "7B", "F9", "5A", "F4", "35", "3B", "4B",
      "97", "2E", "B2", "19", "AA", "0C", "23", "04"
    ],

    // Sailor Venus Extra Color
    // Replacing what looks like an empty pallete
    // Old Address: 366496
    // "360384":
    "375104":
    [
      "83", "28", "D7", "6F", "F4", "63", "6E", "4B",
      "CA", "36", "E5", "1D", "FC", "7B", "CF", "67",
      "ED", "3B", "86", "1F", "A3", "12", "C1", "09",
      "D8", "5E", "F1", "41", "86", "14", "23", "08"
    ],

    
    // A Label to make it obvious where the new colors end
    "375264":
    [
      "20", "20", "4E", "45", "57", "20", "20", "20",
      "43", "4F", "4C", "4F", "52", "53", "20", "20"
    ],

    // Code that handles the correct address for the
    // extra colors in case it is player 2. If it is
    // player 1, it will execute the same line of
    // code that it would in the original game.
    "518144":
    [
      "31", "3C", "00", "60", "47", "DC", "08", "28",
      "44", "0C", "00", "21", "00", "67", "08", "00",
      "F9", "4E", "00", "00", "C0", "8F", "46", "0C",
      "C0", "0E", "00", "67", "18", "00", "3C", "28",
      "00", "00", "00", "00", "10", "38", "FC", "C8",
      "02", "00", "84", "06", "07", "00", "3A", "E8",
      "44", "2A", "55", "DC", "F9", "4E", "00", "00",
      "C0", "8F", "00", "00", "A0", "22", "80", "21",
      "80", "21", "80", "21", "80", "21", "00", "00"
    ]
  }
}


export default sailorColorExpansionPatch;




// "36762": ["F9", "4E", "07", "00", "00", "E8"],

// "F9", "45", "05", "00", "00", "80", "6E", "0C",
// "01", "00", "2E", "22", "00", "67", "08", "00", 
// "F9", "4E", "00", "00", "A0", "8F", "3C", "2C",
// "00", "00", "00", "00", "10", "3C", "FC", "CC",
// "02", "00", "86", "06", "07", "00", "38", "E8",
// "46", "28", "D4", "D4", "3C", "2C", "00", "00",
// "00", "00", "F9", "4E", "00", "00", "A0", "8F",
// "00", "00", "A0", "22", "80", "21", "80", "21",
// "80", "21", "80", "21", "00", "00", "00", "00"