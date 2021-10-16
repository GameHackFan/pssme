import romService from "./ROMService";
import foodHealMap from "../data/overwrite/FoodHealMap";


class FoodHealService
{
	constructor()
	{
		this.foodHealData = {};
	}

	createFoodHealPreset = () =>
	{
		let p = {};
		p.type = "foodHeal";
		p.data = {};
		Object.keys(this.foodHealData).forEach((k) =>
		{
			p.data[k] = this.foodHealData[k];
		});

		return p;
	}

	applyPresetFile = (presetFile) =>
	{
		let json = JSON.parse(presetFile);

		if(json && json.data && json.type === "foodHeal")
		{
			Object.keys(json.data).forEach((k) =>
			{
				this.foodHealData[k] = json.data[k];
			});
		}
	}

	getFoodHealData = () =>
	{
		this.foodHealData = {};
		Object.keys(foodHealMap).forEach((k) =>
		{
			let {filename, byteIndex} = foodHealMap[k];
			this.foodHealData[k] = romService.getByte(filename, byteIndex);
		});

		return this.foodHealData;
	}

	applyFoodHealData = () =>
	{
		Object.keys(foodHealMap).forEach((k) =>
		{
			let heal = parseInt(this.foodHealData[k]);

			if(!isNaN(heal) && heal > -1 && heal < 256)
			{
				let fh = foodHealMap[k];
				fh = fh ? fh : null;

				if(fh)
				{
					let {filename, byteIndex} = fh;
					romService.setByte(filename, byteIndex, heal);
				}
			}
		});
	}
}


let foodHealService = new FoodHealService();
export default foodHealService;