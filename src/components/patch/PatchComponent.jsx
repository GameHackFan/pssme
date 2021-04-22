import React from 'react';

import "./Patch.css";


const PatchComponent = (props) =>
{
  let options = new Array();
  let patchMapKeys = Object.keys(props.patchMap);
  let selectedPatch = props.patchMap[props.patchKey];
  selectedPatch = selectedPatch ? selectedPatch : {};
  let lockAllStyle =
      props.romReady ? {} : {display: "none"};

  patchMapKeys.forEach((e) => {
    let patch = props.patchMap[e];

    if(patch.show)
    {
      options.push(
        <option key={e} value={e}>
          {patch.label}
        </option>
      );
    }
  });

  return (
    <div className="patch rowLinedFlex">
      <label className="windowText">
        Use this window to apply patches to the ROM.
        Select a patch and click in apply patch to apply the selected patch. You can also apply a patch from a file.
      </label>
      <label
        className="windowErrorMessage warning"
        style={props.romReady ? {display: "none"} : {}}
      >
        No ROM ready to edit.
      </label>
      <div
        className="windowContentLine colLinedFlex"
        style={lockAllStyle}
      >
        <label>Patch: </label>
        <select
          name="patchKey"
          className="buttonSolid"
          value={props.patchKey}
          onChange={props.handleChange}
        >
          <option key="-1" value="">
            Select a patch
          </option>
          {options}
        </select>
      </div>
      <div
        className="windowContentLine colLinedFlex"
        style={lockAllStyle}
      >
        <span className="windowText">
          {selectedPatch.text}
        </span>
      </div>
      <div
        className="windowContentLine"
        style={lockAllStyle}
      >
        <button
          className="buttonSolid"
          onClick={props.onApplyPatchClick}
        >
          Apply Patch
        </button>
        <button
          className="buttonSolid"
          onClick={props.requestFile}
        >
          Apply Patch From File
          <input
            type="file"
            value=""
            onChange={props.onApplyPatchFileChange}
          />
        </button>
      </div>
    </div>
  );
}


export default PatchComponent;