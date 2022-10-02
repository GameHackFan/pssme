import { palleteEditorService } from "../../service/PalleteEditorService";
import { componentService } from "../../service/ComponentService";
import { romService } from "../../service/ROMService";
import { fileService } from "../../service/FileService";


class PalleteEditor
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
      extras.successMessage = "Pallete Editor preset loaded!";
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
        palleteEditorService.applyPreset(extras.actionData);
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

  saveAllPresetFile = () =>
  {
    const preset = palleteEditorService.createAllPreset();
    const json = JSON.stringify(preset, null, "\t");
    const contentType = "text/json;charset=utf-8";
    const filename = "pssme_pallete_editor_preset.json";
    componentService.downloadFile(json, filename, contentType);
  }

  savePalletePresetFile = () =>
  {
    const pallete = palleteEditorService.getPallete(this.palleteId);

    if(pallete)
    {
      const preset = palleteEditorService.createPalletePreset(this.palleteId, pallete);
      const json = JSON.stringify(preset, null, "\t");
      const contentType = "text/json;charset=utf-8";
      const filename = "pssme_pallete_editor_preset.json";
      componentService.downloadFile(json, filename, contentType);
    }
    else
    {
      const extras = {};
      extras.errorMessage = "You need to select a pallete!";
      this.onActionResult(extras);
    }
  }

  setColor = () =>
  {
    const {palleteId, colorId, hexColor, red, green, blue} = this;
    const extras = {};
    extras.successMessage = "Color applied!";

    if(!this.hexMode)
    {
      const c = palleteEditorService.getColor32(red, green, blue);
      palleteEditorService.setColor(palleteId, colorId, c);
    }
    else
      palleteEditorService.setHexColor(palleteId, colorId, hexColor);
    
    this.setViewData(this.getViewData());
    this.onActionResult(extras);
  }

  reloadPallete = () =>
  {
    const extras = {};
    extras.successMessage = "Pallete reloaded!";
    palleteEditorService.resetPallete(this.palleteId);
    this.setViewData(this.getViewData());
    this.onActionResult(extras);
  }

  reloadColor = () =>
  {
    const {palleteId, colorId} = this;
    const extras = {};
    extras.successMessage = "Color reloaded!";
    palleteEditorService.resetColor(palleteId, colorId);
    this.refreshColorFields();
    this.setViewData(this.getViewData());
    this.onActionResult(extras);
  }

  reloadData = () =>
  {
    const extras = {};
    extras.successMessage = "Data reloaded!";
    palleteEditorService.resetPalleteMap();
    this.setViewData(this.getViewData());
    this.onActionResult(extras);
  }

  addChanges = () =>
  {
    const extras = {};
    extras.successMessage = "Data is added to the modification queue!";
    palleteEditorService.addToModificationQueue();
    this.onActionResult(extras);
    componentService.callMethod("windowList", "updateActiveWindowList");
  }

  setFilterPalleteString = (filterPalleteString) =>
  {
    this.filterPalleteString = filterPalleteString;
    this.setViewData(this.getViewData());
  }

  setPalleteId = (palleteId) =>
  {
    const cId = parseInt(this.colorId);
    this.colorId = (!isNaN(cId) && cId > -1 && cId < 16) ? this.colorId : "0";
    this.palleteId = palleteId;
    this.refreshColorFields();
    this.setViewData(this.getViewData());
  }

  setColorId = (colorId) =>
  {
    this.colorId = colorId.toString();
    this.refreshColorFields();
    this.setViewData(this.getViewData());
  }

  setHexColor = (hexColor) =>
  {
    this.hexColor = hexColor;
    this.setViewData(this.getViewData());
  }

  setRed = (red) =>
  {
    this.red = red;
    this.setViewData(this.getViewData());
  }

  setGreen = (green) =>
  {
    this.green = green;
    this.setViewData(this.getViewData());
  }

  setBlue = (blue) =>
  {
    this.blue = blue;
    this.setViewData(this.getViewData());
  }

  toggleHexMode = () =>
  {
    this.hexMode = !this.hexMode;
    this.setViewData(this.getViewData());
  }

  getViewData = () =>
  {
    const {componentData, filterPalleteString, palleteId,
        colorId, hexMode, hexColor, red, green, blue} = this;
    const romReady = romService.isROMReady();
    const palleteInfoList = createFilteredPalleteInfoList(filterPalleteString, palleteId);
    const selectedPalleteInfo = palleteEditorService.getUIPalleteInfo(palleteId);
    const inputColor = getInputColor(hexMode, hexColor, red, green, blue);
    const selectedPallete = getPallete(palleteId);
    const showColorEdit = romReady && selectedPallete.length > 0;
    return {
      componentData, romReady, palleteInfoList, palleteId,
      filterPalleteString, colorId, showColorEdit, inputColor,
      selectedPallete, selectedPalleteInfo, hexMode, hexColor,
      red, green, blue
    };
  }

  refreshColorFields = () =>
  {
    const p = getPallete(this.palleteId);
    let cid = parseInt(this.colorId);
    cid = isNaN(cid) ? -1 : cid;
    let h = p ? p[cid] : "000000";
    h = (h ? h.replace('#', '') : "000000").toUpperCase();
    const c = palleteEditorService.convertHexToColor32(h);
    this.hexColor = h;
    this.red = c[0].toString();
    this.green = c[1].toString();
    this.blue = c[2].toString();
  }

  updateViewData = () =>
  {
    this.window.updateViewData();
    this.refreshColorFields();
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
    this.filterPalleteString = "";
    this.palleteId = "";
    this.colorId = "";
    this.hexMode = true;
    this.hexColor = "";
    this.red = "";
    this.green = "";
    this.blue = "";
    this.updateViewData();
  }
}


const getPallete = (palleteId) =>
{
  let pid = parseInt(palleteId);
  pid = isNaN(pid) ? -1 : pid;
  return palleteEditorService.getPallete(pid);
}

const getInputColor = (hexMode, hexColor, red, green, blue) =>
{
  if(hexMode)
  {
    const fix = hexColor ? hexColor : "000000";
    return fix.replace('#', '').padStart(6, '0');
  }
  else
  {
    const c = palleteEditorService.getColor32(red, green, blue);
    const dec = palleteEditorService.convertColor32ToDecimal(c);
    return dec.toString(16).padStart(6, '0');
  }
}

const createFilteredPalleteInfoList = (filter, palleteId) =>
{
  return palleteEditorService.getUIFilteredPalleteInfoList(filter, palleteId);
}

export { PalleteEditor };