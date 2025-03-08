import { componentService } from "../../service/ComponentService";
import { modificationService } from "../../service/ModificationService";
import { fileService } from "../../service/FileService";
import { romService } from "../../service/ROMService";
import { patchService } from "../../service/PatchService";


class EditorManager
{
  onWindowSelected = (event) =>
  {
    const key = event.target.value;
    event.target.value = "";

    if(!componentService.isComponentActive(key))
      componentService.openWindow(key);
  }

  onLoadROMFileChange = (event) =>
  {
    const file = event.target.files[0];

    if(file)
    {
      const extras = {};
      extras.successCallback = this.onActionResult;
      extras.errorCallback = this.onActionResult;
      extras.contentCallback = this.onROMFileLoaded;
      extras.successMessage = "ROM loaded!";
      extras.errorMessage = "Problems loading the ROM!";
      extras.file = file;
      fileService.readZipFile(extras);
    }

    event.target.value = "";
  }

  onROMFileLoaded = (extras) =>
  {
    if(extras && extras.actionSuccessful)
    {
      romService.setROM(extras.actionData);
      componentService.callMethod("windowList", "updateActiveWindowList");
    }
  }

  cloneROM = () =>
  {
    const extras = {};

    try
    {
      romService.cloneROM();
      extras.successMessage = "ROM cloned!";
      componentService.callMethod("windowList", "updateActiveWindowList");
    }
    catch(e)
    {
      const m = "Problems cloning the ROM!"
      console.log(m);
      console.log(e.message);
      console.log(e);
      extras.errorMessage = m;
    }

    this.onActionResult(extras);
  }

  generateROM = () =>
  {
    const extras = {};

    try
    {
      extras.successCallback = this.downloadGeneratedROM;
      extras.errorCallback = this.onActionResult;
      extras.errorMessage = "Problems generating the ROM!";
      patchService.tryToAddDefaultTextPatchToModificationQueue();
      modificationService.apply();
      romService.addHackAuthor(this.hackAuthor);
      const rom = romService.getGeneratedROM();
      rom["s04.u45"] = import.meta.env.DEV ? rom["bpsm945a.u45"] : undefined;
      extras.fileObject = rom;
      componentService.callMethod("windowList", "updateActiveWindowList");

      if(extras.fileObject)
      {
        this.generatingROM = true;
        fileService.createZipFile(extras);
        this.setViewData(this.getViewData());
      }
      else
        this.onActionResult(extras);

    }
    catch(e)
    {
      console.log(e.message);
      console.log(e);
      this.onActionResult(extras);
    }
  }

  downloadGeneratedROM = (extras) =>
  {
    this.generatingROM = false;
    const rom = extras.actionData;
    const contentType = "application/octet-stream";
    const name = import.meta.env.DEV ? "sailormnts04.zip" : "sailormn.zip";
    componentService.downloadFile(rom, name, contentType);
    this.setViewData(this.getViewData());
  }

  getValidWindowComponentDataList = () =>
  {
    const vwcdl = [];
    
    componentService.getKeys().forEach((k) =>
    {
      const cd = componentService.getComponentData(k);
  
      if(k !== "manager" && cd.type === "windowContent")
        vwcdl.push(cd);
    });
  
    return vwcdl;
  }

  setHackAuthor = (hackAuthor) =>
  {
    this.hackAuthor = hackAuthor;
  }

  getViewData = () =>
  {
    const {componentData, hackAuthor, generatingROM} = this;
    return {componentData, hackAuthor, generatingROM};
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
    this.window = props.window;
    this.onActionResult = props.window.onActionResult;
    this.componentData = componentService.getComponentData(this.key);
    this.requestFile = componentService.requestFile;
    this.updateZoom = props.window.updateZoom;
    this.hackAuthor = "";
    this.generatingROM = false;
    this.updateViewData();
  }
}


export { EditorManager };