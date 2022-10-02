import { componentService } from "../../service/ComponentService";
import { zoomService } from "../../service/ZoomService";
import { imageMap } from '../../data/default/ImageMap';


class Header
{
  updateZoom = () =>
  {
    this.zoom = zoomService.getValidZoom("header");
    this.setViewData(this.getViewData());
  }

  getViewData = () =>
  {
    return {zoom: this.zoom, imageMap: imageMap};
  }

  constructor(setViewData)
  {
    componentService.setController("header", this);
    this.setViewData = setViewData;
    this.updateZoom();
  }
}


export { Header };