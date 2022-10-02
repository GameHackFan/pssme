import { fileService } from "../../service/FileService";
import { patchService } from "../../service/PatchService";
import { componentService } from "../../service/ComponentService";


class PatchManager
{
  addPatch = () =>
  {
    const extras = {};

    if(this.patchKey)
    {
      extras.successMessage = "Patch added to the modification queue!";
      patchService.addToModificationQueue(this.patchKey);
      componentService.callMethod("windowList", "updateActiveWindowList");
    }
    else
      extras.errorMessage = "Select a patch!";

    this.onActionResult(extras);
  }

  addPatchFille = (extras) =>
  {
    try
    {
      if(extras && extras.actionSuccessful)
      {
        patchService.addPatchFromFile(extras.actionData);
        componentService.callMethod("windowList", "updateActiveWindowList");
        this.setViewData(this.getViewData());
      }
    }
    catch(e)
    {
      console.log(e.message);
      console.log(e);
      const extras = {};
      extras.errorMessage = "Invalid JSON preset file!";
      this.onActionResult(extras);
    }    
  }

  onLoadPatchFileChange = (event) =>
  {
    const file = event.target.files[0];

    if(file)
    {
      const extras = {};
      extras.successCallback = this.onActionResult;
      extras.errorCallback = this.onActionResult;
      extras.contentCallback = this.addPatchFille;
      extras.successMessage = "Patch file added to the modification queue!";
      extras.errorMessage = "Problems adding the patch file!";
      extras.file = file;
      fileService.readTextFile(extras);
    }

    event.target.value = "";
  }

  setPatchKey = (patchKey) =>
  {
    this.patchKey = patchKey;
    this.setViewData(this.getViewData());
  }

  getViewData = () =>
  {
    const {componentData, patchKey} = this;
    const patchList = createPatchList();
    const selectedPatch = patchService.get(patchKey);
    return {componentData, patchList, patchKey, selectedPatch};
  }

  updateViewData = () =>
  {
    this.window.updateViewData();
    this.setViewData(this.getViewData());
  }

  onValueChange = (event, methodName) =>
  {
    componentService.onElementValueChange(event, this, methodName);
  }

  constructor(props, setViewData)
  {
    componentService.setController(props.key, this);
    this.setViewData = setViewData;
    this.key = props.key;
    this.onActionResult = props.window.onActionResult;
    this.window = props.window;
    this.componentData = componentService.getComponentData(this.key);
    this.patchKey = "";
    this.updateZoom = props.window.updateZoom;
    this.requestFile = componentService.requestFile;
    this.updateViewData();
  }
}


const createPatchList = () =>
{
  return patchService.getUIPatchList(false);
}

export { PatchManager };