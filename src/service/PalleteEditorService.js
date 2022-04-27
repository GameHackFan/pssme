import modificationService from "./ModificationService";
import romService from "./ROMService";
import palleteData from "../data/pallete/PalleteData";


class PalleteEditorService
{
	constructor()
	{
		this.palleteInfoList = this.createPalleteInfoList();
		this.filename = "bpsm945a.u45";
		this.palleteMap = {};
		this.editedPallete = new Set();
	}

	addToModificationQueue = () =>
	{
		modificationService.add(151,
				"palleteEditor", this.applyPalleteMap);
	}

	applyPalleteMap = () =>
	{
		let edited = this.editedPallete ? this.editedPallete : new Set();

		Object.keys(this.palleteMap).forEach((key) =>
		{
			let pid = parseInt(key);
			pid = isNaN(pid) ? -1 : pid;

			if(edited.has(key.toString()))
				this.applyPallete(pid, this.palleteMap[key]);
		});
	}

	setColor = (palleteId, colorId, color32) =>
	{
		if(color32 && color32.length > 2)
		{
			let h = this.convertColor32ToDecimal(color32).toString(16);
			this.setHexColor(palleteId, colorId, h);
		}
	}

	setHexColor = (palleteId, colorId, hexColor) =>
	{
		let p = this.palleteMap[palleteId.toString()];
		let h = hexColor ? hexColor.replace('#', '').toUpperCase() : null;

		if(p && h && !isNaN(parseInt(h, 16)))
		{
			p[colorId] = "#" + h.padStart(6, '0');
			this.editedPallete.add(palleteId.toString());
		}
	}

	getPallete = (palleteId) =>
	{
		if(romService.romReady && (palleteId > -1 && palleteId < palleteData.amount))
		{
			if((this.palleteMap[palleteId.toString()] ? false : true))
				return this.resetPallete(palleteId);
			else
				return this.palleteMap[palleteId.toString()];
		}

		return null;
	}

	resetPallete = (palleteId) =>
	{
		let key = palleteId.toString();
		let byteIndex = palleteData.startAddress + (palleteId * 32);
		let bytes = romService.getBytes(this.filename, byteIndex, 32);
		let pallete = this.convertBytesToPallete(bytes);
		this.palleteMap[key] = pallete;
		this.editedPallete.delete(key);
		return pallete;
	}

	resetColor = (palleteId, colorId) =>
	{
		if(palleteId > -1 && palleteId < palleteData.amount &&
				colorId > -1 && colorId < 16)
		{
			let op = this.palleteMap[palleteId.toString()];
			let p = this.resetPallete(palleteId, true);
			op[colorId] = p[colorId].toUpperCase();
			this.palleteMap[palleteId.toString()] = op;
		}
	}

	resetPalleteMap = () =>
	{
		this.palleteMap = {};
		this.editedPallete = new Set();
	}

	applyPallete = (palleteId, pallete) =>
	{
		if(palleteId > -1 && palleteId < palleteData.amount)
		{
			let byteIndex = palleteData.startAddress + (palleteId * 32);
			let bytes = this.convertPalleteToBytes(pallete);
			romService.setBytes(this.filename, byteIndex, bytes);
		}
	}

	createPalletePresetFile = (palleteId, pallete) =>
	{
		let preset = {};
		preset.type = "palleteEditor";
		preset.data = {[palleteId]: pallete.slice()};
		return preset;
	}

	createAllPresetFile = () =>
	{
		let preset = {};
		preset.type = "palleteEditor";
		preset.data = {};

		for(let i = 0; i < palleteData.amount; i++)
			preset.data[i] = this.getPallete(i);

		return preset;
	}

	applyPresetFile = (presetFile) =>
	{
		let json = JSON.parse(presetFile);

		if(json && json.data && json.type === "palleteEditor")
		{
			let index;

			Object.keys(json.data).forEach((key) =>
			{
				this.palleteMap[key.toString()] = json.data[key];
				this.editedPallete.add(key.toString());
			});
		}
	}

	getPalleteInfoList = (filter) =>
	{
		if(filter)
		{
			const filterLower = filter.toLowerCase();
			const pil = this.palleteInfoList;
			const filtered = {};
			const indexOrDecimal = parseInt(filter, 10);
			const fromHex = parseInt(filter, 16);
			let address;

			for(let i = 0; i < pil.length; i++)
			{
				address = palleteData.startAddress + (i * 32);

				if(pil[i].originalUsage.toLowerCase().includes(filterLower) ||
						pil[i].pssmeUsage.toLowerCase().includes(filterLower) ||
						i == indexOrDecimal || address == fromHex || address == indexOrDecimal)
				{
					filtered[i] = pil[i];
				}
			}

			return filtered;
		}

		return this.palleteInfoList;
	}

	createPalleteInfoList = () =>
	{
		const info = [];
		let address;
		let current;

		for(let i = 0; i < palleteData.amount; i++)
		{
			address = palleteData.startAddress + (32 * i);
			current = palleteData.data[address];
			info.push(current ? current : palleteData.data["unknown"]);
		}

		return info;
	}

	convertBytesToPallete = (bytes) =>
	{
		let pallete = [];
		let decimal, color;

		for(let i = 0; i < bytes.length; i += 2)
		{
			decimal = (bytes[i + 1] << 8) | bytes[i];
			color = this.convertDecimalToColor16(decimal);
			color = this.convertColor16ToColor32(color);
			decimal = this.convertColor32ToDecimal(color);
			var hex = decimal.toString(16).padStart(6, '0');
			pallete.push("#" + hex.toUpperCase());
		}

		return pallete;
	}

	convertPalleteToBytes = (pallete) =>
	{
		let bytes = [];
		let decimal, color;

		for(let i = 0; i < pallete.length; i++)
		{
			color = this.convertHexToColor32(pallete[i]);
			color = this.convertColor32ToColor16(color);
			decimal = this.convertColor16ToDecimal(color);
			bytes.push(decimal & 255);
			bytes.push((decimal >> 8) & 255);
		}

		return bytes;
	}

	convertHexToColor32 = (hex) =>
	{
		let h = hex ? hex : "";
		let decimal = parseInt(h.replace("#", ""), 16);
		return this.convertDecimalToColor32(decimal);
	}

	convertDecimalToColor32 = (d) =>
	{
		return [(d >> 16) & 255, (d >> 8) & 255, d & 255];
	}

	convertColor16ToDecimal = (color) =>
	{
		return (parseInt(color[1]) << 10) |
				(parseInt(color[0]) << 5) |
				parseInt(color[2]);
	}

	convertColor32ToDecimal = (color) =>
	{
		return parseInt(color[0] << 16, 10) |
				parseInt(color[1] << 8, 10) |
				parseInt(color[2], 10);
	}

	convertDecimalToColor16 = (d) =>
	{
		return [(d >> 5) & 31, (d >> 10) & 31, d & 31];
	}

	convertColor16ToColor32 = (color) =>
	{
		return color.map((v) => Math.round(v * 8.225806));
	}

	convertColor32ToColor16 = (color) =>
	{
		return color.map((v) => Math.round(v / 8.225806));
	}
}


const palleteEditorService = new PalleteEditorService();
export default palleteEditorService;