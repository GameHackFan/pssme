import { modificationService } from "./ModificationService";
import { romService } from "./ROMService";
import { patchMap } from "../data/patch/PatchMap";


class PatchService
{
  addPatchFromFile = (patch) =>
  {
    let json = JSON.parse(patch);
    json = json ? json : {};
    let {key, type, filename, priority} = json;
    priority = parseInt(priority);
    priority = isNaN(priority) ? -1 : priority;
    let message;

    if(!key)
      message = "Invalid patch, it doesn't have the field 'key'!";

    if(!type)
      message = "Invalid patch, it doesn't have the field 'type'!";

    if(!filename)
      message = "Invalid patch, it doesn't have the field 'filename'!";

    if(patchMap[key])
      message = "Invalid patch, 'key' conflicts with another patch in the patch map!";

    if(priority < 0)
      message = "Invalid patch, it must have a field 'priority' bigger than -1!";

    if(!message)
    {
      const pd = {};
      pd.key = key
      pd.label = json.label ? json.label + " (Custom)" : "Unknown (Custom)";
      pd.text = json.text ? json.text : "No information.";
      pd.patch = json;
      pd.show = true;
      patchMap[key] = pd;
      this.addToModificationQueue(key);
    }
    else
      throw Error(message);
  }

  applyPatch = (patchKey) =>
  {
    const patchData = patchMap[patchKey];

    if(patchData)
      romService.applyPatch(patchData.patch);
  }

  tryToAddDefaultTextPatchToModificationQueue = () =>
  {
    if(!modificationService.contains(150))
    {
      const key = "defaultTextPatch";
      const dtp = patchMap.defaultTextPatch.patch;
      modificationService.add(dtp.priority, "patch", this.applyPatch, key);
    }
  }

  addToModificationQueue = (patchKey) =>
  {
    const pd = patchMap[patchKey];
    const priority = parseInt(pd.patch.priority);

    if(pd && pd.patch && !isNaN(priority) && priority > -1)
      modificationService.add(priority, "patch", this.applyPatch, patchKey);
  }

  get = (key) =>
  {
    return patchMap[key];
  }

  getUIPatchList = (hidden) =>
  {
    const pl = []
    const keys = Object.keys(patchMap);
    keys.forEach((key) =>
    {
      const p = patchMap[key];

      if(p?.show || hidden)
        pl.push(p);
    });
    return pl;
  }
}


export const patchService = new PatchService();