import { componentService } from '../../service/ComponentService';
import { zoomService } from '../../service/ZoomService';


class WindowList
{
  updateActiveWindowList = () =>
  {
    const nawl = [];
    componentService.getKeys().forEach((key) =>
    {
      if(componentService.isComponentActive(key))
      {
        nawl.unshift(componentService.getComponentData(key));
        componentService.callMethod(key, "updateViewData");
      }
    });
    this.activeWindowList = nawl;
    this.setViewData(this.getViewData());
  }

  updateZoom = () =>
  {
    this.zoom = zoomService.getValidZoom("windowList");
    this.setViewData(this.getViewData());
  }

  getViewData = () =>
  {
    return {zoom: this.zoom, activeWindowList: this.activeWindowList};
  }

  constructor(setViewData)
  {
    componentService.setController("windowList", this);
    this.setViewData = setViewData;
    this.updateZoom();
    this.updateActiveWindowList();
  }
}


export { WindowList };