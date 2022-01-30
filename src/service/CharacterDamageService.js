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
				camd[ak] = this.isInvalidROMBytes(cad) ? cad.defaultValue :
						romService.getByte(cad.filename, cad.byteIndex);
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
					{
						if(cad.apply)
						{
							let index = Object.keys(cad.apply)[0];
							let pd = cad.apply[index];
							romService.setBytes(cad.filename, parseInt(index), pd, cad.byteFormat);
						}
						
						[].concat(cad.byteIndex).forEach((byteIndex) =>
						{
							romService.setByte(cad.filename, byteIndex, damage);
						});
					}
				}
			});
		});
	}

	isInvalidROMBytes = (characterDamageData) =>
	{
		if(romService.isROMReady())
		{
			let cad = characterDamageData;
			let checkKeys = cad.check ? Object.keys(cad.check) : ["-9"];
			let c = cad.check ? cad.check[checkKeys[0]] : ["-1"];
			let ci = parseInt(checkKeys[0]);
			let i = romService.indexOfBytes(cad.filename, c, cad.byteFormat, ci);
			return i === ci;
		}

		return true;
	}
}


let characterDamageService = new CharacterDamageService();
export default characterDamageService;