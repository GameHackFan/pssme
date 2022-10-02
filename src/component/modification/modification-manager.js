import { componentService } from '../../service/ComponentService';
import { modificationService } from '../../service/ModificationService';


class ModificationManager
{
  setModificationSelected = (modification) =>
  {
    this.modificationSelected = modification;
    this.setViewData(this.getViewData());
  }

  remove = () =>
  {
    const extras = {};

    if(this.modificationSelected)
    {
      extras.successMessage = "Modification is removed!";
      modificationService.remove(this.modificationSelected);
      this.modificationSelected = "";
      this.setViewData(this.getViewData());
    }
    else
      extras.errorMessage = "Select a modification first!";

    this.onActionResult(extras);
  }

  removeAll = () =>
  {
    const extras = {};
    extras.successMessage = "All modifications are removed!";
    modificationService.clearAll();
    this.modificationSelected = "";
    this.onActionResult(extras);
    this.setViewData(this.getViewData());
  }

  getViewData = () =>
  {
    const {componentData, modificationSelected} = this;
    const modificationList = createModificationList();
    return {componentData, modificationSelected, modificationList};
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
    this.modificationSelected = "";
    this.updateViewData();
  }
}


const createModificationList = () =>
{
  return modificationService.getModificationList();
}

export { ModificationManager };