import { modificationService } from "./ModificationService";
import { romService } from "./ROMService";
import { characterDamageMap } from "../data/damage/CharacterDamageMap";


class CharacterDamageService
{
  createPreset = () =>
  {
    const keys = Object.keys(dataMap);
    const p = {type: "characterDamage", data: {}};
    keys.forEach((k) => p.data[k] = dataMap[k]);
    return p;
  }

  applyPreset = (preset) =>
  {
    const json = JSON.parse(preset);

    if(json && json.data && json.type === "characterDamage")
    {
      Object.keys(json.data).forEach((ck) =>
      {
        const cdm = json.data[ck];
        Object.keys(cdm ? cdm : {}).forEach((ak) =>
        {
          const d = parseInt(cdm[ak]);

          if(!isNaN(d) && d > -1)
            this.setDamage(ck, ak, d);
        });
      });
    }
  }

  setDamageToDefault = (characterKey, attackKey) =>
  {
    const cdm = characterDamageMap[characterKey]?.damageMap;
    const adi = cdm ? cdm[attackKey] : null;

    if(adi)
    {
      if(!(characterKey in dataMap))
        dataMap[characterKey] = {};

      dataMap[characterKey][attackKey] = cdm[attackKey].defaultValue;
    }
  }

  setDamage = (characterKey, attackKey, damage) =>
  {
    const cdm = characterDamageMap[characterKey]?.damageMap;
    const adi = cdm ? cdm[attackKey] : null;

    if(adi)
    {
      if(!(characterKey in dataMap))
        dataMap[characterKey] = {};

      dataMap[characterKey][attackKey] = damage;
    }
  }

  getDamage = (characterKey, attackKey) =>
  {
    const ecdm = dataMap[characterKey];

    if(!ecdm || !(attackKey in ecdm))
    {
      const cdm = characterDamageMap[characterKey]?.damageMap;
      const adi = cdm ? cdm[attackKey] : {};
      const invalidBytes = this.isInvalidROMBytes(adi);
      const byteIndexes = adi.byteIndexes ?? [];
      const v = parseInt(romService.getByte(adi.filename, byteIndexes[0]));
      return (!isNaN(v) && !invalidBytes) ? v : adi.defaultValue;
    }

    return ecdm ? ecdm[attackKey] : null;
  }

  clearData = () =>
  {
    dataMap = {};
  }

  hasCharacterKey = (characterKey) =>
  {
    return (characterKey in characterDamageMap);
  }

  hasAttackKey = (characterKey, attackKey) =>
  {
    const v1 = this.hasCharacterKey(characterKey);
    const am = v1 ? characterDamageMap[characterKey].damageMap : {};
    return (attackKey in am);
  }

  applyData = () =>
  {
    Object.keys(characterDamageMap).forEach((ck) =>
    {
      const ecdm = dataMap[ck];
      const cdm = characterDamageMap[ck].damageMap;

      Object.keys(ecdm).forEach((ak) =>
      {
        const damage = parseInt(ecdm[ak]);

        if(!isNaN(damage) && damage > -1 && damage < 256)
        {
          const cad = cdm[ak];

          if(cad)
          {
            if(cad.apply)
            {
              const index = Object.keys(cad.apply)[0];
              const pd = cad.apply[index];
              romService.setBytes(cad.filename, parseInt(index), pd, cad.byteFormat);
            }
            
            cad.byteIndexes.forEach((byteIndex) =>
            {
              romService.setByte(cad.filename, byteIndex, damage);
            });
          }
        }
      });
    });
  }
  
  isInvalidROMBytes = (attackDamageData) =>
  {
    if(romService.isROMReady())
    {
      const adi = attackDamageData;
      const checkKeys = adi.check ? Object.keys(adi.check) : ["-9"];
      const c = adi.check ? adi.check[checkKeys[0]] : ["-1"];
      const ci = parseInt(checkKeys[0]);
      const i = romService.indexOfBytes(adi.filename, c, adi.byteFormat, ci);
      return i === ci;
    }

    return true;
  }

  getUICharacterDataList = () =>
  {
    const keys = Object.keys(characterDamageMap);
    return keys.map((key) => {return characterDamageMap[key];});
  }

  getUIAttackDataList = (characterKey) =>
  {
    if(characterDamageService.hasCharacterKey(characterKey))
    {
      const am = characterDamageMap[characterKey].damageMap;
      return Object.keys(am).map((key) =>  {return am[key];});
    }
  
    return [];
  }

  addToModificationQueue = () =>
  {
    modificationService.add(100, "damage", this.applyData);
  }

  constructor()
  {
    dataMap = {};
  }
}


let dataMap;

export const characterDamageService = new CharacterDamageService();