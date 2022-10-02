import { characterDamageService } from "../../service/CharacterDamageService";
import { componentService } from "../../service/ComponentService";
import { fileService } from "../../service/FileService";


class DamageEditor
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
        characterDamageService.applyPreset(extras.actionData);
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
    const po = characterDamageService.createPreset();
    const json = JSON.stringify(po, null, "\t");
    const contentType = "text/json;charset=utf-8";
    const filename = "pssme_character_damage_preset.json";
    componentService.downloadFile(json, filename, contentType);
  }

  getDamage()
  {
    const {characterKey, attackKey} = this;
    const v1 = characterDamageService.hasCharacterKey(characterKey);
    const v2 = characterDamageService.hasAttackKey(characterKey, attackKey);

    if(v1 && v2)
    {
      const damage = characterDamageService.getDamage(characterKey, attackKey);
      return damage ? damage : "";
    }

    return "";
  }

  setCharacterKey = (characterKey) =>
  {
    this.characterKey = characterKey;
    this.attackKey = "";
    this.setViewData(this.getViewData());
  }

  setAttackKey = (attackKey) =>
  {
    this.attackKey = attackKey;
    this.setViewData(this.getViewData());
  }

  setDamage = (damage) =>
  {
    const {characterKey, attackKey} = this;
    characterDamageService.setDamage(characterKey, attackKey, damage);
    this.setViewData(this.getViewData());
  }

  setDamageToDefault = () =>
  {
    const {characterKey, attackKey} = this;
    characterDamageService.setDamageToDefault(characterKey, attackKey);
    this.setViewData(this.getViewData());
  }
  
  addChanges = () =>
  {
    const extras = {};
    extras.successMessage = "Data is added to the modification queue!";
    characterDamageService.addToModificationQueue();
    this.onActionResult(extras);
    componentService.callMethod("windowList", "updateActiveWindowList");
  }

  clearData = () =>
  {
    const extras = {};
    extras.successMessage = "All data is cleared!";
    characterDamageService.clearData();
    this.onActionResult(extras);
    this.setViewData(this.getViewData());
  }

  createCharacterDataList = () =>
  {
    return characterDamageService.getUICharacterDataList();
  }

  getViewData = () =>
  {
    const {componentData, characterKey, attackKey} = this;
    const cds = characterDamageService;
    const showAttackField = cds.hasCharacterKey(characterKey);
    const showDamageField = cds.hasAttackKey(characterKey, attackKey);
    const attackDataList = createAttackDataList(characterKey);
    const damage = this.getDamage();

    return {
      componentData, attackDataList, characterKey, attackKey,
      damage, showAttackField, showDamageField
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

  onInputDamage = (event, methodName) =>
  {
    componentService.onElementDecimalValueChange(event, this, methodName);
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
    this.attackDataList = [];
    this.characterKey = "";
    this.attackKey = "";
    this.updateViewData();
  }
}

const createAttackDataList = (characterKey) =>
{
  return characterDamageService.getUIAttackDataList(characterKey);
}

export { DamageEditor };