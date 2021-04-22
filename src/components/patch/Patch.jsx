import React, {Component} from 'react';
import PatchComponent from './PatchComponent';

import patchMap from "../../data/patch/PatchMap";
import romService from "../../service/ROMService";
import editorService from
    "../../service/EditorService";
import fileService from
    "../../service/FileService";


class Patch extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.onApplyPatchClick =
        this.onApplyPatchClick.bind(this);
    this.onApplyPatchFileChange =
        this.onApplyPatchFileChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState)
  {
    if(this.props.actionData !== nextProps.actionData
        && nextProps.actionData)
    {
      let patch = JSON.parse(nextProps.actionData);
      romService.applyPatch(patch);
    }

    return true;
  }

  handleChange(event)
  {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  onApplyPatchClick(event)
  {
    const extras = {};
    let patch = patchMap[this.state.patchKey];
    patch = patch ? patch.patch : null;

    if(patch)
    {
      romService.applyPatch(patch);
      extras.successMessage = "Patch applied!";
    }
    else
    {
      extras.errorMessage =
          "Problems applying the patch!";
    }

    this.props.onActionResult(extras);
  }

  onApplyPatchFileChange(event)
  {
    const extras = {};
    extras.successCallback = this.props.onActionResult;
    extras.errorCallback = this.props.onActionResult;
    extras.successMessage = "Patch applied!";
    extras.errorMessage =
        "Problems applying the patch!";
    extras.file = event.target.files[0];
    fileService.readTextFile(extras);
  }

  render()
  {
    return (
      <PatchComponent
        romReady={romService.isROMReady()}
        patchMap={patchMap}
        patchKey={this.state.patchKey}
        handleChange={this.handleChange}
        requestFile={editorService.requestFile}
        onApplyPatchClick={this.onApplyPatchClick}
        onApplyPatchFileChange=
          {this.onApplyPatchFileChange}
      />
    );
  } 
}


export default Patch;