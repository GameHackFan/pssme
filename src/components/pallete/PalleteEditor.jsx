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
		this.state = {colorId: 0, hexMode: true};
		this.forceUpdate = this.forceUpdate.bind(this);
		this.getPalleteInfoList = this.getPalleteInfoList.bind(this);
		this.refreshPallete = this.refreshPallete.bind(this);
		this.getColor32 = this.getColor32.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onColorClick = this.onColorClick.bind(this);
		this.onReloadPallete = this.onReloadPallete.bind(this);
		this.onReloadColorClick = this.onReloadColorClick.bind(this);
		this.onSetColorClick = this.onSetColorClick.bind(this);
		this.onReloadDataClick = this.onReloadDataClick.bind(this);
		this.onLoadPresetFileChange = this.onLoadPresetFileChange.bind(this);
		this.onSavePalletePresetClick = this.onSavePalletePresetClick.bind(this);
		this.onSaveAllPresetClick = this.onSaveAllPresetClick.bind(this);
		this.onAddChangesClick = this.onAddChangesClick.bind(this);
		this.applyPresetFile = this.applyPresetFile.bind(this);
		this.getCustomColorCSSStyle = this.getCustomColorCSSStyle.bind(this);
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
		const {name, value, checked} = event.target;

		if(name === "palleteId")
			this.refreshPallete(value);
		else if(name === "hexMode")
			this.setState({[name]: checked});
		else
			this.setState({[name]: value});
	}

	onColorClick(event)
	{
		let id = event.target.getAttribute("name").split("_")[1];
		this.refreshPallete(this.state.palleteId, id);
	}

	onReloadPallete(event)
	{
		const {palleteId, colorId} = this.state;
		palleteEditorService.resetPallete(palleteId);
		this.refreshPallete();
		const extras = {};
		extras.successMessage = "Pallete reloaded!";
		this.props.onActionResult(extras);
	}

	onReloadColorClick(event)
	{
		const {palleteId, colorId} = this.state;
		const extras = {};
		extras.successMessage = "Color reloaded!";
		palleteEditorService.resetColor(palleteId, colorId);
		this.refreshPallete();
		this.props.onActionResult(extras);
	}

	onSetColorClick(event)
	{
		const {palleteId, colorId, hexColor, red, green, blue} = this.state;
		const extras = {};
		extras.successMessage = "Color applied!";

		if(this.state.hexMode)
			palleteEditorService.setHexColor(palleteId, colorId, hexColor);
		else
		{
			let c = this.getColor32(red, green, blue);
			palleteEditorService.setColor(palleteId, colorId, c);
		}
		
		this.refreshPallete();
		this.props.onActionResult(extras);
	}

	onReloadDataClick(event)
	{
		let extras = {};
		extras.successMessage = "Data reloaded!";
		palleteEditorService.resetPalleteMap();
		this.refreshPallete();
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
			this.refreshPallete();
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

	onAddChangesClick(event)
	{
		let extras = {};
		extras.successMessage = "Data is added to the modification queue!";
		palleteEditorService.addToModificationQueue();
		this.props.onActionResult(extras);
		editorService.forceComponentToUpdateByKey("modification");
	}

	refreshPallete(palleteId, colorId)
	{
		let pid = parseInt(palleteId);
		pid = isNaN(pid) ? parseInt(this.state.palleteId) : pid;
		pid = isNaN(pid) ? -1 : pid;
		let cid = parseInt(colorId);
		cid = isNaN(cid) ? parseInt(this.state.colorId) : cid;
		cid = isNaN(cid) ? -1 : cid;
		let p = palleteEditorService.getPallete(pid);
		let h = p ? p[cid] : "000000";
		h = (h ? h.replace('#', '') : "000000").toUpperCase();
		let c = palleteEditorService.convertHexToColor32(h);
		const s = {hexColor: h, red: c[0], green: c[1], blue: c[2]};
		s.palleteId = pid;
		s.pallete = p;
		s.colorId = cid; 
		this.setState(s);
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

	getColor32(red, green, blue)
	{
		let r = parseInt(red);
		let g = parseInt(green);
		let b = parseInt(blue);
		r = isNaN(r) ? 0 : Math.abs(r) & 255;
		g = isNaN(g) ? 0 : Math.abs(g) & 255;
		b = isNaN(b) ? 0 : Math.abs(b) & 255;
		return [r, g, b];
	}

	getCustomColorCSSStyle()
	{
		const {hexColor, red, green, blue} = this.state;
		let h;

		if(this.state.hexMode)
		{
			let fix = hexColor ? hexColor : "000000";
			h = "#" + fix.replace('#', '').padStart(6, '0');
		}
		else
		{
			let c = this.getColor32(red, green, blue);
			h = "#" + palleteEditorService.convertColor32ToDecimal(c).toString(16);
		}

		return {backgroundColor: h} 
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
				colorId={this.state.colorId}
				hexMode={this.state.hexMode}
				hexColor={this.state.hexColor}
				red={this.state.red}
				green={this.state.green}
				blue={this.state.blue}
				requestFile={editorService.requestFile}
				handleChange={this.handleChange}
				onColorClick={this.onColorClick}
				onReloadPallete={this.onReloadPallete}
				onReloadColorClick={this.onReloadColorClick}
				onSetColorClick={this.onSetColorClick}
				onReloadDataClick={this.onReloadDataClick}
				onLoadPresetFileChange={this.onLoadPresetFileChange}
				onSavePalletePresetClick={this.onSavePalletePresetClick}
				onSaveAllPresetClick={this.onSaveAllPresetClick}
				onAddChangesClick={this.onAddChangesClick}
				getCustomColorCSSStyle={this.getCustomColorCSSStyle}
			/>
		);
	} 
}


export default PalleteEditor;