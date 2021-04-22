import romService from "./ROMService";

import levelExpansionData from
    "../data/LevelExpansionData";


class LevelExpansionService
{
  createLevelFixPatch = () =>
  {
    let patch = this.createBasePatch();
    let ks = Object.keys(
        levelExpansionData.levelsPointers);
    
    ks.forEach((key) =>
    {
      let lpd = levelExpansionData.levelsPointers[key];
      let pointer = romService.indexOfBytes(
          patch.filename, lpd.levelStartData,
          lpd.byteFormat, lpd.moduleIndex);
      pointer = (pointer + lpd.levelStartDataIndex) -
          lpd.moduleIndex;
      let pointerHex = romService.
          convertNumberToROMBytes(pointer, 2);
      let romIndex = romService.indexOfBytes(
          patch.filename, lpd.levelStartPointer,
          lpd.byteFormat, lpd.moduleIndex);
      romIndex += lpd.levelStartPointerIndex;
      patch.data[romIndex.toString()] = pointerHex;
    });

    return patch;
  }

  createBossFightsFixPatch = () =>
  {
    let patch = this.createBasePatch();
    let ks = Object.keys(
        levelExpansionData.bossFightsPointers);
    
    ks.forEach((key) =>
    {
      let bfd = levelExpansionData.
          bossFightsPointers[key];
      let baseIndex = romService.indexOfBytes(
          patch.filename, bfd.startData,
          bfd.byteFormat, bfd.moduleIndex);
      let field = baseIndex + bfd.startDataIndex;
      let pointer = (baseIndex - bfd.moduleIndex) +
          bfd.pointerIndex;
      let pointerHex = romService.
          convertNumberToROMBytes(pointer, 2);
      patch.data[field.toString()] = pointerHex;
    });

    return patch;
  }

  createBossHelpersFixPatch = () =>
  {
    let patch = this.createBasePatch();
    let ks = Object.keys(
        levelExpansionData.bossHelpersPointers);
    
    ks.forEach((key) =>
    {
      let bhd = levelExpansionData.
          bossHelpersPointers[key];
      let pointer = romService.indexOfBytes(
          patch.filename, bhd.endDataPointerHelper,
          bhd.byteFormat, bhd.moduleIndex);
      pointer = (pointer - bhd.moduleIndex) +
          bhd.pointerIndex;
      let pointerHex = romService.
          convertNumberToROMBytes(pointer, 2);
      let romIndex = romService.indexOfBytes(
          patch.filename, bhd.endData,
          bhd.byteFormat, bhd.moduleIndex);
      romIndex += bhd.endDataIndex;
      patch.data[romIndex.toString()] = pointerHex;
    });

    return patch;
  }

  createBasePatch = () =>
  {
    let patch = {};
    patch.type = "overwrite";
    patch.filename = "bpsm945a.u45";
    patch.byteFormat = "hex";
    patch.data = {};
    return patch;
  }
}


let levelExpansionService = new LevelExpansionService();
export default levelExpansionService;