const unknown = {originalUsage: "Unknown", pssmeUsage: "Unknown"};

const empty = {originalUsage: "Empty", pssmeUsage: "Empty"};
const emptyFurau = {originalUsage: "Empty", pssmeUsage: "Furau"};
const emptyOniwabandana = {originalUsage: "Empty", pssmeUsage: "Oniwabandana"};
const emptyTesuni = {originalUsage: "Empty", pssmeUsage: "Tesuni"};
const emptyCastorAndPollux = {originalUsage: "Empty", pssmeUsage: "Castor and Pollux"};
const emptyThetis = {originalUsage: "Empty", pssmeUsage: "Thetis"};
const emptyJumou = {originalUsage: "Empty", pssmeUsage: "Jumou"};
const emptyCriminal = {originalUsage: "Empty", pssmeUsage: "Criminal"};
const emptyMorga = {originalUsage: "Empty", pssmeUsage: "Morga"};
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

// const sailorV = {originalUsage: "Sailor V (Unused)", pssmeUsage: "Sailor V (Unused)"};
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


export const palleteData =
{
  startAddress: 360448,
  amount: 550,          // Original is 439.
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

    "374528": emptySailorMoon,
    "374560": emptySailorMoon,
    "374592": emptySailorMoon,
    "374624": emptySailorMoon,
    "374656": emptySailorMoon,
    "374688": emptySailorMoon,
    "374720": emptySailorMoon,  

    "374752": emptySailorMercury,
    "374784": emptySailorMercury,
    "374816": emptySailorMercury,
    "374848": emptySailorMercury,
    "374880": emptySailorMercury,
    "374912": emptySailorMercury,
    "374944": emptySailorMercury,

    "374976": emptySailorMars,
    "375008": emptySailorMars,
    "375040": emptySailorMars,
    "375072": emptySailorMars,
    "375104": emptySailorMars,
    "375136": emptySailorMars,
    "375168": emptySailorMars, 

    "375200": emptySailorJupiter,
    "375232": emptySailorJupiter,
    "375264": emptySailorJupiter,
    "375296": emptySailorJupiter,
    "375328": emptySailorJupiter,
    "375360": emptySailorJupiter,
    "375392": emptySailorJupiter,

    "375424": emptySailorVenus,
    "375456": emptySailorVenus,
    "375488": emptySailorVenus,
    "375520": emptySailorVenus,
    "375552": emptySailorVenus,
    "375584": emptySailorVenus,
    "375616": emptySailorVenus,


    "375680": emptyFurau,
    "375712": emptyTesuni,
    "375744": emptyFurau,
    "375776": emptyTesuni,
    "375808": emptyFurau,
    "375840": emptyTesuni,
    "375872": emptyFurau,
    "375904": emptyTesuni,
    "375936": empty,

    "375968": emptyThetis,
    "376000": emptyOniwabandana,
    "376032": emptyThetis,
    "376064": emptyOniwabandana,
    "376096": emptyOniwabandana,
    "376128": emptyOniwabandana,
    "376160": emptyThetis,
    "376192": emptyThetis,
    "376224": empty,

    "376256": emptyCriminal,
    "376288": emptyJumou,
    "376320": emptyCriminal,
    "376352": emptyJumou,
    "376384": emptyJumou,
    "376416": emptyJumou,
    "376448": emptyCriminal,
    "376480": emptyCriminal,
    "376512": empty,

    "376544": emptyCastorAndPollux,
    "376576": emptyCastorAndPollux,
    "376608": emptyCastorAndPollux,
    "376640": emptyCastorAndPollux,
    "376672": emptyCastorAndPollux,
    "376704": emptyCastorAndPollux,
    "376736": emptyCastorAndPollux,
    "376768": emptyCastorAndPollux,
    "376800": empty,
  
    "376832": emptyKyurene,
    "376864": emptyKyurene,
    "376896": emptyKyurene,
    "376928": emptyKyurene,
    "376960": empty,

    "376992": emptyBakene,
    "377024": emptyBakene,
    "377056": emptyBakene,
    "377088": emptyBakene,
    "377120": empty, 

    "377152": emptyZoisite,
    "377184": emptyZoisite,
    "377216": emptyZoisite,
    "377248": emptyZoisite,
    "377280": empty,

    "377312": emptyKunzite,
    "377344": emptyKunzite,
    "377376": emptyKunzite,
    "377408": emptyKunzite,
    "377440": empty,

    "377472": emptyQueenBeryl,
    "377504": emptyQueenBeryl,
    "377536": emptyQueenBeryl,
    "377568": emptyQueenBeryl,
    "377600": empty,

    "377856": emptyMorga,
    "377888": emptyMorga,
    "377920": emptyMorga,

    "unknown": unknown
  }
}