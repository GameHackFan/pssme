class ROMService
{
	constructor()
	{
		this.rom = null;
		this.generatedROM = null;
		this.romReady = false;
	}

	applyBuildPatch = (patch) =>
	{
		let fileBytes = this.generatedROM[patch.filename];

		if(fileBytes)
		{
			let buildBytes = new Array();
			let copyStart = patch.buildStart;
			let copyEnd;

			Object.keys(patch.data).forEach((dataKey) => 
			{
				let replaceIndexes = dataKey.split("_");
				copyEnd = parseInt(replaceIndexes[0]);
				buildBytes = buildBytes.concat(fileBytes.slice(copyStart, copyEnd));
				copyStart = parseInt(replaceIndexes[1]) + 1;
				let enemyMap = patch.data[dataKey];

				Object.keys(enemyMap).forEach((enemyId) =>
				{
					let bytes = enemyMap[enemyId]
					let fbs = this.getBytesAsDecimal(bytes, patch.byteFormat);
					buildBytes = buildBytes.concat(fbs);
				});
			});

			buildBytes = buildBytes.concat(fileBytes.slice(copyStart, patch.buildEnd));
			let newFile = fileBytes.slice(0, patch.buildStart);
			newFile = newFile.concat(buildBytes);
      
			while(newFile.length <= patch.buildEnd)
				newFile.push(0);

			newFile = newFile.concat(fileBytes.slice(newFile.length, fileBytes.length));
			this.generatedROM[patch.filename] = newFile;
		}
	}

	applyOverwritePatch = (patch) =>
	{
		let fileBytes = this.generatedROM[patch.filename];

		if(fileBytes)
		{
			let isHex = patch.byteFormat === "hex";

			Object.keys(patch.data).forEach((dataKey) => 
			{
				let index = parseInt(dataKey);
				let nbs = patch.data[dataKey];

				for(let i = 0; i < nbs.length; i++)
					fileBytes[index + i] = isHex ? parseInt(nbs[i], 16) : nbs[i];
      });
    }
  }

  applyPatch = (patch) =>
  {
		if(patch.type === "build")
			this.applyBuildPatch(patch);
		else if(patch.type === "overwrite")
			this.applyOverwritePatch(patch);
  }

	applyPatches = (patches) =>
	{
		Object.keys(patches).forEach((field) =>
		{
			this.applyPatch(patches[field]);
		});
	}

	convertHexArrayToByteArray = (hexArray) =>
	{
		let byteArray = new Array();

		for(let i = 0; i < hexArray.length; i++)
			byteArray.push(parseInt(hexArray[i], 16));

		return byteArray;
  }

	convertNumberToROMBytes = (number, byteAmount) =>
	{
		let bytes = new Array();
		let hex = (number >>> 0).toString(16);

		if(number > -1)
		{
			hex = "0".repeat((2 * byteAmount) - hex.length) + hex;
      
			for(let i = 0; i < byteAmount; i++)
				bytes[i] = hex.slice(i * 2, (i + 1) * 2);
      
			bytes.reverse();
		}
		else
		{
			let startIndex = hex.length - (byteAmount * 2);
			let hexChars = hex.substring(startIndex, hex.length);

			for(let i = 0; i < byteAmount; i++)
			{
				let index = i * 2;
				bytes[i] = hexChars[index] + hexChars[index + 1];
			}
		}

		return bytes;
	}

	convertStringToROMBytes = (text) =>
	{
		let bytes = [];

		for(let i = 0; i < text.length - 1; i += 2)
		{
			bytes.push(text.charCodeAt(i + 1).toString(16));
			bytes.push(text.charCodeAt(i).toString(16));
		}

		return bytes;
	}

	cloneROM = () =>
	{
		this.generatedROM = {};
		Object.keys(this.rom).forEach((e) =>
		{
			this.generatedROM[e] = this.rom[e].slice();
		});
		this.checkROM();

		if(!this.romReady)
		{
			this.generatedROM = null;
			let m = "The ROM loaded is invalid! Load the Original ROM of the Game!";
			throw new Error(m);
		}
  }
  
	setROM = (rom) =>
	{
		this.rom = rom;
	}

	getGeneratedROM = () =>
	{
		return this.generatedROM;
	}

	getBytesAsDecimal = (bytes, byteFormat) =>
	{
		return byteFormat === "hex" ?
				this.convertHexArrayToByteArray(bytes) : bytes;
	}

	setByte = (filename, byteIndex, value) =>
	{
		let fileBytes = this.generatedROM[filename];

		if(fileBytes && !isNaN(value) && value > -1 && value < 256)
			fileBytes[byteIndex] = value;
	}

	setHexByte = (filename, byteIndex, value) =>
	{
		let fix = parseInt(value, 16);
		this.setByte(byteIndex, fix);
	}

	setBytes = (filename, byteIndex, bytes) =>
	{
		let fileBytes = this.generatedROM[filename];
		bytes.forEach((byte, index) => fileBytes[byteIndex + index] = byte);
	}

	getByte = (filename, byteIndex) =>
	{
		return this.generatedROM[filename][byteIndex];
	}

	getBytes = (filename, byteIndex, amount) =>
	{
		return this.generatedROM[filename].slice(
				byteIndex, byteIndex + amount);
	}

	indexOfBytes = (filename, bytes, byteFormat, startIndex) =>
	{
		let fileBytes = this.generatedROM[filename];

		if(fileBytes)
		{
			let fbs = this.getBytesAsDecimal(bytes, byteFormat);
			let checkBytes = (element, index, romBytes) =>
			{
				for(let i = 0; i < fbs.length; i++)
				{
					if(fbs[i] !== romBytes[index + i])
						return false;
				}
        
				return true;
			};
			return fileBytes.findIndex(checkBytes, startIndex);
		}

		return -1;
	}

	checkROM = () =>
	{
		let filename = "bpsm945a.u45";
		let mainFile = this.generatedROM[filename];

		if(mainFile && mainFile.length === 524288)
		{
			let bytesToCheck = this.getBytesToCheck();
			let fileBytes = this.getBytes(filename, 215286, 40);
			let i;

			for(i = 0; i < fileBytes.length; i++)
			{
				if(fileBytes[i] != parseInt(bytesToCheck[i], 16))
				{
					this.romReady = false;
					return;
				}
			}

			this.romReady = true;
			return true;
		}

		this.romReady = false;
	}

	isROMReady = () =>
	{
		return this.romReady;
	}

	getBytesToCheck = () =>
	{
		return [
			"00", "00", "03", "00", "0E", "02", "00", "00",
			"D2", "15", "49", "46", "41", "4E", "20", "4C",
			"4F", "52", "4E", "55", "20", "44", "4C", "43",
			"41", "45", "00", "52", "18", "00", "70", "00",
			"30", "04", "B8", "01", "FF", "FF", "00", "00"
		];
	}
}


let romService = new ROMService();
export default romService;