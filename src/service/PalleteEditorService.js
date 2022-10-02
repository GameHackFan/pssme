import { modificationService } from "./ModificationService";
import { romService } from "./ROMService";
import { palleteData } from "../data/pallete/PalleteData";


class PalleteEditorService
{
  applyData = () =>
  {
    const edited = modifiedPalletes ? modifiedPalletes : new Set();

    Object.keys(dataMap).forEach((key) =>
    {
      let pid = parseInt(key);
      pid = isNaN(pid) ? -1 : pid;

      if(edited.has(key.toString()))
        this.applyPallete(pid, dataMap[key]);
    });
  }

  setColor = (palleteId, colorId, color32) =>
  {
    if(color32 && color32.length > 2)
    {
      const h = this.convertColor32ToDecimal(color32).toString(16);
      this.setHexColor(palleteId, colorId, h);
    }
  }

  setHexColor = (palleteId, colorId, hexColor) =>
  {
    const p = dataMap[palleteId.toString()];
    const h = hexColor ? hexColor.replace('#', '').toUpperCase() : null;

    if(p && h && !isNaN(parseInt(h, 16)))
    {
      p[colorId] = "#" + h.padStart(6, '0').substring(0, 6);
      modifiedPalletes.add(palleteId.toString());
    }
  }

  getPallete = (palleteId) =>
  {
    const pId = parseInt(palleteId);
    const ready = romService.isROMReady();

    if(ready && (!isNaN(pId) && pId > -1 && pId < palleteData.amount))
    {
      if((dataMap[palleteId.toString()] ? false : true))
        return this.resetPallete(palleteId);
      else
        return dataMap[palleteId.toString()];
    }

    return [];
  }

  resetPallete = (palleteId) =>
  {
    const key = palleteId.toString();
    const byteIndex = palleteData.startAddress + (palleteId * 32);
    const bytes = romService.getBytes(filename, byteIndex, 32);
    const pallete = this.convertBytesToPallete(bytes);
    dataMap[key] = pallete;
    modifiedPalletes.delete(key);
    return pallete;
  }

  resetColor = (palleteId, colorId) =>
  {
    if(palleteId > -1 && palleteId < palleteData.amount &&
        colorId > -1 && colorId < 16)
    {
      const op = dataMap[palleteId.toString()];
      const p = this.resetPallete(palleteId);
      op[colorId] = p[colorId].toUpperCase();
      dataMap[palleteId.toString()] = op;
    }
  }

  resetPalleteMap = () =>
  {
    dataMap = {};
    modifiedPalletes = new Set();
  }

  applyPallete = (palleteId, pallete) =>
  {
    if(palleteId > -1 && palleteId < palleteData.amount)
    {
      const byteIndex = palleteData.startAddress + (palleteId * 32);
      const bytes = this.convertPalleteToBytes(pallete);
      romService.setBytes(filename, byteIndex, bytes);
    }
  }

  createPalletePreset = (palleteId, pallete) =>
  {
    const preset = {};
    preset.type = "palleteEditor";
    preset.data = {[palleteId]: pallete.slice()};
    return preset;
  }

  createAllPreset = () =>
  {
    const preset = {};
    preset.type = "palleteEditor";
    preset.data = {};

    for(let i = 0; i < palleteData.amount; i++)
      preset.data[i] = this.getPallete(i);

    return preset;
  }

  applyPreset = (preset) =>
  {
    const json = JSON.parse(preset);

    if(json && json.data && json.type === "palleteEditor")
    {
      Object.keys(json.data).forEach((key) =>
      {
        dataMap[key.toString()] = json.data[key];
        modifiedPalletes.add(key.toString());
      });
    }
  }

  convertBytesToPallete = (bytes) =>
  {
    const pallete = [];
    let decimal, color;

    for(let i = 0; i < bytes.length; i += 2)
    {
      decimal = (bytes[i + 1] << 8) | bytes[i];
      color = this.convertDecimalToColor16(decimal);
      color = this.convertColor16ToColor32(color);
      decimal = this.convertColor32ToDecimal(color);
      var hex = decimal.toString(16).padStart(6, '0');
      pallete.push("#" + hex.toUpperCase());
    }

    return pallete;
  }

