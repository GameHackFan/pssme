import React, {Component} from 'react';
import ZoomComponent from './ZoomComponent';

import editorService from '../../service/EditorService';
import zoomService from '../../service/ZoomService';
import fileService from '../../service/FileService';


class Zoom extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {zoomValues: {}};
		this.handleChange = this.handleChange.bind(this);
		this.onLoadPresetFileChange = this.onLoadPresetFileChange.bind(this);
		this.onSavePresetClick = this.onSavePresetClick.bind(this);
		this.applyPresetFile = this.applyPresetFile.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState)
	{
		const extras = nextProps.actionExtras;
		
		if(extras && extras.actionSuccessful)
		{
			this.applyPresetFile(nextProps.actionData);
			delete nextProps.actionExtras.actionSuccessful;
		}

		return true;
	}

	handleChange(event)
	{
		const {name, value} = event.target
		
		if(event.target.name === "zoomValue")
		{
			const c = this.state.component;
			zoomService.setComponentZoom(c, value);
			editorService.forceComponentToUpdateByKey("app");
		}
		else
			this.setState({[name]: value});
	}

	onSavePresetClick(event)
	{
		let json = JSON.stringify(
				zoomService.createPresetObject(), null, "\t");
		let contentType = "text/json;charset=utf-8";
		let filename = "zoom_preset.json";
		editorService.downloadFile(json, filename, contentType);
	}

	onLoadPresetFileChange(event)
	{
		const extras = {};
		extras.successCallback = this.props.onActionResult;
		extras.errorCallback = this.props.onActionResult;
		extras.successMessage = "Zoom preset loaded!";
		extras.errorMessage = "Problems loading the preset!";
		extras.file = event.target.files[0];
		fileService.readTextFile(extras);
	}

	applyPresetFile(preset)
	{
		try
		{
			zoomService.applyPresetFile(preset);
			editorService.forceComponentToUpdateByKey("app");
		}
		catch(e)
		{
			console.log(e.message);
			console.log(e);
			const extras = {};
			extras.errorMessage = "Invalid JSON preset file!";
			this.props.onActionResult(extras);
		}
	}

	render()
	{
		const c = this.state.component;

		return (
			<ZoomComponent
				zoomMap={zoomService.getZoomMap()}
				zoomValue={zoomService.getComponentRawZoom(c)}
				component={this.state.component}
				handleChange={this.handleChange}
				requestFile={editorService.requestFile}
				onLoadPresetFileChange={this.onLoadPresetFileChange}
				onSavePresetClick={this.onSavePresetClick}
			/>
		);
	} 
}


export default Zoom;