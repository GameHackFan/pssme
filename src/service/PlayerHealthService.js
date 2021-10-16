import romService from "./ROMService";

import playerHealthMap from "../data/overwrite/PlayerHealthMap";


class PlayerHealthService
{
	createPlayerHealthPreset = (playerHealth) =>
	{
		let p = {};
		p.type = "playerHealth";
		p.data = {};
		p.data["playerHealth"] = playerHealth;
		return p;
	}

	applyPresetFile = (presetFile) =>
	{
		let json = JSON.parse(presetFile);

		if(json && json.data && json.type === "playerHealth")
			this.applyPlayerHealth(json.data["playerHealth"]);
	}

	getPlayerHealth = () =>
	{
		let {filename, mainByteIndex} = playerHealthMap;
		return romService.getByte(filename, mainByteIndex);
	}

	applyPlayerHealth = (playerHealth) =>
	{
		let health = parseInt(playerHealth);

		if(!isNaN(health) && health > -1 && health < 256)
		{
			let {filename, byteIndexes} = playerHealthMap;
			byteIndexes.forEach((byteIndex) =>
			{
				romService.setByte(filename, byteIndex, health);
			});
		}
	}
}


let playerHealthService = new PlayerHealthService();
export default playerHealthService;