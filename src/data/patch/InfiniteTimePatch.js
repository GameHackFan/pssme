export const infiniteTimePatch =
{
  priority: 3,
  type: "overwrite",
  filename: "bpsm945a.u45",
  byteFormat: "hex",
  data:
  {
    // Starting Time.
    "151524": ["F9", "99"],

    // Forces the time increment after beating an enemy group to 99F9.
    "197062": ["7C", "3D", "F9", "99", "16", "24", "04", "60"],

    // Stage 1 Starting Time.
    "197930": ["F9", "99"],

    // Stage 2 Starting Time.
    "198962": ["F9", "99"],

    // Stage 3 Starting Time.
    "200940": ["F9", "99"],

    // Stage 4 Starting Time.
    "203258": ["F9", "99"],

    // Stage 5 Starting Time.
    "206840": ["F9", "99"],

    // Stage 6 Starting Time.
    "209436": ["F9", "99"],

    // Stage 7 Starting Time.
    "211260": ["F9", "99"],

    // Stage 8 Starting Time.
    "213594": ["F9", "99"],


    // Stage 1 Remake Time
    "216280": ["F9", "99"],

    // Extra Stage Time
    "218316": ["F9", "99"],


    // Removes the instruction that sets the time
    "152172": ["71", "4E", "71", "4E", "71", "4E"],
  }
}