import jumouDamageMap from "./damage/JumouDamageMap";
import allSailorsDamageMap from "./damage/AllSailorsDamageMap";


const characterDamageMap = 
{
	jumou: {label: "Jumou", damageMap: jumouDamageMap},
	allSailors: {label: "All Sailors", damageMap: allSailorsDamageMap},
}


export default characterDamageMap;