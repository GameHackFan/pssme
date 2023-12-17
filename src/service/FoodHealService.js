import { modificationService } from "./ModificationService";
import { romService } from "./ROMService";
import { foodHealMap } from "../data/default/FoodHealMap";


class FoodHealService
{
  createPreset = () =>
  {
    const keys = Object.keys(dataMap);
    const p = {type: "foodHeal", data: {}};
    keys.forEach((k) => p.data[k] = dataMap[k]);
    return p;
  }

  applyPreset = (preset) =>
  {
    const json = JSON.parse(preset);

    if(json && json.data && json.type === "foodHeal")
    {
      const keys = Object.keys(json.data);
      keys.forEach((ck) => dataMap[ck] = json.data[ck]);
    }
  }

  setFoodHealToDefault = (foodKey) =>
  {
    const hd = foodHealMap[foodKey];

    if(hd)
      dataMap[foodKey] = hd.defaultValue;
  }

  setFoodHeal = (foodKey, heal) =>
  {
    if(this.hasCharacterKey(foodKey))
      dataMap[foodKey] = heal;
  }

  getFoodHeal = (foodKey) =>
  {
    if(!(foodKey in dataMap))
    {
      const hd = foodHealMap[foodKey];
      const v = parseInt(romService.getByte(hd?.filename, hd?.byteIndex));
      return !isNaN(v) ? v : hd?.defaultValue;
    }
    
    return dataMap[foodKey];
  }

  applyData = () =>
  {
    Object.keys(dataMap).forEach((k) =>
    {
      const fh = parseInt(dataMap[k]);
      const fhd = foodHealMap[k];

      if(fhd && !isNaN(fh) && fh > -1 && fh < 256)
        romService.setByte(fhd?.filename, fhd?.byteIndex, fh);
    });
  }

  clearData = () =>
  {
    dataMap = {};
  }

  hasCharacterKey = (characterKey) =>
  {
    return (characterKey in foodHealMap);
  }

  getFoodHealList = () =>
  {
    const keys = Object.keys(foodHealMap);
    return keys.map((key) => foodHealMap[key]);
  }

  addToModificationQueue = () =>
  {
    modificationService.add(161, "food", this.applyData);
  }

  constructor()
  {
    dataMap = {};
  }
}


let dataMap;

export const foodHealService = new FoodHealService();