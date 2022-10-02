import { levelExpansionData } from "../data/level/LevelExpansionData";
import { romService } from "./ROMService";



class LevelExpansionService
{
  createLevelFixPatch = () =>
  {
    const patch = this.createBasePatch();
    const ks = Object.keys(levelExpansionData.levelsPointers);

    ks.forEach((key) =>
    {
      const lpd = levelExpansionData.levelsPointers[key];

      if(this.hasLevel(patch.filename, lpd))
      {
        let pointer = romService.indexOfBytes(
            patch.filename, lpd.levelStartData,
            lpd.byteFormat, lpd.moduleIndex);
        pointer = (pointer + lpd.levelStartDataIndex) - lpd.moduleIndex;
        let romIndex = romService.indexOfBytes(
            patch.filename, lpd.levelStartPointer,
            lpd.byteFormat, lpd.moduleIndex);
        romIndex += lpd.levelStartPointerIndex;
        const pointerHex = romService.convertNumberToROMBytes(pointer, 2);
        patch.data[romIndex.toString()] = pointerHex;
      }
    });

    return patch;
  }

  createBossFightsFixPatch = () =>
  {
    const patch = this.createBasePatch();
    const ks = Object.keys(levelExpansionData.bossFightsPointers);
    
    ks.forEach((key) =>
    {
      const bfd = levelExpansionData.bossFightsPointers[key];

      if(this.hasLevel(patch.filename, bfd))
      {
        const baseIndex = romService.indexOfBytes(
            patch.filename, bfd.startData,
            bfd.byteFormat, bfd.moduleIndex);
        const field = baseIndex + bfd.startDataIndex;
        const pointer = (baseIndex - bfd.moduleIndex) + bfd.pointerIndex;
        const pointerHex = romService.convertNumberToROMBytes(pointer, 2);
        patch.data[field.toString()] = pointerHex;
      }
    });

    return patch;
  }

  createBossHelpersFixPatch = () =>
  {
    const patch = this.createBasePatch();
    const ks = Object.keys(levelExpansionData.bossHelpersPointers);
    
    ks.forEach((key) =>
    {
      const bhd = levelExpansionData.bossHelpersPointers[key];

      if(this.hasLevel(patch.filename, bhd))
      {
        let pointer = romService.indexOfBytes(
            patch.filename, bhd.endDataPointerHelper,
            bhd.byteFormat, bhd.moduleIndex);
        pointer = (pointer - bhd.moduleIndex) + bhd.pointerIndex;
        let romIndex = romService.indexOfBytes(
            patch.filename, bhd.endData,
            bhd.byteFormat, bhd.moduleIndex);
        romIndex += bhd.endDataIndex;
        const pointerHex = romService.convertNumberToROMBytes(pointer, 2);
        patch.data[romIndex.toString()] = pointerHex;
      }
    });

    return patch;
  }

  createLevelShiftPatch = () =>
  {
    const patch = this.createBasePatch();
    const ks = Object.keys(levelExpansionData.levelsPointersShift);

    ks.forEach((key) =>
    {
      const lps = levelExpansionData.levelsPointersShift[key];

      if(!this.hasLevel(patch.filename, lps))
      {
        const p = romService.indexOfBytes(
            patch.filename, lps.levelStartPointer,
            lps.byteFormat, lps.moduleIndex);
        const bytes = romService.getBytes(patch.filename,
            p + lps.shiftStart, lps.byteAmount);
        romService.setBytes(patch.filename, p + lps.shiftReplace, bytes);
      }
    });

    return patch;
  }

  hasLevel = (filename, data) =>
  {
    const lc = data.levelCheck ? data.levelCheck : ["00"];
    return romService.indexOfBytes(filename,
        lc, data.byteFormat, data.moduleIndex) > -1;
  }

  createBasePatch = () =>
  {
    const patch = {};
    patch.type = "overwrite";
    patch.filename = "bpsm945a.u45";
    patch.byteFormat = "hex";
    patch.data = {};
    return patch;
  }
}


export const levelExpansionService = new LevelExpansionService();