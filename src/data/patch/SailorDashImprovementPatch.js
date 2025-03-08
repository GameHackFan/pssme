export const sailorDashImprovementPatch = 
{
  priority: 21,
  type: "overwrite",
  filename: "bpsm945a.u45",
  byteFormat: "hex",
  data:
  {
    // Disable the possibility of the dash move to clinch.
    "39068": ["00", "00"],

    // Disable the possibilit of the dash move to clinch.
    "39074": ["00", "00"],


    // Increase the "Dash" amount of frames from 60 to 1200 (Moon / B0FE-B100)
    "45312": ["B0", "04"],

    // Increase the "Dash" amount of frames from 60 to 1200 (Mercury / C3C2-C3C4)
    "50116": ["B0", "04"],

    // Increase the "Dash" amount of frames from 60 to 1200 (Mars / D654-D656)
    "54870": ["B0", "04"],

    // Increase the "Dash" amount of frames from 60 to 1200 (Jupiter / E896-E898)
    "59544": ["B0", "04"],

    // Increase the "Dash" amount of frames from 60 to 1200 (Venus / FB0E-FB10)
    "64272": ["B0", "04"],
  }    
}