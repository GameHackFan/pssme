export const itemDropFixesPatch =
{
  priority: 22,
  type: "overwrite",
  filename: "bpsm945a.u45",
  byteFormat: "hex",
  data:
  {
    // Removes the item drop code for the falling action
    "73104":
    [
      "71", "4E", "71", "4E", "71", "4E", "71", "4E",
      "71", "4E", "71", "4E", "71", "4E", "71", "4E",
      "71", "4E"
    ],

    // Removes the item drop restriction for the fallen action
    // 1st Fallen action now will drop an item 100% of the time
    "73360": ["00", "67", "08", "00"],

    // Modifies the item drop impulse to ensure it mostly won't
    // fall out of the screen
    "74330":
    [
      "2E", "65", "68", "33", "26", "00", "6A", "00",
      "69", "08", "03", "00", "6B", "00", "28", "20",
      "4C", "00", "80", "E2", "80", "44", "40", "42",
      "40", "23", "4C", "00", "47", "33", "48", "00",
      "7C", "23", "FF", "FF", "00", "C4", "60", "00",
      "7C", "23", "06", "00", "00", "C0", "54", "00"
    ]
  }
}