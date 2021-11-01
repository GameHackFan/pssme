import romService from "./ROMService";

import healthMap from "../data/overwrite/HealthMap";


class HealthService
{
	constructor()
	{
		this.healthData = {};
	}

	createHealthPreset = (playerHealth) =>
	{
		let p = {};
		p.type = "health";
		p.data = {};
		Object.keys(this.healthData).forEach((ck) =>
		{
			p.data[ck] = this.healthData[ck];
		});

		return p;
	}

	applyPresetFile = (presetFile) =>
	{
		let json = JSON.parse(presetFile);

		if(json && json.data && json.type === "health")
		{
			Object.keys(json.data).forEach((ck) => 
			{
				this.healthData[ck] = json.data[ck];
			});
		}
	}

	getHealthData = () =>
	{
		this.healthData = {};
		Object.keys(healthMap).forEach((ck) =>
		{
			let {filename, byteIndexes} = healthMap[ck];
			this.healthData[ck] = romService.getByte(filename, byteIndexes[0]);
		});

		return this.healthData;
	}

	applyHealthData = () =>
	{
		Object.keys(this.healthData).forEach((ck) =>
		{
			let h = parseInt(this.healthData[ck]);
			let hd = healthMap[ck];

			if(hd && !isNaN(h) && h > -1 && h < 256)
			{
				hd.byteIndexes.forEach((byteIndex) =>
				{
					romService.setByte(hd.filename, byteIndex, h);
				});
			}		
		});
	}
}


let healthService = new HealthService();
export default healthService;