  convertPalleteToBytes = (pallete) =>
  {
    const bytes = [];
    let decimal, color;

    for(let i = 0; i < pallete.length; i++)
    {
      color = this.convertHexToColor32(pallete[i]);
      color = this.convertColor32ToColor16(color);
      decimal = this.convertColor16ToDecimal(color);
      bytes.push(decimal & 255);
      bytes.push((decimal >> 8) & 255);
    }

    return bytes;
  }

  getColor32 = (red, green, blue) =>
  {
    let r = parseInt(red);
    let g = parseInt(green);
    let b = parseInt(blue);
    r = isNaN(r) ? 0 : Math.abs(r) & 255;
    g = isNaN(g) ? 0 : Math.abs(g) & 255;
    b = isNaN(b) ? 0 : Math.abs(b) & 255;
    return [r, g, b];
  }

  convertHexToColor32 = (hex) =>
  {
    const h = hex ? hex : "";
    const decimal = parseInt(h.replace("#", ""), 16);
    return this.convertDecimalToColor32(decimal);
  }

  convertDecimalToColor32 = (d) =>
  {
    return [(d >> 16) & 255, (d >> 8) & 255, d & 255];
  }

  convertColor16ToDecimal = (color) =>
  {
    return (parseInt(color[1]) << 10) |
        (parseInt(color[0]) << 5) |
        parseInt(color[2]);
  }

  convertColor32ToDecimal = (color) =>
  {
    return parseInt((color[0] << 16).toString(), 10) |
        parseInt((color[1] << 8).toString(), 10) |
        parseInt((color[2]).toString(), 10);
  }

  convertDecimalToColor16 = (d) =>
  {
    return [(d >> 5) & 31, (d >> 10) & 31, d & 31];
  }

  convertColor16ToColor32 = (color) =>
  {
    return color.map((v) => Math.round(v * 8.225806));
  }

  convertColor32ToColor16 = (color) =>
  {
    return color.map((v) => Math.round(v / 8.225806));
  }

  addToModificationQueue = () =>
  {
    modificationService.add(151, "pallete", this.applyData);
  }

  getUIFilteredPalleteInfoList = (filter, currentPalleteId) =>
  {
    if(filter)
    {
      const filterLower = filter.toLowerCase();
      const indexOrDecimal = parseInt(filter, 10);
      const fromHex = parseInt(filter, 16);
      const filtered = [];
      let address, palleteInfo;

      for(let i = 0; i < palleteInfoList.length; i++)
      {
        palleteInfo = palleteInfoList[i];
        address = palleteData.startAddress + (i * 32);
        const v1 = palleteInfoList[i].originalUsage.toLowerCase().includes(filterLower);
        const v2 = palleteInfoList[i].pssmeUsage.toLowerCase().includes(filterLower);
        const v3 = i == indexOrDecimal || address == fromHex || address == indexOrDecimal;
        const v4 = palleteInfo.id.toString() === currentPalleteId;

        if(v1 || v2 || v3 || v4)
          filtered.push(palleteInfoList[i]);
      }

      return filtered;
    }

    return palleteInfoList;
  }

  getUIPalleteInfo = (palleteInfoId) =>
  {
    return palleteInfoList[palleteInfoId];
  }

  constructor()
  {
    dataMap = {};
    modifiedPalletes = new Set();
  }
}


const createUIPalleteInfoList = () =>
{
  const info = [];
  const unknown = palleteData.data["unknown"];
  let address, hexAddress, aux;

  for(let id = 0; id < palleteData.amount; id++)
  {
    address = palleteData.startAddress + (32 * id);
    hexAddress = address.toString(16).toUpperCase();
    aux = palleteData.data[address];

    if(aux)
      info.push({...aux, id, address, hexAddress});
    else
      info.push({...unknown, id, address, hexAddress});
  }

  return info;
}


const filename = "bpsm945a.u45";
const palleteInfoList = createUIPalleteInfoList();
let dataMap, modifiedPalletes;

export const palleteEditorService = new PalleteEditorService();