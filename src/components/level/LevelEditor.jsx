import React, {Component} from 'react';
import LevelEditorComponent from './LevelEditorComponent';

import editorService from '../../service/EditorService';
import fileService from "../../service/FileService";
import levelEditorService from "../../service/LevelEditorService";


class LevelEditor extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {};
		this.getEnemySelectList = this.getEnemySelectList.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleEnemyDataChange = this.handleEnemyDataChange.bind(this);
		this.onAddEnemyClick = this.onAddEnemyClick.bind(this);
		this.onRemoveEnemyClick = this.onRemoveEnemyClick.bind(this);
		this.onRefreshImageClick = this.onRefreshImageClick.bind(this);
		this.onClearDataClick = this.onClearDataClick.bind(this);
		this.onLoadPresetFileChange = this.onLoadPresetFileChange.bind(this);
		this.onSavePresetClick = this.onSavePresetClick.bind(this);
		this.onAddChangesClick = this.onAddChangesClick.bind(this);
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
		this.setState({[name]: value}, () =>
		{
			const {level, enemyGroup, enemyId} = this.state;
			levelEditorService.createLevelImage(
					level, enemyGroup, enemyId, (image) =>
					{
						this.setState({levelImage: image});
					});
		});
	}

	handleEnemyDataChange(event)
	{
		const {name, value} = event.target;
		const {level, enemyGroup, enemyId} = this.state;
		let func = null;

		if(name === "enemyKey")
			func = levelEditorService.setEnemyKey;
		else if(name === "triggerPosition")
			func = levelEditorService.setEnemyTriggerPosition;
		else if(name === "positionX")
			func = levelEditorService.setEnemyPositionX;
		else if(name === "positionY")
			func = levelEditorService.setEnemyPositionY;

		if(func)
		{
			func(level, enemyGroup, enemyId, value);
			editorService.forceComponentToUpdateByKey("levelEditor");
		}
	}

	onAddEnemyClick(event)
	{
		const {level, enemyGroup} = this.state;
		let id = levelEditorService.addEnemy(level, enemyGroup);
		this.setState({enemyId: id});
		editorService.forceComponentToUpdateByKey("levelEditor");
	}

	onRemoveEnemyClick(event)
	{
		const {level, enemyGroup, enemyId} = this.state;
		levelEditorService.removeEnemy(level, enemyGroup, enemyId);
		let nid = Math.max(0, enemyId - 1).toString();
		this.setState({enemyId: nid});
	}

	onRefreshImageClick(event)
	{
		const {level, enemyGroup, enemyId} = this.state;
		levelEditorService.createLevelImage(
				level, enemyGroup, enemyId, (image) =>
				{
					this.setState({levelImage: image});
				});
	}

	onClearDataClick(event)
	{
		levelEditorService.setMainDataToDefault();
		let extras = {successMessage: "Data cleared!"};
		this.props.onActionResult(extras);
	}

	onLoadPresetFileChange(event)
	{
		const extras = {};
		extras.successCallback = this.props.onActionResult;
		extras.errorCallback = this.props.onActionResult;
		extras.successMessage = "Level Editor preset loaded!";
		extras.errorMessage = "Problems loading the preset!";
		extras.file = event.target.files[0];
		fileService.readTextFile(extras);
	}

	onSavePresetClick(event)
	{
		let preset = levelEditorService.createPresetFile();
		let json = JSON.stringify(preset, null, "\t");
		let contentType = "text/json;charset=utf-8";
		let filename = "pssme_level_editor_preset.json";
		editorService.downloadFile(json, filename, contentType);
	}

	onAddChangesClick(event)
	{
		let extras = {};
		extras.successMessage = "Data is added to the modification queue!";
		levelEditorService.addToModificationQueue();
		this.props.onActionResult(extras);
		editorService.forceComponentToUpdateByKey("modification");
	}

	applyPresetFile(preset)
	{
		try
		{
			levelEditorService.applyPresetFile(preset);
			editorService.forceComponentToUpdateByKey("levelEditor");
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

	getEnemySelectList()
	{
		const {level, enemyGroup, enemyId, filterEnemyString} = this.state;
		return levelEditorService.getEnemySelectList(
				level, enemyGroup, enemyId, filterEnemyString);
	}

	render()
	{
		const {level, enemyGroup, enemyId} = this.state;

		return (
			<LevelEditorComponent
				filterEnemyString={this.state.filterEnemyString}
				level={this.state.level}
				enemyGroup={this.state.enemyGroup}
				enemyId={enemyId}
				enemy={levelEditorService.getEnemy(level, enemyGroup, enemyId)}
				enemies={levelEditorService.getEnemies(level, enemyGroup)}
				enemySelectList={this.getEnemySelectList()}
				levelImage={this.state.levelImage}
				requestFile={editorService.requestFile}
				handleChange={this.handleChange}
				handleEnemyDataChange={this.handleEnemyDataChange}
				onAddEnemyClick={this.onAddEnemyClick}
				onRemoveEnemyClick={this.onRemoveEnemyClick}
				onRefreshImageClick={this.onRefreshImageClick}
				onClearDataClick={this.onClearDataClick}
				onLoadPresetFileChange={this.onLoadPresetFileChange}
				onSavePresetClick={this.onSavePresetClick}
				onAddChangesClick={this.onAddChangesClick}
			/>
		);
	} 
}


export default LevelEditor;