import React, {Component} from 'react';
import CharacterDamageComponent from './CharacterDamageComponent';

import fileService from '../../service/FileService';
import editorService from '../../service/EditorService';
import characterDamageService from '../../service/CharacterDamageService';

import characterDamageMap from '../../data/overwrite/CharacterDamageMap';


class CharacterDamage extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {characterDamageData: {}};
		this.handleChange = this.handleChange.bind(this);
		this.onDefaultValueClick = this.onDefaultValueClick.bind(this);
		this.onReloadDataClick = this.onReloadDataClick.bind(this);
		this.onLoadPresetFileChange = this.onLoadPresetFileChange.bind(this);
		this.applyPresetFile = this.applyPresetFile.bind(this);
		this.onSavePresetClick = this.onSavePresetClick.bind(this);
		this.onAddChangesClick = this.onAddChangesClick.bind(this);
		this.getDamage = this.getDamage.bind(this);
	}

	componentDidMount()
	{
		this.setState({characterDamageData:
				characterDamageService.getCharacterDamageData()});
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
		
		if(event.target.name === "damage")
		{
			const {characterKey, attackKey} = this.state;
			let cdd = this.state.characterDamageData;
			cdd[characterKey][attackKey] = value;
			this.setState({characterDamageData: cdd});
		}
		else if(event.target.name === "characterKey")
			this.setState({[name]: value, attackKey: null});
		else
			this.setState({[name]: value});
	}

	onReloadDataClick(event)
	{
		const extras = {};

		try
		{
			this.setState({characterDamageData:
					characterDamageService.getCharacterDamageData()});
			extras.successMessage = "Data reloaded!";
		}
		catch(e)
		{
			console.log(e.message);
			console.log(e);
			extras.errorMessage = "Problems reloading the data!";
		} 
		
		this.props.onActionResult(extras);
	}

	onLoadPresetFileChange(event)
	{
		const extras = {};
		extras.successCallback = this.props.onActionResult;
		extras.errorCallback = this.props.onActionResult;
		extras.successMessage = "Character Damage Data preset loaded!";
		extras.errorMessage = "Problems loading the preset!";
		extras.file = event.target.files[0];
		fileService.readTextFile(extras);
	}

	applyPresetFile(preset)
	{
		try
		{
			characterDamageService.applyPresetFile(preset);
			editorService.forceComponentToUpdateByKey("characterDamage");
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

	onSavePresetClick(event)
	{
		let json = JSON.stringify(
				characterDamageService.createCharacterDamagePreset(), null, "\t");
		let contentType = "text/json;charset=utf-8";
		let filename = "pssme_character_damage_preset.json";
		editorService.downloadFile(json, filename, contentType);
	}

	onAddChangesClick(event)
	{
		let extras = {};
		extras.successMessage = "Data is added to the modification queue!";
		characterDamageService.addToModificationQueue();
		this.props.onActionResult(extras);
		editorService.forceComponentToUpdateByKey("modification");
	}

	onDefaultValueClick(event)
	{
		const {characterKey, attackKey} = this.state;
		let ad = characterDamageMap[characterKey].damageMap[attackKey];

		if(ad)
		{
			let dv = ad.defaultValue;
			let cdd = this.state.characterDamageData;
			cdd[characterKey][attackKey] = dv;
			this.setState({characterDamageData: cdd});
		}
	}

	getDamage()
	{
		const {characterDamageData, characterKey, attackKey} = this.state;
		let damage = characterDamageData[characterKey];
		return damage ? damage[attackKey] : "";
	}

	render()
	{
		return (
			<CharacterDamageComponent
				characterDamageMap={characterDamageMap}
				characterDamageData={this.state.characterDamageData}
				characterKey={this.state.characterKey}
				attackKey={this.state.attackKey}
				damage={this.getDamage()}
				handleChange={this.handleChange}
				onDefaultValueClick={this.onDefaultValueClick}
				requestFile={editorService.requestFile}
				onReloadDataClick={this.onReloadDataClick}
				onLoadPresetFileChange={this.onLoadPresetFileChange}
				onSavePresetClick={this.onSavePresetClick}
				onAddChangesClick={this.onAddChangesClick}
			/>
		);
	} 
}


export default CharacterDamage;