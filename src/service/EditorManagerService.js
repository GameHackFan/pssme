import romService from "./ROMService";

import editorManagerData from "../data/overwrite/EditorManagerData";
import patchMap from "../data/patch/PatchMap";


class EditorManagerService
{
	setROM = (rom) =>
	{
		romService.setROM(rom);
	}

	cloneROM = () =>
	{
		romService.cloneROM();
	}

	generateROM = () =>
	{
		this.addDefaultTextIfNoText();
		return romService.getGeneratedROM();
	}

	addDefaultTextIfNoText = () =>
	{
		let index = romService.indexOfBytes("bpsm945a.u45",
				editorManagerData.toolTextCheckBytes, "hex");

		if(index < 0)
			romService.applyPatch(patchMap.defaultTextPatch.patch);
	}
}


const editorManagerService = new EditorManagerService();
export default editorManagerService;