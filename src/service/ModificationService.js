import patchMap from "../data/patch/PatchMap";

import componentService from "./ComponentService";


class ModificationService
{
	constructor()
	{
		this.modificationData = {};
	}

	apply = () =>
	{
		var s = function(a, b) {return a-b;};
		Object.keys(this.modificationData).sort(s).forEach((key) =>
		{
			let d = this.modificationData[key];

			if(d && d.applyCallback)
				d.applyCallback(d.complement);
		});
	}

	add = (priority, componentKey, applyCallback, complement) =>
	{
		let key = parseInt(priority);

		if(!isNaN(key))
		{
			let pd = patchMap[complement];
			let cd = componentService.getInfoMap()[componentKey];
			let d = {};
			d.componentKey = componentKey;
			d.complement = complement;
			d.componentLabel = cd ? cd.title : "Unknown";
			d.complementLabel = pd ? pd.label : "Custom";
			d.applyCallback = applyCallback;
			this.modificationData[key] = d;
		}
	}

	remove = (priority) =>
	{
		let key = parseInt(priority);
		delete this.modificationData[key];
	}

	contains = (priority) =>
	{
		let key = parseInt(priority);
		return this.modificationData[key] ? true : false;
	}

	getModificationData = () =>
	{
		return this.modificationData;
	}
}


let modificationService = new ModificationService();
export default modificationService;