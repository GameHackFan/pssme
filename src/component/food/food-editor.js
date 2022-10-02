import { componentService } from "../../service/ComponentService";
import { foodHealService } from "../../service/FoodHealService";
import { fileService } from "../../service/FileService";


class FoodEditor
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
      extras.successMessage = "Food Heal preset loaded!";
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
        foodHealService.applyPreset(extras.actionData);
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
    const preset = foodHealService.createPreset();
    const json = JSON.stringify(preset, null, "\t");
    const contentType = "text/json;charset=utf-8";
    const filename = "pssme_food_editor_preset.json";
    componentService.downloadFile(json, filename, contentType);
  }

  getFoodHeal()
  {
    const heal = foodHealService.getFoodHeal(this.foodKey);
    return heal ? heal : "";
  }

  setFoodKey = (foodKey) =>
  {
    this.foodKey = foodKey;
    this.setViewData(this.getViewData());
  }

  setFoodHeal = (heal) =>
  {
    foodHealService.setFoodHeal(this.foodKey, heal);
    this.setViewData(this.getViewData());
  }

  setFoodHealToDefault = () =>
  {
    foodHealService.setFoodHealToDefault(this.foodKey);
    this.setViewData(this.getViewData());
  }

  addChanges = () =>
  {
    const extras = {};
    extras.successMessage = "Data is added to the modification queue!";
    foodHealService.addToModificationQueue();
    this.onActionResult(extras);
    componentService.callMethod("windowList", "updateActiveWindowList");
  }

  clearData = () =>
  {
    const extras = {};
    extras.successMessage = "All data is cleared!";
    foodHealService.clearData();
    this.onActionResult(extras);
    this.setViewData(this.getViewData());
  }

  createFoodHealList = () =>
  {
    return foodHealService.getFoodHealList();
  }

  getViewData = () =>
  {
    const showHealField = foodHealService.hasCharacterKey(this.foodKey);
    const {componentData, foodKey} = this;
    const foodHeal = this.getFoodHeal();
    return {componentData, showHealField, foodKey, foodHeal};
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
    this.foodKey = "";
    this.updateViewData();
  }
}

export { FoodEditor };