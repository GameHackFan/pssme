import React, {Component} from 'react';
import PalleteEditorComponent from './PalleteEditorComponent';

import editorService from '../../service/EditorService';
import fileService from "../../service/FileService";
import romService from "../../service/ROMService";
import palleteEditorService from "../../service/PalleteEditorService";


class PalleteEditor extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {};
		this.forceUpdate = this.forceUpdate.bind(this);
		this.getPalleteInfoList = this.getPalleteInfoList.bind(this);
		this.getPallete = this.getPallete.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onReloadPallete = this.onReloadPallete.bind(this);
		this.onApplyPallete = this.onApplyPallete.bind(this);
		this.onLoadPresetFileChange = this.onLoadPresetFileChange.bind(this);
		this.onSavePalletePresetClick = this.onSavePalletePresetClick.bind(this);
		this.onSaveAllPresetClick = this.onSaveAllPresetClick.bind(this);
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
		const {name, value} = event.target;

		if(name.includes("colorId"))
		{
			let p = this.state.pallete.slice();
			let index = name.split("_")[1];
			p[index] = value;
			this.setState({pallete: p});
		}
		else if(name.includes("palleteId"))
		{
			let p = palleteEditorService.getPallete(value);
			this.setState({[name]: value, pallete: p});
		}
		else
			this.setState({[name]: value});
	}

	onReloadPallete(event)
	{
		this.getPallete();
	}

	onApplyPallete(event)
	{
		const {palleteId, pallete} = this.state;
		palleteEditorService.setPallete(palleteId, pallete);
		const extras = {};
		extras.successMessage = "Pallete applied!";
		this.props.onActionResult(extras);
	}

	onLoadPresetFileChange(event)
	{
		const extras = {};
		extras.successCallback = this.props.onActionResult;
		extras.errorCallback = this.props.onActionResult;
		extras.successMessage = "Pallete Editor preset loaded!";
		extras.errorMessage = "Problems loading the preset!";
		extras.file = event.target.files[0];
		fileService.readTextFile(extras);
	}

	onSavePalletePresetClick(event)
	{
		const {palleteId, pallete} = this.state;

		if(palleteId && pallete)
		{
			let preset = palleteEditorService.createPalletePresetFile(
					palleteId, pallete);
			let json = JSON.stringify(preset, null, "\t");
			let contentType = "text/json;charset=utf-8";
			let filename = "pssme_pallete_editor_preset.json";
			editorService.downloadFile(json, filename, contentType);
		}
		else
		{
			const extras = {};
			extras.errorMessage = "You need to select a pallete!";
			this.props.onActionResult(extras);
		}
	}

	onSaveAllPresetClick(event)
	{
		let preset = palleteEditorService.createAllPresetFile();
		let json = JSON.stringify(preset, null, "\t");
		let contentType = "text/json;charset=utf-8";
		let filename = "pssme_pallete_editor_preset.json";
		editorService.downloadFile(json, filename, contentType);
	}

	applyPresetFile(preset)
	{
		try
		{
			palleteEditorService.applyPresetFile(preset);
			this.getPallete();
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

	getPallete()
	{
		const pid = this.state.palleteId;
		let p = palleteEditorService.getPallete(pid);
		this.setState({pallete: p});
		this.forceUpdate();
	}

	forceUpdate()
	{
		editorService.forceComponentToUpdateByKey("palleteEditor");
	}

	getPalleteInfoList()
	{
		const f = this.state.filterPalleteString;
		return palleteEditorService.getPalleteInfoList(f);
	}

	render()
	{
		return (
			<PalleteEditorComponent
				romReady={romService.isROMReady()}
				filterPalleteString={this.state.filterPalleteString}
				palleteInfoList={this.getPalleteInfoList()}
				palleteId={this.state.palleteId}
				pallete={this.state.pallete}
				requestFile={editorService.requestFile}
				handleChange={this.handleChange}
				onReloadPallete={this.onReloadPallete}
				onApplyPallete={this.onApplyPallete}
				onLoadPresetFileChange={this.onLoadPresetFileChange}
				onSavePalletePresetClick={this.onSavePalletePresetClick}
				onSaveAllPresetClick={this.onSaveAllPresetClick}
			/>
		);
	} 
}


export default PalleteEditor;