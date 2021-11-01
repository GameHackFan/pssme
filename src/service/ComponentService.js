class ComponentService
{
	constructor()
	{
		this.infoMap = this.createInfoMap();
	}

	getInfoMap = () =>
	{
		return this.infoMap;
	}

	isActiveWindowContent = (componentKey) =>
	{
		let i = this.infoMap[componentKey];
		return i && i.type === "windowContent" && i.active;
	}

	setWindowActive = (componentKey, active) =>
	{
		let ci = this.infoMap[componentKey];
		
		if(ci)
			ci.active = active;
	}

	createInfoMap = () =>
	{
		let im = {};
		im.manager = this.createComponentInfo(
				"windowContent", "Editor Manager", true, false);
		im.zoom = this.createComponentInfo(
				"windowContent", "Component Zoom", false, true);
		im.randomizer = this.createComponentInfo(
				"windowContent", "Seed Randomizer", false, true);
		im.patch = this.createComponentInfo(
				"windowContent", "Patch Manager", false, true);
		im.health = this.createComponentInfo(
				"windowContent", "Character Health Editor", false, true);
		im.foodHeal = this.createComponentInfo(
				"windowContent", "Food Heal Editor", false, true);
		im.levelEditor = this.createComponentInfo(
				"windowContent", "Level Editor", false, true);
		im.palleteEditor = this.createComponentInfo(
				"windowContent", "Color Pallete Editor", false, true);
		im.characterDamage = this.createComponentInfo(
				"windowContent", "Character Damage Editor", false, true);
		return im;
	}

	createComponentInfo = (type, title, active, canClose) =>
	{
		let ci = {}
		ci.type = type;
		ci.title = title;
		ci.active = active;
		ci.canClose = canClose;
		return ci;
	}
}


const componentService = new ComponentService();
export default componentService;

