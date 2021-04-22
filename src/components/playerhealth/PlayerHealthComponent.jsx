import React from 'react';

import "./PlayerHealth.css";


const PlayerHealthComponent = (props) =>
{
  let options = new Array();
  let phMapKeys = Object.keys(props.playerHealthMap);

  const hidden = {display: "none"};
  const fieldOn = phMapKeys.includes(
      props.playerKey) && props.romReady;
  let lockAllStyle = props.romReady ? {} : hidden;
  let fieldStyle = fieldOn ? {} : hidden;

  phMapKeys.forEach((e) => {
    options.push(
      <option key={e} value={e}>
        {props.playerHealthMap[e].label}
      </option>
    );
  });

  return (
    <div className="playerHealth rowLinedFlex">
      <label className="windowText">
        Use this window to edit the health of the players. Select a player and type a value between 1 and 255 to change the health.
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
        <label>Player: </label>
        <select
          name="playerKey"
          className="buttonSolid"
          value={props.playerKey}
          onChange={props.handleChange}
        >
          <option key="-1" value="none">
            Select a player
          </option>
          {options}
        </select>
      </div>
      <div
        className="windowContentLine"
        style={fieldStyle}
      >
        <label>Health: </label>
        <input
          type="text"
          name="health"
          className="textfield"
          value={props.health ? props.health : ""}
          onChange={props.handleChange}
        />
      </div>
      <div
        className="windowContentLine"
        style={lockAllStyle}
      >
        <button
          className="buttonSolid"
          onClick={props.onDefaultValueClick}
        >
          Default Value
        </button>
      </div>
    </div>
  );
}


export default PlayerHealthComponent;