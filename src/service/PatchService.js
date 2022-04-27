import modificationService from "./ModificationService";
import romService from "./ROMService";

import patchMap from "../data/patch/PatchMap";


class PatchService
{
	addPatchFromFile = (presetFile) =>
	{
		let json = JSON.parse(presetFile);
		json = json ? json : {};
		let {patchKey, type, filename, priority} = json;
		priority = parseInt(priority);
		priority = isNaN(priority) ? -1 : priority;
		let validPatch = patchMap[patchKey] ? false : true;
	
		if(patchKey && type && filename && priority > - 1 && validPatch)
		{
			let pd = {};
			pd.label = json.label ? json.label + " (Custom)" : "Uknown (Custom)";
			pd.text = json.text ? json.text : "No information.";
			pd.patch = json;
			pd.show = true;
			patchMap[json.patchKey] = pd;
		}
		else
		{
			var m = "Invalid patch, it is missing some of the fields";
			m += " (patchKey, type, filename)";
			console.log(m);
		}
	}

	applyPatch = (patchKey) =>
	{
		let patchData = patchMap[patchKey];

		if(patchData)
			romService.applyPatch(patchData.patch);
	}

	tryToAddDefaultTextPatchToModificationQueue = () =>
	{
		if(!modificationService.contains(150))
		{
			let key = "defaultTextPatch";
			let dtp = patchMap.defaultTextPatch.patch;
			modificationService.add(dtp.priority, "patch", this.applyPatch, key);
		}
	}

	addToModificationQueue = (patchKey) =>
	{
		let pd = patchMap[patchKey];
		
		if(pd && pd.patch && pd.patch.priority)
		{
			let priorty = parseInt(pd.patch.priority);
			
			if(!isNaN(priorty))
				modificationService.add(priorty, "patch", this.applyPatch, patchKey);
		}
	}
}


let patchService = new PatchService();
export default patchService;