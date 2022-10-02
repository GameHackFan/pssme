import { componentService } from "../../service/ComponentService";
import { healthService } from "../../service/HealthService";
import { fileService } from "../../service/FileService";


class HealthEditor
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
      extras.successMessage = "Character Damage preset loaded!";
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
        healthService.applyPreset(extras.actionData);
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
    const preset = healthService.createPreset();
    const json = JSON.stringify(preset, null, "\t");
    const contentType = "text/json;charset=utf-8";
    const filename = "pssme_health_editor_preset.json";
    componentService.downloadFile(json, filename, contentType);
  }

  getHealth()
  {
    const health = healthService.getHealth(this.characterKey);
    return health ? health : "";
  }

  setCharacterKey = (characterKey) =>
  {
    this.characterKey = characterKey;
    this.setViewData(this.getViewData());
  }

  setHealth = (health) =>
  {
    healthService.setHealth(this.characterKey, health);
    this.setViewData(this.getViewData());
  }

  setHealthToDefault = () =>
  {
    healthService.setHealthToDefault(this.characterKey);
    this.setViewData(this.getViewData());
  }

  addChanges = () =>
  {
    const extras = {};
    extras.successMessage = "Data is added to the modification queue!";
    healthService.addToModificationQueue();
    this.onActionResult(extras);
    componentService.callMethod("windowList", "updateActiveWindowList");
  }

  clearData = () =>
  {
    const extras = {};
    extras.successMessage = "All data is cleared!";
    healthService.clearData();
    this.onActionResult(extras);
    this.setViewData(this.getViewData());
  }

  createCharacterHealthList = () =>
  {
    return healthService.getCharacterHealthList();
  }

  getViewData = () =>
  {
    const showHealthField = healthService.hasCharacterKey(this.characterKey);
    const {componentData, characterKey} = this;
    const health = this.getHealth();
    return {componentData, showHealthField, characterKey, health};
  }

  updateViewData = () =>
  {
    this.window.updateViewData();
    this.setViewData(this.getViewData());
  }

  onInputDecimal = (event, methodName) =>
  {
    componentService.onElementDecimalValueChange(event, this, methodName);
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
    this.characterKey = "";
    this.updateViewData();
  }
}

export { HealthEditor };