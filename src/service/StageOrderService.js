import { romService } from "./ROMService";
import { modificationService } from "./ModificationService";
import { stageOrderMap } from "../data/default/StageOrderMap";


class StageOrderService
{
  createPreset = () =>
  {
    const p = {type: "order", data: {}};
    Object.keys(dataMap).forEach((k) =>
    {
      const order = dataMap[k];

      if(!isNaN(parseInt(order)))
        p.data[k] = order.toString();
    });
    return p;
  }

  applyPreset = (preset) =>
  {
    const json = JSON.parse(preset);

    if(json && json.data && json.type === "order")
      Object.keys(json.data).forEach((k) => this.setStageOrder(k, json.data[k]));
  }

  setStageOrder = (stageKey, order) =>
  {
    if(this.hasStageKey(stageKey))
      dataMap[stageKey] = order;
  }

  setStageOrderToDefault = (stageKey) =>
  {
    const sod = stageOrderMap[stageKey];

    if(sod)
      dataMap[stageKey] = sod.defaultValue.toString();
  }

  getStageOrder = (stageKey) =>
  {
    if(!this.hasStageKey(stageKey))
    {
      const sod = stageOrderMap[stageKey];
      return sod?.defaultValue;
    }

    return dataMap[stageKey];
  }

  applyData = () =>
  {
    const stagePointerMap = this.getStagePointerMap();
    const max = 9 + (stagePointerMap["extraStage"] ? 1 : 0);
    Object.keys(dataMap).forEach((sk) =>
    {
      const order = parseInt(dataMap[sk]);

      if(!isNaN(order) && order > 0 && order < max)
      {
        const sod = stageOrderMap[order != 9 ? "stage" + order : "extraStage"];
        const spd = stagePointerMap[sk];

        if(sod && spd)
        {
          sod.byteIndexes.forEach((byteIndex) =>
          {
            romService.setBytes(sod.filename, byteIndex, spd.pointerBytes);
          });
        }
      }
    });
  }

  clearData = () =>
  {
    const d = stageOrderMap;
    Object.keys(d).forEach((k) => dataMap[k] = d[k].defaultValue.toString());
  }

  getStagePointerMap = () =>
  {
    const pointer1 = 0x30426;
    const stagePointerMap = {}

    for(let i = 0; i < 9; i++)
    {
      const address = pointer1 + (4 * i);
      const bytes = romService.getBytes(this.filename, address, 4);
      const decimal = romService.convertDecimalBytesToNumber(bytes);
      const stageIndex = isNaN(decimal) ? 0 : decimal;
      const areaBytes = romService.getBytes(this.filename, stageIndex + 6, 2);
      const areaDecimal = romService.convertDecimalBytesToNumber(areaBytes);
      const areaHexBytes = romService.convertNumberToROMBytes(areaDecimal, 2);
      const areaId = (areaHexBytes[1] + areaHexBytes[0])?.toUpperCase();
      const stageKey = this.stageFirstAreaMap[areaId];

      if(stageKey)
      {
        stagePointerMap[stageKey] =
        {
          order: i + 1,
          pointer: stageIndex.toString(16),
          pointerBytes: bytes
        };
      }
    }

    return stagePointerMap;
  }

  hasStageKey = (stageKey) =>
  {
    return (stageKey in dataMap);
  }

  addToModificationQueue = () =>
  {
    modificationService.add(152, "order", this.applyData);
  }

  getStageOrderDataList = () =>
  {
    const keys = Object.keys(stageOrderMap);
    return keys.map((key) => stageOrderMap[key]);
  }

  getStageOrderValueList = () =>
  {
    return ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  }

  constructor()
  {
    dataMap = {};
    this.clearData();
    this.stageFirstAreaMap = createStageFirstAreaMap();
    this.filename = "bpsm945a.u45";
  }
}


const createStageFirstAreaMap = () =>
{
  return {
    "0000": "stage1",
    "0002": "stage2",
    "0004": "stage3",
    "0007": "stage4",
    "000E": "stage5",
    "0012": "stage6",
    "0001": "stage7",
    "0018": "stage8",
    "0502": "extraStage",
  };
}

let dataMap;

export const stageOrderService = new StageOrderService();