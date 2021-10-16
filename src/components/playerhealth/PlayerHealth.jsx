import React, {Component} from 'react';
import PlayerHealthComponent from './PlayerHealthComponent';

import romService from '../../service/ROMService';
import fileService from '../../service/FileService';
import editorService from '../../service/EditorService';
import playerHealthService from '../../service/PlayerHealthService';

import playerHealthMap from '../../data/overwrite/PlayerHealthMap';


class PlayerHealth extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {};
		this.handleChange = this.handleChange.bind(this);
		this.onDefaultValueClick = this.onDefaultValueClick.bind(this);
		this.onReloadDataClick = this.onReloadDataClick.bind(this);
		this.onLoadPresetFileChange = this.onLoadPresetFileChange.bind(this);
		this.applyPresetFile = this.applyPresetFile.bind(this);
		this.onSavePresetClick = this.onSavePresetClick.bind(this);
		this.onApplyDataClick = this.onApplyDataClick.bind(this);
	}

	componentDidMount()
	{
		this.setState({health: playerHealthService.getPlayerHealth()});
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
		this.setState({[name]: value});
	}

	onReloadDataClick(event)
	{
		const extras = {};

		try
		{
			this.setState({health: playerHealthService.getPlayerHealth()});
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
		extras.successMessage = "Player Health preset loaded!";
		extras.errorMessage = "Problems loading the preset!";
		extras.file = event.target.files[0];
		fileService.readTextFile(extras);
	}

	applyPresetFile(preset)
	{
		try
		{
			playerHealthService.applyPresetFile(preset);
			this.setState({health: playerHealthService.getPlayerHealth()});
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
		let h = this.state.health;
		let json = JSON.stringify(
				playerHealthService.createPlayerHealthPreset(h), null, "\t");
		let contentType = "text/json;charset=utf-8";
		let filename = "pssme_player_health_preset.json";
		editorService.downloadFile(json, filename, contentType);
	}

	onApplyDataClick(event)
	{
		const extras = {};

		try
		{
			playerHealthService.applyPlayerHealth(this.state.health);
			extras.successMessage = "Player Health Data applied!";
			console.log("Player Health Data applied!");
		}
		catch(e)
		{
			console.log(e.message);
			console.log(e);
			extras.errorMessage = "Problems applying the data!";
		} 
		
		this.props.onActionResult(extras);
	}

	onDefaultValueClick(event)
	{
		this.setState({health: playerHealthMap.defaultValue});
	}

	render()
	{
		return (
			<PlayerHealthComponent
				romReady={romService.isROMReady()}
				health={this.state.health}
				handleChange={this.handleChange}
				onDefaultValueClick={this.onDefaultValueClick}
				requestFile={editorService.requestFile}
				onReloadDataClick={this.onReloadDataClick}
				onLoadPresetFileChange={this.onLoadPresetFileChange}
				onSavePresetClick={this.onSavePresetClick}
				onApplyDataClick={this.onApplyDataClick}
			/>
		);
	} 
}


export default PlayerHealth;