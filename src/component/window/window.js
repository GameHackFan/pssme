import { componentService } from '../../service/ComponentService';
import { zoomService } from '../../service/ZoomService';


class Window
{
  toggleHintText = () =>
  {
    componentService.toggleHintText(this.key);
    componentService.callMethod(this.key, "updateViewData");
  }

  toggleContent = () =>
  {
    componentService.toggleContent(this.key);
    this.setViewData(this.getViewData());
  }

  closeWindow = () =>
  {
    componentService.closeWindow(this.key);
  }

  onActionResult = (extras) =>
  {
    this.successMessage = extras.successMessage;
    this.errorMessage = extras.errorMessage;
    clearTimeout(this.messageTimeout);
    this.messageTimeout = setTimeout(() => this.clearMessages(), 3500);
    this.setViewData(this.getViewData());

    if(extras.contentCallback)
      extras.contentCallback(extras);
  }

  clearMessages = () =>
  {
    this.successMessage = "";
    this.errorMessage = "";
    this.setViewData(this.getViewData());
  }

  updateZoom = () =>
  {
    this.zoom = zoomService.getValidZoom(this.key);
    this.setViewData(this.getViewData());
  }

  getMessage = () =>
  {
    const message = this.errorMessage ? this.errorMessage : this.successMessage;
    return message ? message : null;
  }

  getViewData = () =>
  {
    const {key, zoom, componentData} = this;
    const message = this.getMessage();
    const showMessage = message ? true : false;
    const hasError = this.errorMessage ? true : false;
    return {key, zoom, componentData, message, showMessage, hasError};
  }

  updateViewData = () =>
  {
    this.setViewData(this.getViewData());
  }

  constructor(key, setViewData)
  {
    this.key = key;
    this.setViewData = setViewData;
    this.componentData = componentService.getComponentData(key);
    this.successMessage = "";
    this.errorMessage = "";
    this.messageTimeout = null;
    this.updateZoom();
  }
}


export { Window };