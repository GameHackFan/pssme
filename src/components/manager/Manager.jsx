import React, {Component} from 'react';
import ManagerComponent from './ManagerComponent';

import editorService from '../../service/EditorService';
import fileService from "../../service/FileService";
import romService from "../../service/ROMService";

class Manager extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.onLoadROMFileChange = 
        this.onLoadROMFileChange.bind(this);
    this.onCloneROMClick = 
        this.onCloneROMClick.bind(this);
    this.onGenerateROMClick = 
        this.onGenerateROMClick.bind(this);
    this.downloadGeneratedROM = 
        this.downloadGeneratedROM.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState)
  {
    if(this.props.actionData !== nextProps.actionData
        && nextProps.actionData)
    {
      romService.setROM(nextProps.actionData);
      editorService.forceComponentToUpdateByKey("app");
    }

    return true;
  }

  handleChange(event)
  {
    editorService.openWindow(event.target.value);
  }

  onLoadROMFileChange(event)
  {
    const extras = {};
    extras.successCallback = this.props.onActionResult;
    extras.errorCallback = this.props.onActionResult;
    extras.successMessage = "Original ROM loaded!";
    extras.errorMessage = "Problems loading the ROM!";
    extras.file = event.target.files[0];
    fileService.readZipFile(extras);
  }

  onCloneROMClick(event)
  {
    const extras = {};

    try
    {
      romService.cloneROM();
      extras.successMessage = "ROM cloned!";
      editorService.forceComponentToUpdateByKey("app");
    }
    catch(e)
    {
      console.log(e.message);
      console.log(e);
      extras.errorMessage =
          "Problems cloning the ROM!";
    }

    this.props.onActionResult(extras);
  }

  onGenerateROMClick(event)
  {
    const extras = {};
    extras.successCallback = this.downloadGeneratedROM;
    extras.errorCallback = this.props.onActionResult;
    extras.fileObject = romService.getGeneratedROM();
    extras.errorMessage =
        "Problems ziping the generated ROM!";

    try
    {
      if(extras.fileObject)
      {
        this.setState({generatingROM: true});
        fileService.createZipFile(extras);
      }
      else
        this.props.onActionResult(extras);
    }
    catch(e)
    {
      console.log(e.message);
      console.log(e);
      this.props.onActionResult(extras);
    }
  }

  downloadGeneratedROM(extras)
  {
    this.setState({generatingROM: false});
    let rom = extras.actionData;
    let contentType = "application/octet-stream";
    let name = "sailormn.zip";
    editorService.downloadFile(rom, name, contentType);
  }
  
  render()
  {
    return (
      <ManagerComponent
        handleChange={this.handleChange}
        requestFile={editorService.requestFile}
        generatingROM={this.state.generatingROM}
        onCloneROMClick={this.onCloneROMClick}
        onLoadROMFileChange={this.onLoadROMFileChange}
        onGenerateROMClick={this.onGenerateROMClick}
      />
    );
  } 
}

export default Manager;