import React, {Component} from 'react';
import FoodHealComponent from './FoodHealComponent';

import romService from '../../service/ROMService';
import fileService from '../../service/FileService';
import editorService from '../../service/EditorService';
import foodHealService from '../../service/FoodHealService';

import foodHealMap from '../../data/overwrite/FoodHealMap';


class FoodHeal extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {foodHealData: {}};
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
		this.setState({foodHealData: foodHealService.getFoodHealData()});
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
		
		if(event.target.name === "heal")
		{
			let fhd = this.state.foodHealData;
			fhd[this.state.foodKey] = value;
			this.setState({foodHealData: fhd});
		}
		else
			this.setState({[name]: value});
	}

	onReloadDataClick(event)
	{
		const extras = {};

		try
		{
			this.setState({foodHealData: foodHealService.getFoodHealData()});
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
		extras.successMessage = "Food Heal Data preset loaded!";
		extras.errorMessage = "Problems loading the preset!";
		extras.file = event.target.files[0];
		fileService.readTextFile(extras);
	}

	applyPresetFile(preset)
	{
		try
		{
			foodHealService.applyPresetFile(preset);
			editorService.forceComponentToUpdateByKey("foodHeal");
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
				foodHealService.createFoodHealPreset(), null, "\t");
		let contentType = "text/json;charset=utf-8";
		let filename = "pssme_food_heal_preset.json";
		editorService.downloadFile(json, filename, contentType);
	}

	onApplyDataClick(event)
	{
		const extras = {};

		try
		{
			foodHealService.applyFoodHealData();
			extras.successMessage = "Food Heal Data applied!";
			console.log("Food Heal Data applied!");
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
		let fh = foodHealMap[this.state.foodKey];

		if(fh)
		{
			let dv = fh.defaultValue;
			let fhd = this.state.foodHealData;
			fhd[this.state.foodKey] = dv;
			this.setState({foodHealData: fhd});
		}
	}

	render()
	{
		return (
			<FoodHealComponent
				romReady={romService.isROMReady()}
				foodHealMap={foodHealMap}
				foodHealData={this.state.foodHealData}
				foodKey={this.state.foodKey}
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


export default FoodHeal;