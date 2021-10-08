const unknown = {originalUsage: "Unknown", pssmeUsage: "Unknown"};

const empty = {originalUsage: "Empty", pssmeUsage: "Empty"};
const emptyFurau = {originalUsage: "Empty", pssmeUsage: "Furau"};
const emptyOniwabandana = {originalUsage: "Empty", pssmeUsage: "Oniwabandana"};
const emptyTesuni = {originalUsage: "Empty", pssmeUsage: "Tesuni"};
const emptyCastorAndPollux = {originalUsage: "Empty", pssmeUsage: "Castor and Pollux"};
const emptyThetis = {originalUsage: "Empty", pssmeUsage: "Thetis"};
const emptyJumou = {originalUsage: "Empty", pssmeUsage: "Jumou"};
const emptyCriminal = {originalUsage: "Empty", pssmeUsage: "Criminal"};
const emptyKyurene = {originalUsage: "Empty", pssmeUsage: "Kyurene"};
const unknownGaroben = {originalUsage: "Unknown", pssmeUsage: "Garoben"};
const emptyBakene = {originalUsage: "Empty", pssmeUsage: "Bakene"};
const emptyZoisite = {originalUsage: "Empty", pssmeUsage: "Zoisite"};
const emptyKunzite = {originalUsage: "Empty", pssmeUsage: "Kunzite"};
const emptyQueenBeryl = {originalUsage: "Empty", pssmeUsage: "Queen Beryl"};

const furau = {originalUsage: "Furau", pssmeUsage: "Furau"};
const oniwabandana = {originalUsage: "Oniwabandana", pssmeUsage: "Oniwabandana"};
const tesuni = {originalUsage: "Tesuni", pssmeUsage: "Tesuni"};
const castorAndPollux = {originalUsage: "Castor and Pollux", pssmeUsage: "Castor and Pollux"};
const yashaWitch = {originalUsage: "Yasha (Witch)", pssmeUsage: "Yasha (Witch)"};
const yashaHuman = {originalUsage: "Yasha (Human)", pssmeUsage: "Yasha (Human and Witch)"};
const thetis = {originalUsage: "Thetis", pssmeUsage: "Thetis"};
const jumou = {originalUsage: "Jumou", pssmeUsage: "Jumou"};
const criminal = {originalUsage: "Criminal", pssmeUsage: "Criminal"};

const morga = {originalUsage: "Morga", pssmeUsage: "Morga"};
const morgaUntransformed = {originalUsage: "Morga (Untransformed)",
    pssmeUsage: "Morga (Untransformed)"};
const kyurene = {originalUsage: "Kyurene", pssmeUsage: "Kyurene"};
const garoben = {originalUsage: "Garoben", pssmeUsage: "Garoben"};
const bakene = {originalUsage: "Bakene", pssmeUsage: "Bakene"};
const zoisite = {originalUsage: "Zoisite", pssmeUsage: "Zoisite"};
const kunzite = {originalUsage: "Kunzite", pssmeUsage: "Kunzite"};
const queenBeryl = {originalUsage: "Queen Beryl", pssmeUsage: "Queen Beryl"};

const sailorV = {originalUsage: "Sailor V (Unused)", pssmeUsage: "Sailor V (Unused)"};
const sailorJupiter = {originalUsage: "Sailor Jupiter", pssmeUsage: "Sailor Jupiter"};
const sailorMercury = {originalUsage: "Sailor Mercury", pssmeUsage: "Sailor Mercury"};
const sailorMoon = {originalUsage: "Sailor Moon", pssmeUsage: "Sailor Moon"};
const sailorMars = {originalUsage: "Sailor Mars", pssmeUsage: "Sailor Mars"};
const sailorVenus = {originalUsage: "Sailor Venus", pssmeUsage: "Sailor Venus"};
const emptySailorJupiter = {originalUsage: "Empty", pssmeUsage: "Sailor Jupiter"};
const emptySailorMercury = {originalUsage: "Empty", pssmeUsage: "Sailor Mercury"};
const emptySailorMoon = {originalUsage: "Empty", pssmeUsage: "Sailor Moon"};
const emptySailorMars = {originalUsage: "Empty", pssmeUsage: "Sailor Mars"};
const emptySailorVenus = {originalUsage: "Empty", pssmeUsage: "Sailor Venus"};

const sailorMoonProfile = {originalUsage: "Sailor Moon Profile Picture",
    pssmeUsage: "Sailor Moon Profile Picture"};
const sailorMercuryProfile = {originalUsage: "Sailor Mercury Profile Picture",
    pssmeUsage: "Sailor Mercury Profile Picture"};
const sailorMarsProfile = {originalUsage: "Sailor Mars Profile Picture",
    pssmeUsage: "Sailor Mars Profile Picture"};
