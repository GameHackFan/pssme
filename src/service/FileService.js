import '../api/jszip.min.js';


class FileService
{
	readTextFile = (extras) =>
	{
		if(extras.file)
		{
			let reader = new FileReader();
			reader.readAsText(extras.file, "UTF-8");
			reader.onload = (event) =>
			{
				this.dispatchSuccess(extras, event.target.result);
			}
			reader.onerror = (event) =>
			{
				this.dispatchError(extras);
			}
		}
	}

	readZipFile = (extras) =>
	{
		let zip = new JSZip();
		const finalExtras = extras;
		let files = {};
		let zipCount = 0;
		let fileCount = 0;
		zip.loadAsync(extras.file).then((rZip) =>
		{
			rZip.forEach((relativePath, file) =>
			{
				zipCount++;
				file.async("array").then((data) =>
				{
					files[relativePath] = data;
					fileCount++;

					if(fileCount >= zipCount)
						this.dispatchSuccess(extras, files);
				}).catch((error) =>
				{
					throw "Error reading file inside the zip!";
				});
			});
		}).catch((error) =>
		{
			this.dispatchError(extras);
		});
	}

	createZipFile = (extras) =>
	{
		let zip = new JSZip();
		Object.keys(extras.fileObject).forEach((file) =>
		{
			zip.file(file, extras.fileObject[file], {binary:true});
		});
		let contentType = {};
		contentType.type = "blob";
		contentType.compression = "DEFLATE";
		contentType.compressionOptions = {level: 9};
		zip.generateAsync(contentType).then((content) =>
		{
			this.dispatchSuccess(extras, content);
		}).catch((error) =>
		{
			this.dispatchError(extras);
		});
	}

	dispatchSuccess = (extras, data) =>
	{
		extras.actionData = data;
		extras.actionSuccessful = true;
		extras.errorMessage = null;

		if(extras.successCallback)
			extras.successCallback(extras);     
	}

	dispatchError = (extras) =>
	{
		extras.actionSuccessful = false;
		extras.successMessage = null;

		if(extras.errorCallback)
			extras.errorCallback(extras);
	}
}


const fileService = new FileService();
export default fileService;