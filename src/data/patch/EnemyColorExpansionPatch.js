const enemyColorExpansionPatch =
{
	type: "overwrite",
	filename: "bpsm945a.u45",
	byteFormat: "hex",
  data:
  {
    // Furau Extra 1 (Blue and White)
    // Replacing Oniwabandana 3 (Pink and Blue)
    "367200":
    [
      "4D", "29", "FF", "7F", "F8", "77", "F5", "6B",
      "8F", "5B", "29", "47", "02", "26", "5A", "4D",
      "B2", "30", "49", "14", "DE", "77", "39", "63",
      "94", "4E", "EF", "39", "29", "21", "03", "00"
    ],

    // Oniwabandana 3 (Pink and Blue)
    // Replacing Tesuni 2 (Gray and Purple)
    "367296":
    [
      "7C", "5A", "EB", "24", "6E", "3D", "F4", "49",
      "45", "26", "09", "37", "69", "15", "4E", "2E",
      "31", "3F", "F3", "57", "E7", "25", "2D", "4B",
      "90", "5B", "F5", "6B", "FB", "77", "86", "0C"
    ],

    // Oniwabandana Extra 1 (Red and Black)
    // Replacing Tesuni 4 (Green and Pink)
    "367360":
    [
      "3C", "5B", "E5", "18", "CB", "31", "4F", "42",
      "A0", "1A", "60", "37", "C1", "09", "A3", "12",
      "86", "1F", "ED", "3B", "E7", "25", "2D", "4B",
      "90", "5B", "F5", "6B", "FB", "77", "40", "04"
    ],

    // Oniwabandana Extra 2 (Yellow and Green)
    // Replacing what looks like an empty pallete
    "367424":
    [
      "3C", "5B", "46", "20", "CC", "38", "10", "49",
      "2C", "37", "F2", "4F", "80", "22", "22", "3F",
      "84", "5B", "E9", "67", "E7", "25", "2D", "4B",
      "90", "5B", "F5", "6B", "FB", "77", "01", "0C"
    ],

    // Tesuni 2 (Gray and Purple)
    // Replacing what looks like an empty pallete
    "367456":
    [
      "90", "4D", "FF", "5F", "9C", "4B", "D7", "36",
      "F1", "25", "2B", "19", "31", "7F", "DF", "7B",
      "DC", "7F", "3B", "73", "59", "5E", "F3", "49",
      "0E", "3A", "6C", "25", "EA", "10", "25", "04"
    ],

    // Tesuni 4 (Green and Pink)
    // Replacing what looks like an empty pallete
    "367488":
    [
      "8A", "4D", "F4", "5F", "F1", "4B", "8C", "37",
      "0E", "27", "EB", "09", "39", "7F", "DF", "7B",
      "97", "7F", "38", "77", "D6", "62", "2F", "4E",
      "CB", "39", "89", "2D", "08", "19", "25", "04"
    ],

    // Tesuni Extra 1 (Black and Yellow)
    // Replacing Castor and Pollux Normal 1 (Blue and Purple)
    "367552":
    [
      "93", "4D", "ED", "7B", "E9", "67", "84", "5B",
      "42", "43", "C0", "2A", "DE", "7E", "BF", "7B",
      "3B", "6B", "B7", "5A", "33", "4A", "AF", "39",
      "2B", "29", "A7", "18", "44", "0C", "02", "04"
    ],


    // Castor and Pollux Extra 1 (Beige and Yellow and Green)
    // Replacing Castor and Pollux Normal 2 (Light Green and Blue)
    "367584":
    [
      "EF", "31", "D2", "61", "FB", "77", "4E", "62",
      "89", "45", "E5", "30", "83", "1C", "F6", "6F",
      "91", "5F", "2B", "4F", "65", "32", "E9", "67",
      "A5", "57", "E3", "3E", "00", "22", "00", "08"
    ],
    
    // Castor and Pollux Normal 1 (Blue and Purple)
    // Replacing what looks like an empty pallete
    "367712":
    [
      "F2", "42", "EC", "77", "DF", "7B", "B7", "62",
      "D0", "45", "8E", "35", "0A", "29", "DA", "72",
      "3C", "5E", "55", "3D", "ED", "24", "BF", "5A",
      "3F", "3E", "D3", "31", "EC", "18", "63", "00"
    ],

    // Castor and Pollux Normal 2 (Light Green and Blue)
    // Replacing what looks like an empty pallete
    "367840":
    [
      "72", "43", "18", "70", "DF", "7B", "97", "63",
      "B0", "3A", "F1", "29", "0A", "11", "37", "73",
      "73", "62", "CD", "49", "8A", "30", "FB", "65",
      "18", "51", "F4", "3C", "8C", "24", "63", "00"
    ],

    // Kyurene Extra 1 (Purple and Red)
    // Replacing what looks like an empty pallete
    "369408":
    [
      "D9", "5E", "7F", "6F", "DB", "5A", "D8", "49",
      "54", "39", "D0", "28", "4B", "18", "FD", "39",
      "56", "21", "6F", "08", "F6", "57", "EE", "37",
      "67", "17", "A4", "0A", "82", "01", "60", "00"
    ],

    // Kyurene Extra 2 (Blue and Brown)
    // Replacing what looks like an empty pallete
    "369472":
    [
      "D9", "5E", "BF", "7B", "1A", "67", "75", "52",
      "F1", "41", "6D", "31", "C8", "1C", "FD", "49",
      "37", "2D", "6F", "14", "AC", "5B", "08", "43",
      "66", "32", "C3", "21", "00", "15", "60", "08"
    ],

    // Kyurene Extra 3 (Yellow and Blue)
    // Replacing what looks like an empty pallete
    "369504":
    [
      "D9", "5E", "FC", "7F", "B4", "73", "AF", "52",
      "0B", "3E", "68", "29", "C3", "14", "C9", "6B",
      "45", "53", "62", "36", "1F", "73", "1B", "52",
      "57", "3D", "B3", "28", "6B", "14", "03", "04"
    ],

    // Bakene Extra 1 (Brown and Silver)
    // Replacing what looks like an empty pallete
    "369792":
    [
      "30", "26", "FF", "7B", "5A", "67", "B5", "52",
      "EF", "39", "4A", "25", "84", "0C", "6A", "3C",
      "F4", "6F", "CC", "63", "86", "4B", "E3", "32",
      "22", "1E", "A1", "11", "00", "09", "60", "00"
    ],

    // Bakene Extra 2 (Grey and Copper)
    // Replacing what looks like an empty pallete
    "369824":
    [
      "30", "26", "FE", "7F", "F4", "5F", "F0", "4F",
      "E9", "32", "64", "1E", "82", "0D", "98", "25",
      "9B", "73", "F6", "5E", "30", "46", "AC", "35",
      "28", "25", "C5", "18", "62", "0C", "00", "00"
    ]
  }
}


export default enemyColorExpansionPatch;