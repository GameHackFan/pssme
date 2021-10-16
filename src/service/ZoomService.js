import zoomData from "../data/zoom/ZoomData";


class ZoomService
{
	constructor()
	{
		this.zoomMap = zoomData;
	}

	createPresetObject = () =>
	{
		let p = {};
		p.type = "zoom";
		p.data = {};
		Object.keys(this.zoomMap).forEach((e) =>
		{
			let z = this.zoomMap[e];
			p.data[e] = z.zoom;
		});
		return p;
	}

	applyPresetFile = (presetFile) =>
	{
		let json = JSON.parse(presetFile);

		if(json && json.data && json.type === "zoom")
		{
			Object.keys(json.data).forEach((e) =>
			{
				let value = json.data[e];

				if(!isNaN(value))
					this.zoomMap[e].zoom = value;
			});
		}
	}

	getZoomMap = () =>
	{
		return this.zoomMap;
	}

	setComponentZoom = (componentKey, zoom) =>
	{
		this.zoomMap[componentKey].zoom = zoom;
	}

	getComponentZoom = (componentKey) =>
	{
		let z = this.zoomMap[componentKey];
		let v = z ? parseFloat(z.zoom) : 1;
		return v >= 1 ? v : 1;
	}

	getComponentRawZoom = (componentKey) =>
	{
		let z = this.zoomMap[componentKey];
		let v = z ? z.zoom : "";
		return v ? v : "";
	}
}


let zoomService = new ZoomService();
export default zoomService;