import { componentService } from "../../service/ComponentService";
import { fileService } from "../../service/FileService";
import { zoomService } from "../../service/ZoomService";


class ZoomManager
{
  onSavePreset = () =>
  {
    const zpo = zoomService.createPreset();
    const json = JSON.stringify(zpo, null, "\t");
    const contentType = "text/json;charset=utf-8";
    const filename = "pssme_zoom_preset.json";
    componentService.downloadFile(json, filename, contentType);
  }

  onLoadPresetFileChange = (event) =>
  {
    const file = event.target.files[0];

    if(file)
    {
      const extras = {};
      extras.successCallback = this.onActionResult;
      extras.errorCallback = this.onActionResult;
      extras.contentCallback = this.applyPresetFile;
      extras.successMessage = "Zoom preset loaded!";
      extras.errorMessage = "Problems loading the preset!";
      extras.file = file;
      fileService.readTextFile(extras);
    }

    event.target.value = "";
  }

  applyPresetFile = (extras) =>
  {
    try
    {
      if(extras && extras.actionSuccessful)
      {
        zoomService.applyPreset(extras.actionData);
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

  clearChanges = () =>
  {
    zoomService.setDataMapToDefault();
    this.setViewData(this.getViewData());
  }

  setComponentKey = (key) =>
  {
    this.componentKey = key;
    this.setViewData(this.getViewData());
  }

  getComponentZoom = () =>
  {
    const z = zoomService.getZoom(this.componentKey);
    return z ? z : "";
  }

  setComponentZoom = (zoom) =>
  {
    if(zoomService.hasComponentKey(this.componentKey))
    {
      zoomService.setZoom(this.componentKey, zoom);
      this.setViewData(this.getViewData());
    }
  }

  getViewData = () =>
  {
    const componentZoom = this.getComponentZoom();
    const showZoomField = zoomService.hasComponentKey(this.componentKey);
    const {componentData, componentDataList, componentKey} = this;
    return {
      componentData, componentDataList, componentKey,
      componentZoom, showZoomField
    };
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
    this.componentDataList = createComponentDataList();
    this.componentKey = "";
    this.updateZoom = props.window.updateZoom;
    this.requestFile = componentService.requestFile;
    this.updateViewData();
  }
}


const createComponentDataList = () =>
{
  const componentKeys = componentService.getKeys();
  return componentKeys.map((key) => componentService.getComponentData(key));
}


export { ZoomManager };