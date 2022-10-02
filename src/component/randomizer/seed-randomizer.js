import { fileService } from "../../service/FileService";
import { componentService } from "../../service/ComponentService";
import { randomizerService } from "../../service/RandomizerService";


class SeedRandomizer
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
      extras.successMessage = "Randomizer preset loaded!";
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
        randomizerService.applyPreset(extras.actionData);
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

  clearData = () =>
  {
    const extras = {};
    extras.successMessage = "All data is cleared!";
    randomizerService.setDataMapToDefault();
    randomizerService.setCustomRandomProfileToDefault();
    this.onActionResult(extras);
    this.setViewData(this.getViewData());
  }

  savePreset = () =>
  {
    const preset = randomizerService.createRandomizerPreset();
    const json = JSON.stringify(preset, null, "\t");
    const contentType = "text/json;charset=utf-8";
    const filename = "pssme_randomizer_preset.json";
    componentService.downloadFile(json, filename, contentType);
  }

  saveLevelEditorPreset = () =>
  {
    const preset = randomizerService.createLevelEditorPreset();
    const json = JSON.stringify(preset, null, "\t");
    const contentType = "text/json;charset=utf-8";
    const filename = "pssme_level_editor_preset.json";
    componentService.downloadFile(json, filename, contentType);
  }

  addChanges = () =>
  {
    const extras = {};
    extras.successMessage = "Data is added to the modification queue!";
    randomizerService.addToModificationQueue();
    this.onActionResult(extras);
    componentService.callMethod("windowList", "updateActiveWindowList");
  }

  setSeed = (seed) =>
  {
    randomizerService.setSeed(seed);
    this.setViewData(this.getViewData());
  }

  setRandomProfile = (randomProfile) =>
  {
    randomizerService.setRandomProfile(randomProfile);
    this.setViewData(this.getViewData());
  }

  setLevelKey = (levelKey) =>
  {
    this.levelKey = levelKey;
    this.enemyGroupKey = "";
    this.setViewData(this.getViewData());
  }

  setEnemyGroupKey = (enemyGroupKey) =>
  {
    this.enemyGroupKey = enemyGroupKey;
    this.setViewData(this.getViewData());
  }

  setMinimumAmount = (amount, extras) =>
  {
    const setValue = randomizerService.setEnemyGroupMinAmount;
    setValue(this.levelKey, this.enemyGroupKey, extras.field, amount);
    this.setViewData(this.getViewData());
  }

  setMaximumAmount = (amount, extras) =>
  {
    const setValue = randomizerService.setEnemyGroupMaxAmount;
    setValue(this.levelKey, this.enemyGroupKey, extras.field, amount);
    this.setViewData(this.getViewData());
  }

  createRandomProfileList = () =>
  {
    return randomizerService.getUIRandomProfileList();
  }

  createLevelList = () =>
  {
    return randomizerService.getUILevelList();
  }

  getViewData = () =>
  {
    const {componentData, levelKey, enemyGroupKey} = this;
    const rs = randomizerService;
    const seed = rs.getSeed();
    const randomProfile = rs.getRandomProfile();
    const showLevelField = randomProfile === "custom";
    const showGroupField = showLevelField && rs.isValidLevelKey(levelKey);
    const enemyGroup = randomizerService.getUIEnemyGroup(levelKey, enemyGroupKey);
    const enemyGroupList = createEnemyGroupList(levelKey);
    const enemyStrategyList = createEnemyStrategyList(levelKey, enemyGroupKey);
    let showStrategyFields = rs.isValidEnemyGroupKey(levelKey, enemyGroupKey);
    showStrategyFields = showStrategyFields && showGroupField;
    return {
      componentData, enemyGroupList, showLevelField,
      showGroupField, showStrategyFields, seed, randomProfile,
      levelKey, enemyGroupKey, enemyGroup, enemyStrategyList
    };
  }

  updateViewData = () =>
  {
    this.window.updateViewData();
    this.setViewData(this.getViewData());
  }

  onInputDecimal = (event, methodName, extras) =>
  {
    componentService.onElementDecimalValueChange(event, this, methodName, extras);
  }

  onValueChange = (event, methodName, extras) =>
  {
    componentService.onElementValueChange(event, this, methodName, extras);
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
    this.levelKey = "";
    this.groupKey = "";
    this.updateViewData();
  }
}


const createEnemyGroupList = (levelKey) =>
{
  return randomizerService.getUIEnemyGroupList(levelKey);
}

const createEnemyStrategyList = (levelKey, enemyGroupKey) =>
{
  return randomizerService.getUIRandomizerEnemyStrategyList(levelKey, enemyGroupKey);
}

export { SeedRandomizer };