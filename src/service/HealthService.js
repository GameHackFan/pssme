import { modificationService } from "./ModificationService";
import { romService } from "./ROMService";
import { healthMap } from "../data/default/HealthMap";


class HealthService
{
  createPreset = () =>
  {
    const keys = Object.keys(dataMap);
    const p = {type: "health", data: {}};
    keys.forEach((ck) => p.data[ck] = dataMap[ck]);
    return p;
  }

  applyPreset = (preset) =>
  {
    const json = JSON.parse(preset);

    if(json && json.data && json.type === "health")
    {
      const keys = Object.keys(json.data);
      keys.forEach((ck) => dataMap[ck] = json.data[ck]);
    }
  }

  setHealthToDefault = (characterKey) =>
  {
    const hd = healthMap[characterKey];

    if(hd)
      dataMap[characterKey] = hd.defaultValue;
  }

  setHealth = (characterKey, health) =>
  {
    if(this.hasCharacterKey(characterKey))
      dataMap[characterKey] = health;
  }

  getHealth = (characterKey) =>
  {
    if(!(characterKey in dataMap))
    {
      const hd = healthMap[characterKey];
      const v = parseInt(romService.getByte(hd?.filename, hd?.byteIndexes[0]));
      return !isNaN(v) ? v : hd?.defaultValue;
    }

    return dataMap[characterKey];
  }

  applyData = () =>
  {
    Object.keys(dataMap).forEach((ck) =>
    {
      const h = parseInt(dataMap[ck]);
      const hd = healthMap[ck];

      if(hd && !isNaN(h) && h > -1 && h < 256)
      {
        hd.byteIndexes.forEach((byteIndex) =>
        {
          romService.setByte(hd.filename, byteIndex, h);
        });
      }
    });
  }

  clearData = () =>
  {
    dataMap = {};
  }

  hasCharacterKey = (characterKey) =>
  {
    return (characterKey in healthMap);
  }

  addToModificationQueue = () =>
  {
    modificationService.add(162, "health", this.applyData);
  }

  getCharacterHealthList = () =>
  {
    const keys = Object.keys(healthMap);
    return keys.map((key) => healthMap[key]);
  }

  constructor()
  {
    dataMap = {};
  }
}


let dataMap;

export const healthService = new HealthService();