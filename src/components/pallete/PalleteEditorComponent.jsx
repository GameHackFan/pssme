import React from 'react';

import palleteData from "../../data/pallete/PalleteData";

import "./PalleteEditor.css";


const PalletEditorComponent = (props) =>
{
  const {palleteId, palleteInfoList} = props;
  const palleteOptions = [];
  const colorButtons = [];
  let palleteInfo = palleteInfoList[palleteId];
  palleteInfo = palleteInfo ? palleteInfo : {};

  const editOn = props.romReady && props.pallete;
  const hidden = {display: "none"};
  const lockAllStyle = props.romReady ? {} : hidden;
  const editStyle = editOn ? {} : hidden;

  Object.keys(palleteInfoList).forEach((key) =>
  {
    let pi = palleteInfoList[key];
    let ad = palleteData.startAddress + (key * 32);
    palleteOptions.push(
      <option key={key} value={key}>
        {key}: {pi.originalUsage} / {pi.pssmeUsage} {""}
        ({ad}, {ad.toString(16).toUpperCase()})
      </option>
    );
  });

  if(editOn)
  {
    props.pallete.forEach((color, index) =>
    {
      if(color)
      {
        colorButtons.push(
          <input
            key={index}
            className="buttonSolid palleteColor"
            name={"colorId_" + index}
            type="color"
            value={color}
            onChange={props.handleChange}
          />
        );
      }
    });
  }

  return (
    <div className="pallete rowLinedFlex">
      <label className="windowText">
        Use this window to edit the color palletes of the game.
      </label>
      <label className="windowText">
        To edit a pallete, you need to select the pallete, edit its
         colors and click in apply to set the new values inside the
         ROM. After clicking apply you can't restore the pallete anymore.
      </label>
      <label className="windowText">
        Be aware that changes made by the Level Editor or the Seed
         Randomizer will make some changes to some palletes, so make
         sure to do the pallete customization step after those above
         to make sure your changes won't be overwritten.
      </label>
      <label
        className="windowErrorMessage warning"
        style={props.romReady ? hidden : {}}
      >
        No ROM ready to edit.
      </label>
      <div
        className="windowContentLine colLinedFlex"
        style={lockAllStyle}
      >
        <label>
          Pallete Filter: 
        </label>
        <input
          type="text"
          name="filterPalleteString"
          className="textfield"
          value={props.filterPalleteString ? 
              props.filterPalleteString : ""}
          onChange={props.handleChange}
        />
      </div>
      <div
        className="windowContentLine colLinedFlex"
        style={lockAllStyle}
      >
        <label>Select Pallete: </label>
        <select
          name="palleteId"
          className="buttonSolid"
          value={palleteId ? palleteId : ""}
          onChange={props.handleChange}
        >
          <option key="-1" value="-1">
            Select a pallete
          </option>
          {palleteOptions}
        </select>
      </div>
      <div
        className="windowContentLine colLinedFlex"
        style={editStyle}
      >
        {colorButtons}
      </div>
      <div
        className="windowContentLine colLinedFlex"
        style={editStyle}
      >
        <button
          className="buttonSolid"
          onClick={props.onRestorePallete}
        >
          Restore Pallete
        </button>
        <button
          className="buttonSolid"
          onClick={props.onApplyPallete}
        >
          Apply Pallete
        </button>
      </div>
      <div className="palleteHint" style={editStyle}>
        <span>{palleteInfo.originalUsage} </span>
        <label>
          uses this pallet in the original game.
        </label>
        <br />
        <span>{palleteInfo.pssmeUsage} </span>
        <label>
          uses this pallet in PSSME Level Editor and Seed Randomizer.
        </label>
      </div>
      <div
        className="windowContentLine"
        style={lockAllStyle}
      >
        <button
          className="buttonSolid"
          onClick={props.requestFile}
        >
          Load Preset
          <input
            type="file"
            value=""
            onChange={props.onLoadPresetFileChange}
          />
        </button>
        <button
          className="buttonSolid"
          onClick={props.onSavePalletePresetClick}
        >
          Save Pallete Preset
        </button>
        <button
          className="buttonSolid"
          onClick={props.onSaveAllPresetClick}
        >
          Save All Preset
        </button>
      </div>
    </div>
  );
}


export default PalletEditorComponent;