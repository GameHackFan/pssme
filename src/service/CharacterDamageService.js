import romService from "./ROMService";
import characterDamageMap from "../data/overwrite/CharacterDamageMap";


class CharacterDamageService
{
	constructor()
	{
		this.characterDamageData = {};
	}

	createCharacterDamagePreset = () =>
	{
		let p = {};
		p.type = "characterDamage";
		p.data = {};
		Object.keys(this.characterDamageData).forEach((k) =>
		{
			p.data[k] = this.characterDamageData[k];
		});

		return p;
	}

	applyPresetFile = (presetFile) =>
	{
		let json = JSON.parse(presetFile);

		if(json && json.data && json.type === "characterDamage")
		{
			Object.keys(json.data).forEach((k) =>
			{
				this.characterDamageData[k] = Object.assign(
						this.characterDamageData[k], json.data[k]);
			});
		}
	}

	getCharacterDamageData = () =>
	{
		this.characterDamageData = {};
		Object.keys(characterDamageMap).forEach((ck) =>
		{
			let camd = {}
			let cam = characterDamageMap[ck].damageMap;
			Object.keys(cam).forEach((ak) =>
			{
				let cad = cam[ak];
				camd[ak] = romService.getByte(cad.filename, cad.byteIndex);
			});

			this.characterDamageData[ck] = camd;
		});
		
		return this.characterDamageData;
	}

	applyCharacterDamageData = () =>
	{
		Object.keys(characterDamageMap).forEach((ck) =>
		{
			let camd = this.characterDamageData[ck];
			let cam = characterDamageMap[ck].damageMap;

			Object.keys(camd).forEach((ak) =>
			{
				let damage = parseInt(camd[ak]);

				if(!isNaN(damage) && damage > -1 && damage < 256)
				{
					let cad = cam[ak];
					cad = cad ? cad : null;

					if(cad)
						romService.setByte(cad.filename, cad.byteIndex, damage);
				}
			});
		});
	}
}


let characterDamageService = new CharacterDamageService();
export default characterDamageService;