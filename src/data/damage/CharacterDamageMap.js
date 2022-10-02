import { jumouDamageMap } from "./JumouDamageMap";
import { allSailorsDamageMap } from "./AllSailorsDamageMap";


export const characterDamageMap = 
{
  jumou: {key: "jumou", label: "Jumou", damageMap: jumouDamageMap},
  allSailors: {key: "allSailors", label: "All Sailors", damageMap: allSailorsDamageMap},
}