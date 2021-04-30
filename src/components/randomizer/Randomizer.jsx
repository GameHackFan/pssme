import React, {Component} from 'react';
import RandomizerComponent from './RandomizerComponent';

import editorService from
    '../../service/EditorService';
import fileService from "../../service/FileService";
import romService from "../../service/ROMService";
import randomizerService from
    "../../service/RandomizerService";


class Randomizer extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleRandomizerDataChange =
        this.handleRandomizerDataChange.bind(this);
    this.handleGroupDataChange = 
        this.handleGroupDataChange.bind(this);
    this.onLoadPresetFileChange = 
        this.onLoadPresetFileChange.bind(this);
    this.onSavePresetClick = 
        this.onSavePresetClick.bind(this);
    this.onSaveLevelEditorPresetClick = 
        this.onSaveLevelEditorPresetClick.bind(this);
    this.onApplyRandomizerClick = 
        this.onApplyRandomizerClick.bind(this);
    this.onClearChangesClick = 
        this.onClearChangesClick.bind(this);
    this.applyPresetFile =
        this.applyPresetFile.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState)
  {
    if(this.props.actionData !== nextProps.actionData
        && nextProps.actionData)
    {
      this.applyPresetFile(nextProps.actionData);
    }

    return true;
  }

  handleChange(event)
  {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  onClearChangesClick(event)
  {
    randomizerService.setMainDataToDefault();
    editorService.forceComponentToUpdateByKey(
        "randomizer");
  }

  handleRandomizerDataChange(event)
  {
    const {name, value} = event.target;
    
    if(name === "randomMode")
    {
      const {level, enemyGroup} = this.state;
      randomizerService.setRandomMode(
          level, enemyGroup, value);
    }
    else if(name === "seed")
      randomizerService.setSeed(value);
    else if(name === "randomProfile")
      randomizerService.setRandomProfile(value);

    editorService.forceComponentToUpdateByKey(
        "randomizer");
  }

  handleGroupDataChange(event)
  {
    const {level, enemyGroup} = this.state;

    if(level && enemyGroup)
    {
      const {name, value} = event.target;
      randomizerService.updateMainData(
          level, enemyGroup, name, value);
      editorService.forceComponentToUpdateByKey(
          "randomizer");
    }
  }

  onLoadPresetFileChange(event)
  {
    const extras = {};
    extras.successCallback = this.props.onActionResult;
    extras.errorCallback = this.props.onActionResult;
    extras.successMessage =
        "Randomizer preset loaded!";
    extras.errorMessage =
        "Problems loading the preset!";
    extras.file = event.target.files[0];
    fileService.readTextFile(extras);
  }

  onSavePresetClick(event)
  {
    let json = JSON.stringify(randomizerService.
        createRandomizerPreset(), null, "\t");
    let contentType = "text/json;charset=utf-8";
    let filename = "randomizer_preset.json";
    editorService.downloadFile(
        json, filename, contentType);
  }

  onSaveLevelEditorPresetClick(event)
  {
    let json = JSON.stringify(randomizerService.
        createLevelEditorPreset(), null, "\t");
    let contentType = "text/json;charset=utf-8";
    let filename = "level_editor_preset.json";
    editorService.downloadFile(
        json, filename, contentType);
  }

  onApplyRandomizerClick(event)
  {
    const extras = {};

    try
    {
      randomizerService.applyRandomizer();
      extras.successMessage = "Randomizer applied!";
    }
    catch(e)
    {
      console.log(e.message);
      console.log(e);
      extras.errorMessage =
          "Problems applying the randomizer!";
    } 
    
    this.props.onActionResult(extras);
  }

  applyPresetFile(preset)
  {
    try
    {
      randomizerService.applyPresetFile(preset);
      editorService.forceComponentToUpdateByKey(
          "randomizer");
    }
    catch(e)
    {
      console.log(e.message);
      console.log(e);
      const extras = {};
      extras.errorMessage =
          "Invalid JSON preset file!";
      this.props.onActionResult(extras);
    }
  }

  render()
  {
    const {level, enemyGroup} = this.state;
    const groupData = randomizerService.
        getMainDataGroup(level, enemyGroup);

    return (
      <RandomizerComponent
        romReady={romService.isROMReady()}
        seed={randomizerService.getSeed()}
        randomProfile=
          {randomizerService.getRandomProfile()}
        level={level}
        enemyGroup={enemyGroup}
        groupData={groupData}
        handleChange={this.handleChange}
        handleRandomizerDataChange=
          {this.handleRandomizerDataChange}
        handleGroupDataChange=
          {this.handleGroupDataChange}
        requestFile={editorService.requestFile}
        onClearChangesClick={this.onClearChangesClick}
        onLoadPresetFileChange={this.onLoadPresetFileChange}
        onSavePresetClick={this.onSavePresetClick}
        onSaveLevelEditorPresetClick=
          {this.onSaveLevelEditorPresetClick}
        onApplyRandomizerClick=
          {this.onApplyRandomizerClick}
      />
    );
  } 
}

export default Randomizer;