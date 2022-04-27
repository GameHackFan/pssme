import React, {Component} from 'react';
import PatchComponent from './PatchComponent';

import patchMap from "../../data/patch/PatchMap";
import editorService from "../../service/EditorService";
import fileService from "../../service/FileService";
import patchService from "../../service/PatchService";


class Patch extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {};
		this.handleChange = this.handleChange.bind(this);
		this.onAddPatchClick = this.onAddPatchClick.bind(this);
		this.onAddPatchFileChange = this.onAddPatchFileChange.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState)
	{
		const extras = nextProps.actionExtras;

		if(extras && extras.actionSuccessful)
		{
			patchService.addPatchFromFile(nextProps.actionData);
			delete nextProps.actionExtras.actionSuccessful;
		}

		return true;
	}

	handleChange(event)
	{
		const {name, value} = event.target;
		this.setState({[name]: value});
	}

	onAddPatchClick(event)
	{
		const extras = {};

		if(this.state.patchKey)
		{
			extras.successMessage = "Patch applied!";
			patchService.addToModificationQueue(this.state.patchKey);
			editorService.forceComponentToUpdateByKey("modification");
		}
		else
			extras.errorMessage = "Select a patch!";

		this.props.onActionResult(extras);
	}

	onAddPatchFileChange(event)
	{
		const extras = {};
		extras.successCallback = this.props.onActionResult;
		extras.errorCallback = this.props.onActionResult;
		extras.successMessage = "Patch added to the modification queue!";
		extras.errorMessage = "Problems applying the patch!";
		extras.file = event.target.files[0];
		fileService.readTextFile(extras);
	}

	render()
	{
		return (
			<PatchComponent
				patchMap={patchMap}
				patchKey={this.state.patchKey}
				handleChange={this.handleChange}
				requestFile={editorService.requestFile}
				onAddPatchClick={this.onAddPatchClick}
				onAddPatchFileChange={this.onAddPatchFileChange}
			/>
		);
	}
}


export default Patch;