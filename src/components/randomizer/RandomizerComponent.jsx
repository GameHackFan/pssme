import React from 'react';

import randomizerData from
    '../../data/randomizer/RandomizerData';

import "./Randomizer.css";


const RandomizerComponent = (props) =>
{
  const levelOptions = new Array();
  const groupOptions = new Array();
  const fields = new Array();
  let enemyGroups =
      randomizerData.enemyGroups[props.level];
  enemyGroups = enemyGroups ? enemyGroups : {};
  let enemyGroup = enemyGroups[props.enemyGroup];
  enemyGroup = enemyGroup ? enemyGroup : {};
  let randomMode = props.groupData.randomMode;
  randomMode = randomMode ? randomMode : "random";

  const groupOn = props.romReady && props.level ?
      true : false;
  const editOn = groupOn && props.enemyGroup &&
      enemyGroup.maxAmount ? true : false;
  const hidden = {display: "none"}
  const groupStyle = groupOn ? {} : hidden;
  const editStyle = editOn ? {} : hidden;
  const lockAllStyle = props.romReady ? {} : hidden;

  for(let i = 0;
      i < randomizerData.levels.keys.length; i++)
  {
    let key = randomizerData.levels.keys[i];
    levelOptions.push(
      <option key={key} value={key}>
        {randomizerData.levels.labels[i]}
      </option>
    );
  }

  Object.keys(enemyGroups).forEach((elem) =>
  {
    groupOptions.push(
      <option key={elem} value={elem}>
        {enemyGroups[elem].label}
      </option>
    );
  });
  
  let ess = randomizerData.enemyStrategy;
  Object.keys(ess).forEach((key) =>
  {
    let data = props.groupData[key];
    let style =
        randomMode !== "custom" ? hidden : {};

    fields.push(
      <div
        key={key}
        className="windowContentLine colLinedFlex"
        style={style}
      >
        <label>
          {ess[key].label} <br/> 
          Enemy Amount: 
        </label>
        <input
          type="text"
          name={key}
          className="textfield"
          value={data ? data : ""}
          onChange={props.handleGroupDataChange}
        />
      </div>
    );
  });

  return (
    <div className="randomizer rowLinedFlex">
      <label className="windowText">
        Use this window to create a ROM with random enemies at random positions based on a "Seed" and all the strategies selected. Remember that if you inform the same "Seed" and the same values it will always generate the same ROM, but the same "Seed" with different values will generate a different ROM.
      </label>
      <label className="windowText">
        Inside the game, several enemies are stored together and it is being called enemy group. An enemy group contains 1 or more enemies next to each other inside the ROM, You can change the amount of enemies in an enemy group, but you must add at least 1 enemy to each enemy group. Adding a lot of enemies can also cause lags or crashes. The randomizer will take care to cap the amount of enemies to avoid crashes.
      </label>
      <label className="windowText">
       There are several enemy randomizer strategies, if you like a specific strategy, add 1 or more enemies for that strategy.
       The amount of enemies in a certain group will be the sum of all enemies passed inside all enemy strategies and the result must be at least 1. If it exceed the maximum limit accepted for that group, the randomizer will randomly remove enemies until it reaches the maximum limit.
      </label>
      <label className="windowText">
       Click Apply Randomizer without any changes and it will randomize everything.
      </label>
      <label className="windowText">
       Be aware that changes made by the Seed Randomizer will increase or decrease the amount of bytes for all levels, so any changes applied here will change the ROM in a way that applying patches or appling changes made by the Level Editor after will probably result in a bugged ROM. Make sure to apply patches before applying the randomizer. If you want the randomizer to generate a ROM and then edit it later, save a preset for the level editor and load it in the level editor instead of applying the randomizer.
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
        <label>Seed: </label>
        <input
          type="text"
          name="seed"
          className="textfield"
          onChange={props.handleRandomizerDataChange}
          value={props.seed}
        />
      </div>
      <div
        className="windowContentLine colLinedFlex"
        style={lockAllStyle}
      >
        <label>Select Level: </label>
        <select
          name="level"
          className="buttonSolid"
          value={props.level}
          onChange={props.handleChange}
        >
          <option key="-1" value="">
            Select a level
          </option>
          {levelOptions}
        </select>
      </div>
      <div
        className="windowContentLine colLinedFlex"
        style={groupStyle}
      >
        <label>Select Enemy Group: </label>
        <select
          name="enemyGroup"
          className="buttonSolid"
          value={props.enemyGroup}
          onChange={props.handleChange}
        >
          <option key="-1" value="">
            Select an enemy group
          </option>
          {groupOptions}
        </select>
      </div>
      <div
        className="windowContentLine colLinedFlex"
        style={groupStyle}
      >

      </div>
      <div
        className="rowLinedFlex"
        style={editStyle}
      >
        <div className="enemyGroupText">
          <label>The original rom has</label>
          <span> {enemyGroup.defaultAmount} </span>
          <label>enemy(ies) in this group.</label>
          <br />
          <label>The maximum amount accepted is</label>
          <span> {enemyGroup.maxAmount} </span>
          <label>enemy(ies) in this group.</label>
        </div>
        <label className="enemyGroupText">

        </label>
        <div
          className="windowContentLine colLinedFlex">
          <label>
            Random Mode:
          </label>
          <select
            name="randomMode"
            className="buttonSolid"
            value={randomMode}
            onChange={props.handleRandomizerDataChange}
          >
            <option value="random">Random</option>
            <option value="custom">Custom</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
        <div className="enemyGroup">
          {fields}
        </div>
      </div>
      <div
        className="windowContentLine"
        style={lockAllStyle}
      >
        <button
          className="buttonSolid"
          onClick={props.onClearChangesClick}
        >
          Clear Changes
        </button>
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
          onClick={props.onSavePresetClick}
        >
          Save Preset
        </button>
        <button
          className="buttonSolid"
          onClick={props.onSaveLevelEditorPresetClick}
        >
          Save Level Editor Preset
        </button>
        <button
          className="buttonSolid"
          onClick={props.onApplyRandomizerClick}
        >
          Apply Randomizer
        </button>
      </div>
    </div>
  );
}


export default RandomizerComponent;