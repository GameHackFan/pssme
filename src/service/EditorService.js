import componentService from "./ComponentService";


class EditorService
{
	constructor()
	{
		this.componentMap = {};
	}

	getComponentMap = () =>
	{
		return this.componentMap;
	}

	putComponent = (componentKey, component) =>
	{
		this.componentMap[componentKey] = component;
	}

	forceComponentToUpdateByKey = (componentKey) =>
	{
		let c = this.componentMap[componentKey];
		this.forceComponentToUpdate(c);
	}

	forceComponentToUpdate = (component) =>
	{
		if(component)
			component.setState({rerender: component.rerender === true ? false : true});
	}

	requestFile = (event) =>
	{
		let fb = event.target.querySelector("input");

		if(fb)
			fb.click();
	}

	downloadFile = (content, filename, contentType) =>
	{
		let data = content instanceof Blob ? content :
				new Blob([content], {type: contentType});
		let a = document.createElement('a');
		a.download = filename;
		a.href = window.URL.createObjectURL(data)
		a.dataset.downloadurl = [contentType, a.download, a.href].join(':');
		a.click();
	}

	openWindow = (componentKey) =>
	{
		componentService.setWindowActive(componentKey, true);
		let c = this.componentMap["editor"];
		this.forceComponentToUpdate(c);
	}

	toggleWindow = (componentKey, showContent) =>
	{
		let c = this.componentMap[componentKey];

		if(c)
			c.setState({showContent: showContent});
	}

	closeWindow = (componentKey) =>
	{
		componentService.setWindowActive(componentKey, false);
		this.componentMap[componentKey] = null;
		let c = this.componentMap["editor"];
		this.forceComponentToUpdate(c);
	}
}


const editorService = new EditorService;
export default editorService;