const sailorJupiterProfile = {originalUsage: "Sailor Jupiter Profile Picture",
    pssmeUsage: "Sailor Jupiter Profile Picture"};
const sailorVenusProfile = {originalUsage: "Sailor Venus Profile Picture",
    pssmeUsage: "Sailor Venus Profile Picture"};


const palleteData =
{
  startAddress: 360448,
  amount: 550,              // Original is 439.
  data:
  {
    "364352": sailorMoonProfile,
    "364384": sailorMercuryProfile,
    "364416": sailorMarsProfile,
    "364448": sailorJupiterProfile,
    "364480": sailorVenusProfile,
    
    // "": sailorV,
    "365728": sailorMoon,
    "366144": sailorMercury,
    "366272": sailorMars,
    "366400": sailorJupiter,
    "366528": sailorVenus,

    "367008": furau,
    "367040": furau,
    "367072": furau,
    "367104": furau,

    "367136": oniwabandana,
    "367168": oniwabandana,
    "367200": oniwabandana,
    "367232": oniwabandana,

    "367264": tesuni,
    "367296": tesuni,
    "367328": tesuni,
    "367360": tesuni,

    "367520": castorAndPollux,
    "367552": castorAndPollux,
    "367584": castorAndPollux,
    "367616": castorAndPollux,
    "367648": castorAndPollux,
    "367680": castorAndPollux,

    "367904": yashaWitch,
    "367936": yashaWitch,
    "367968": yashaWitch,
    "368000": yashaWitch,

    "368032": yashaHuman,
    "368064": yashaHuman,
    "368096": yashaHuman,
    "368128": yashaHuman,

    "368288": thetis,
    "368320": thetis,
    "368352": thetis,
    "368384": thetis,

    "368416": jumou,
    "368448": jumou,
    "368480": jumou,
    "368512": jumou,

    "368544": criminal,
    "368576": criminal,
    "368608": criminal,
    "368640": criminal,

    "369120": morga,
    "369248": morgaUntransformed,

    "369312": kyurene,
    "369344": kyurene,
    "369376": kyurene,
    
    "369568": garoben,

    "369600": unknownGaroben,
    "369632": unknownGaroben,
    "369664": unknownGaroben,

    "369760": bakene,

    "370048": zoisite,
    "370080": kunzite,
    "370144": queenBeryl,

    "374592": emptySailorMoon,
    "374720": emptySailorMercury,
    "374848": emptySailorMars,
    "374976": emptySailorJupiter,
    "375104": emptySailorVenus,

    "375392": emptyFurau,
    "375424": emptyTesuni,
    "375456": emptyFurau,
    "375488": emptyTesuni,
    "375520": emptyFurau,
    "375552": emptyTesuni,
    "375584": emptyFurau,
    "375616": emptyTesuni,
    "375648": empty,

    "375680": emptyThetis,
    "375712": emptyOniwabandana,
    "375744": emptyThetis,
    "375776": emptyOniwabandana,
    "375808": emptyOniwabandana,
    "375840": emptyOniwabandana,
    "375872": emptyThetis,
    "375904": emptyThetis,
    "375936": empty,

    "375968": emptyCriminal,
    "376000": emptyJumou,
    "376032": emptyCriminal,
    "376064": emptyJumou,
    "376096": emptyJumou,
    "376128": emptyJumou,
    "376160": emptyCriminal,
    "376192": emptyCriminal,
    "376224": empty,

    "376256": emptyCastorAndPollux,
    "376288": emptyCastorAndPollux,
    "376320": emptyCastorAndPollux,
    "376352": emptyCastorAndPollux,
    "376384": emptyCastorAndPollux,
    "376416": emptyCastorAndPollux,
    "376448": emptyCastorAndPollux,
    "376480": emptyCastorAndPollux,
    "376512": empty,

    "376544": emptyKyurene,
    "376576": emptyKyurene,
    "376608": emptyKyurene,
    "376640": emptyKyurene,
    "376672": empty,

    "376704": emptyBakene,
    "376736": emptyBakene,
    "376768": emptyBakene,
    "376800": emptyBakene,
    "376832": empty,

    "376864": emptyZoisite,
    "376896": emptyZoisite,
    "376928": emptyZoisite,
    "376960": emptyZoisite,
    "376992": empty,

    "377024": emptyKunzite,
    "377056": emptyKunzite,
    "377088": emptyKunzite,
    "377120": emptyKunzite,
    "377152": empty,

    "377184": emptyQueenBeryl,
    "377216": emptyQueenBeryl,
    "377248": emptyQueenBeryl,
    "377280": emptyQueenBeryl,
    "377312": empty,

    "unknown": unknown
  }
}


export default palleteData;