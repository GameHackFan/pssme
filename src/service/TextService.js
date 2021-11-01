import romService from "./ROMService";

import patchMap from "../data/patch/PatchMap";


class TextService
{
	constructor()
	{
		this.baseTextBytes = this.getToolBaseTextBytes();
	}

	addDefaultTextIfNoText = () =>
	{
		let index = romService.indexOfBytes(
				"bpsm945a.u45", this.baseTextBytes, "hex");

		if(index < 0)
			romService.applyPatch(patchMap.defaultTextPatch.patch);
	}

	getToolBaseTextBytes = () =>
	{
		return [
			"69", "67", "68", "74", "62", "75", "63", "2E",
			"6D", "6F", "47", "2F", "6D", "61", "48", "65",
			"63", "61", "46", "6B", "6E", "61", "70", "2F",
			"73", "73", "65", "6D" 
		];
	}
}


const textService = new TextService();
export default textService;