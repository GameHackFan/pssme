import { componentService } from "../../service/ComponentService";
import { fileService } from "../../service/FileService";
import { stageOrderService } from "../../service/StageOrderService";


class StageOrderEditor
{
  onLoadPresetFileChange = (event) =>
  {
    const file = event.target.files[0];

    if(file)
    {
      const extras = {};
      extras.successCallback = this.onActionResult;
      extras.errorCallback = this.onActionResult;
      extras.contentCallback = this.applyPresetFile;
      extras.successMessage = "Stage Order preset loaded!";
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
        stageOrderService.applyPreset(extras.actionData);
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

  savePresetFile = () =>
  {
    const preset = stageOrderService.createPreset();
    const json = JSON.stringify(preset, null, "\t");
    const contentType = "text/json;charset=utf-8";
    const filename = "pssme_stage_order_preset.json";
    componentService.downloadFile(json, filename, contentType);
  }

  getStageOrder()
  {
    const order = stageOrderService.getStageOrder(this.stageKey);
    return order ? order : "";
  }

  setStageKey = (stageKey) =>
  {
    this.stageKey = stageKey;
    this.setViewData(this.getViewData());
  }

  setStageOrder = (order) =>
  {
    stageOrderService.setStageOrder(this.stageKey, order);
    this.setViewData(this.getViewData());
  }

  setStageOrderToDefault = () =>
  {
    stageOrderService.setStageOrderToDefault(this.stageKey);
    this.setViewData(this.getViewData());
  }

  addChanges = () =>
  {
    const extras = {};
    extras.successMessage = "Data is added to the modification queue!";
    stageOrderService.addToModificationQueue();
    this.onActionResult(extras);
    componentService.callMethod("windowList", "updateActiveWindowList");
  }

  clearData = () =>
  {
    const extras = {};
    extras.successMessage = "All data is cleared!";
    stageOrderService.clearData();
    this.onActionResult(extras);
    this.setViewData(this.getViewData());
  }

  createStageOrderDataList = () =>
  {
    return stageOrderService.getStageOrderDataList();
  }

  createStageOrderValueList = () =>
  {
    return stageOrderService.getStageOrderValueList();
  }

  getViewData = () =>
  {
    const showOrderField = stageOrderService.hasStageKey(this.stageKey);
    const {componentData, stageKey} = this;
    const order = this.getStageOrder();
    return {componentData, showOrderField, stageKey, order};
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
    this.stageKey = "";
    this.updateViewData();
  }
}

export { StageOrderEditor };