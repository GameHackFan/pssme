import romService from "./ROMService";

import levelExpansionData from "../data/LevelExpansionData";


class LevelExpansionService
{
	createLevelFixPatch = () =>
	{
		let patch = this.createBasePatch();
		let ks = Object.keys(levelExpansionData.levelsPointers);

		ks.forEach((key) =>
		{
			let lpd = levelExpansionData.levelsPointers[key];

			if(this.hasLevel(patch.filename, lpd))
			{
				let pointer = romService.indexOfBytes(
						patch.filename, lpd.levelStartData,
						lpd.byteFormat, lpd.moduleIndex);
				pointer = (pointer + lpd.levelStartDataIndex) - lpd.moduleIndex;
				let pointerHex = romService.convertNumberToROMBytes(pointer, 2);
				let romIndex = romService.indexOfBytes(
						patch.filename, lpd.levelStartPointer,
						lpd.byteFormat, lpd.moduleIndex);
				romIndex += lpd.levelStartPointerIndex;
				patch.data[romIndex.toString()] = pointerHex;
			}
		});

		return patch;
	}

	createBossFightsFixPatch = () =>
	{
		let patch = this.createBasePatch();
		let ks = Object.keys(levelExpansionData.bossFightsPointers);
		
		ks.forEach((key) =>
		{
			let bfd = levelExpansionData.bossFightsPointers[key];

			if(this.hasLevel(patch.filename, bfd))
			{
				let baseIndex = romService.indexOfBytes(
						patch.filename, bfd.startData,
						bfd.byteFormat, bfd.moduleIndex);
				let field = baseIndex + bfd.startDataIndex;
				let pointer = (baseIndex - bfd.moduleIndex) + bfd.pointerIndex;
				let pointerHex = romService.convertNumberToROMBytes(pointer, 2);
				patch.data[field.toString()] = pointerHex;
			}
		});

		return patch;
	}

	createBossHelpersFixPatch = () =>
	{
		let patch = this.createBasePatch();
		let ks = Object.keys(levelExpansionData.bossHelpersPointers);
		
		ks.forEach((key) =>
		{
			let bhd = levelExpansionData.bossHelpersPointers[key];

			if(this.hasLevel(patch.filename, bhd))
			{
				let pointer = romService.indexOfBytes(
						patch.filename, bhd.endDataPointerHelper,
						bhd.byteFormat, bhd.moduleIndex);
				pointer = (pointer - bhd.moduleIndex) + bhd.pointerIndex;
				let pointerHex = romService.convertNumberToROMBytes(pointer, 2);
				let romIndex = romService.indexOfBytes(
						patch.filename, bhd.endData,
						bhd.byteFormat, bhd.moduleIndex);
				romIndex += bhd.endDataIndex;
				patch.data[romIndex.toString()] = pointerHex;
			}
		});

		return patch;
	}

	createLevelShiftPatch = () =>
	{
		let patch = this.createBasePatch();
		let ks = Object.keys(levelExpansionData.levelsPointersShift);

		ks.forEach((key) =>
		{
			let lps = levelExpansionData.levelsPointersShift[key];

			if(!this.hasLevel(patch.filename, lps))
			{
				let p = romService.indexOfBytes(
						patch.filename, lps.levelStartPointer,
						lps.byteFormat, lps.moduleIndex);
				let bytes = romService.getBytes(patch.filename,
						p + lps.shiftStart, lps.byteAmount);
				romService.setBytes(patch.filename, p + lps.shiftReplace, bytes);
			}
		});

		return patch;
	}

	hasLevel = (filename, data) =>
	{
		let lc = data.levelCheck ? data.levelCheck : ["00"];
		return romService.indexOfBytes(filename,
				lc, data.byteFormat, data.moduleIndex) > -1;
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