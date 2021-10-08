import furauEditorData from "./editor/FurauEditorData";
import tesuniEditorData from "./editor/TesuniEditorData";
import yashaEditorData from "./editor/YashaEditorData";
import thetisEditorData from "./editor/ThetisEditorData";
import jumouEditorData from "./editor/JumouEditorData";
import criminalEditorData from  "./editor/CriminalEditorData";
import morgaEditorData from "./editor/MorgaEditorData";
import kyureneEditorData from "./editor/KyureneEditorData";
import garobenEditorData from "./editor/GarobenEditorData";
import bakeneEditorData from "./editor/BakeneEditorData";
import zoisiteEditorData from "./editor/ZoisiteEditorData";
import kunziteEditorData from "./editor/KunziteEditorData";
import queenBerylEditorData from "./editor/QueenBerylEditorData";
import itemEditorData from "./editor/ItemEditorData";

import oniwabandanaEditorData from
    "./editor/OniwabandanaEditorData";
import castorAndPolluxEditorData from
    "./editor/CastorAndPolluxEditorData";


const levelEditorEnemies =
{
  furauOrangeGreen: furauEditorData.furauOrangeGreen,
  furauPurpleBlue: furauEditorData.furauPurpleBlue,
  furauBrownYellow: furauEditorData.furauBrownYellow,
  furauGreenBlue: furauEditorData.furauGreenBlue,
  furauExtra1: furauEditorData.furauExtra1,
  furauExtra2: furauEditorData.furauExtra2,


  oniwabandanaBrownBlueIdle:
      oniwabandanaEditorData.oniwabandanaBrownBlueIdle,
  oniwabandanaWhiteBlueIdle:
      oniwabandanaEditorData.oniwabandanaWhiteBlueIdle,
  oniwabandanaPinkBlueIdle: 
      oniwabandanaEditorData.oniwabandanaPinkBlueIdle,
  oniwabandanaWhiteBrownIdle:
      oniwabandanaEditorData.oniwabandanaWhiteBrownIdle,
  oniwabandanaExtra1Idle:
      oniwabandanaEditorData.oniwabandanaExtra1Idle,
  oniwabandanaExtra2Idle:
      oniwabandanaEditorData.oniwabandanaExtra2Idle,

  oniwabandanaBrownBlue:
      oniwabandanaEditorData.oniwabandanaBrownBlue,
  oniwabandanaWhiteBlue:
      oniwabandanaEditorData.oniwabandanaWhiteBlue,
  oniwabandanaPinkBlue:
      oniwabandanaEditorData.oniwabandanaPinkBlue,
  oniwabandanaWhiteBrown:
      oniwabandanaEditorData.oniwabandanaWhiteBrown,
  oniwabandanaExtra1:
      oniwabandanaEditorData.oniwabandanaExtra1,
  oniwabandanaExtra2:
      oniwabandanaEditorData.oniwabandanaExtra2,

  oniwabandanaBrownBlueRunning:
      oniwabandanaEditorData.oniwabandanaBrownBlueRunning,
  oniwabandanaWhiteBlueRunning:
      oniwabandanaEditorData.oniwabandanaWhiteBlueRunning,
  oniwabandanaPinkBlueRunning:
      oniwabandanaEditorData.oniwabandanaPinkBlueRunning,
  oniwabandanaWhiteBrownRunning:
      oniwabandanaEditorData.oniwabandanaWhiteBrownRunning,
  oniwabandanaExtra1Running:
      oniwabandanaEditorData.oniwabandanaExtra1Running,
  oniwabandanaExtra2Running:
      oniwabandanaEditorData.oniwabandanaExtra2Running,


  tesuniBrownOrange: tesuniEditorData.tesuniBrownOrange,
  tesuniGrayPurple: tesuniEditorData.tesuniGrayPurple,
  tesuniBrownPink: tesuniEditorData.tesuniBrownPink,
  tesuniGreenPink: tesuniEditorData.tesuniGreenPink,
  tesuniExtra1: tesuniEditorData.tesuniExtra1,

  tesuniBrownOrangeRacket: tesuniEditorData.tesuniBrownOrangeRacket,
  tesuniGrayPurpleRacket: tesuniEditorData.tesuniGrayPurpleRacket,
  tesuniBrownPinkRacket: tesuniEditorData.tesuniBrownPinkRacket,
  tesuniGreenPinkRacket: tesuniEditorData.tesuniGreenPinkRacket,
  tesuniExtra1Racket: tesuniEditorData.tesuniExtra1Racket,

  tesuniBrownOrangeBomber: tesuniEditorData.tesuniBrownOrangeBomber,
  tesuniGrayPurpleBomber: tesuniEditorData.tesuniGrayPurpleBomber,
  tesuniBrownPinkBomber: tesuniEditorData.tesuniBrownPinkBomber,
  tesuniGreenPinkBomber: tesuniEditorData.tesuniGreenPinkBomber,
  tesuniExtra1Bomber: tesuniEditorData.tesuniExtra1Bomber,


  castorAndPolluxBluePurple:
      castorAndPolluxEditorData.castorAndPolluxBluePurple,
  castorAndPolluxLightGreenBlue:
      castorAndPolluxEditorData.castorAndPolluxLightGreenBlue,
  castorAndPolluxGreenBlue:
      castorAndPolluxEditorData.castorAndPolluxGreenBlue,
  castorAndPolluxBeigePink:
      castorAndPolluxEditorData.castorAndPolluxBeigePink,
  castorAndPolluxExtra1:
      castorAndPolluxEditorData.castorAndPolluxExtra1,
  castorAndPolluxExtra2:
      castorAndPolluxEditorData.castorAndPolluxExtra2,


  yashaWitchBrownBlue: yashaEditorData.yashaWitchBrownBlue,
  yashaWitchPurpleGreen: yashaEditorData.yashaWitchPurpleGreen,
  yashaWitchPinkPurple: yashaEditorData.yashaWitchPinkPurple,
  yashaWitchBrownPink: yashaEditorData.yashaWitchBrownPink,
  yashaWitchBrownGreenUnused:
      yashaEditorData.yashaWitchBrownGreenUnused,
  yashaWitchGreenBlueUnused:
      yashaEditorData.yashaWitchGreenBlueUnused,
  yashaWitchBrownPurpleUnused:
      yashaEditorData.yashaWitchBrownPurpleUnused,
  yashaWitchBrownYellowUnused:
      yashaEditorData.yashaWitchBrownYellowUnused,

  yashaWitchBrownBlueStabbing:
      yashaEditorData.yashaWitchBrownBlueStabbing,
  yashaWitchPurpleGreenStabbing:
      yashaEditorData.yashaWitchPurpleGreenStabbing,
  yashaWitchPinkPurpleStabbing:
      yashaEditorData.yashaWitchPinkPurpleStabbing,
  yashaWitchBrownPinkStabbing:
      yashaEditorData.yashaWitchBrownPinkStabbing,
  yashaWitchBrownGreenUnusedStabbing:
      yashaEditorData.yashaWitchBrownGreenUnusedStabbing,
  yashaWitchGreenBlueUnusedStabbing:
      yashaEditorData.yashaWitchGreenBlueUnusedStabbing,
  yashaWitchBrownPurpleUnusedStabbing:
      yashaEditorData.yashaWitchBrownPurpleUnusedStabbing,
  yashaWitchBrownYellowUnusedStabbing:
      yashaEditorData.yashaWitchBrownYellowUnusedStabbing,

  yashaWitchBrownBlueFalling:
      yashaEditorData.yashaWitchBrownBlueFalling,
  yashaWitchPurpleGreenFalling:
      yashaEditorData.yashaWitchPurpleGreenFalling,
  yashaWitchPinkPurpleFalling:
      yashaEditorData.yashaWitchPinkPurpleFalling,
  yashaWitchBrownPinkFalling:
      yashaEditorData.yashaWitchBrownPinkFalling,
  yashaWitchBrownGreenUnusedFalling:
      yashaEditorData.yashaWitchBrownGreenUnusedFalling,
  yashaWitchGreenBlueUnusedFalling:
      yashaEditorData.yashaWitchGreenBlueUnusedFalling,
  yashaWitchBrownPurpleUnusedFalling:
      yashaEditorData.yashaWitchBrownPurpleUnusedFalling,
  yashaWitchBrownYellowUnusedFalling:
      yashaEditorData.yashaWitchBrownYellowUnusedFalling,


  yashaHumanBrownGreen: yashaEditorData.yashaHumanBrownGreen,
  yashaHumanGreenBlue: yashaEditorData.yashaHumanGreenBlue,
  yashaHumanBrownPurple: yashaEditorData.yashaHumanBrownPurple,
  yashaHumanBrownYellow: yashaEditorData.yashaHumanBrownYellow,
//   yashaHumanExtra1: yashaEditorData.yashaHumanExtra1,
//   yashaHumanExtra2: yashaEditorData.yashaHumanExtra2,
//   yashaHumanExtra3: yashaEditorData.yashaHumanExtra3,
//   yashaHumanExtra4: yashaEditorData.yashaHumanExtra4,


  thetisLightBlue: thetisEditorData.thetisLightBlue,
  thetisDarkBlue: thetisEditorData.thetisDarkBlue,
  thetisLightPink: thetisEditorData.thetisLightPink,
  thetisDarkPink: thetisEditorData.thetisDarkPink,
  thetisExtra1: thetisEditorData.thetisExtra1,
  thetisExtra2: thetisEditorData.thetisExtra2,


  jumouBeigeGreen: jumouEditorData.jumouBeigeGreen,
  jumouBeigeBlue: jumouEditorData.jumouBeigeBlue,
  jumouBeigeOrange: jumouEditorData.jumouBeigeOrange,
  jumouWhiteBrown: jumouEditorData.jumouWhiteBrown,
  jumouExtra1: jumouEditorData.jumouExtra1,
  jumouExtra2: jumouEditorData.jumouExtra2,


  criminalBlackBlueIdle: criminalEditorData.criminalBlackBlueIdle,
  criminalBlackPurpleIdle: criminalEditorData.criminalBlackPurpleIdle,
  criminalPurpleRedIdle: criminalEditorData.criminalPurpleRedIdle,
  criminalGreenBrownIdle: criminalEditorData.criminalGreenBrownIdle,
  criminalExtra1Idle: criminalEditorData.criminalExtra1Idle,
  criminalExtra2Idle: criminalEditorData.criminalExtra2Idle,

  criminalBlackBlue: criminalEditorData.criminalBlackBlue,
  criminalBlackPurple: criminalEditorData.criminalBlackPurple,
  criminalPurpleRed: criminalEditorData.criminalPurpleRed,
  criminalGreenBrown: criminalEditorData.criminalGreenBrown,
  criminalExtra1: criminalEditorData.criminalExtra1,
  criminalExtra2: criminalEditorData.criminalExtra2,

  criminalBlackBlueRunning: criminalEditorData.criminalBlackBlueRunning,
  criminalBlackPurpleRunning: criminalEditorData.criminalBlackPurpleRunning,
  criminalPurpleRedRunning: criminalEditorData.criminalPurpleRedRunning,
  criminalGreenBrownRunning: criminalEditorData.criminalGreenBrownRunning,
  criminalExtra1Running: criminalEditorData.criminalExtra1Running,
  criminalExtra2Running: criminalEditorData.criminalExtra2Running,


  castorAndPolluxBoss1: castorAndPolluxEditorData.castorAndPolluxBoss1,
  castorAndPolluxBoss2: castorAndPolluxEditorData.castorAndPolluxBoss2,


  morga: morgaEditorData.morga,
  

  kyureneRedGreen3rdBoss: kyureneEditorData.kyureneRedGreen3rdBoss,
  kyureneRedGreen: kyureneEditorData.kyureneRedGreen,
  kyurenePinkPurple: kyureneEditorData.kyurenePinkPurple,
  kyureneGreenGreen: kyureneEditorData.kyureneGreenGreen,
  kyureneExtra1: kyureneEditorData.kyureneExtra1,
  kyureneExtra2: kyureneEditorData.kyureneExtra2,
  kyureneExtra3: kyureneEditorData.kyureneExtra3,


  garobenGreenOrange: garobenEditorData.garobenGreenOrange,
  garobenGrayBrown: garobenEditorData.garobenGrayBrown,
  garobenBrownGray: garobenEditorData.garobenBrownGray,
  garobenGreenBlue: garobenEditorData.garobenGreenBlue,
  garobenGreenOrange4thBoss: garobenEditorData.garobenGreenOrange4thBoss,


  bakeneForm1: bakeneEditorData.bakeneForm1,
  bakeneForm2: bakeneEditorData.bakeneForm2,
  bakeneForm3: bakeneEditorData.bakeneForm3,
  bakene: bakeneEditorData.bakene,
  bakeneRunningAway: bakeneEditorData.bakeneRunningAway,
  bakeneExtra1Form3: bakeneEditorData.bakeneExtra1Form3,
  bakeneExtra2Form3: bakeneEditorData.bakeneExtra2Form3,


  zoisite5thBoss: zoisiteEditorData.zoisite5thBoss,
  zoisite: zoisiteEditorData.zoisite,
  zoisiteExtra1: zoisiteEditorData.zoisiteExtra1,
  zoisiteExtra2: zoisiteEditorData.zoisiteExtra2,


  kunzite: kunziteEditorData.kunzite,
  kunziteExtra1: kunziteEditorData.kunziteExtra1,
  kunziteExtra2: kunziteEditorData.kunziteExtra2,


  queenBeryl: queenBerylEditorData.queenBeryl,
  queenBerylExtra1: queenBerylEditorData.queenBerylExtra1,
  queenBerylExtra2: queenBerylEditorData.queenBerylExtra2,


  // Items
  crystal: itemEditorData.crystal,

  chocolate: itemEditorData.chocolate,
  iceCreamCornet: itemEditorData.iceCreamCornet,
  pudding: itemEditorData.pudding,
  iceCreamCup: itemEditorData.iceCreamCup,
  lollipop: itemEditorData.lollipop,
  pieceOfCake: itemEditorData.pieceOfCake,
  roundCake: itemEditorData.roundCake,
  pie: itemEditorData.pie,
  popcorn: itemEditorData.popcorn,
  fishMeatball: itemEditorData.fishMeatball,
  donut: itemEditorData.donut,
  chocolateCandy: itemEditorData.chocolateCandy,
  muffin: itemEditorData.muffin,
  soup: itemEditorData.soup,

  // Extra Food
  meatball: itemEditorData.meatball,
  starChickenNugget: itemEditorData.starChickenNugget,
  tuna: itemEditorData.tuna,


  groupLimit: {width: 4, height: 240},
  cameraFOV: {width: 320, height: 240}
}


export default levelEditorEnemies;
