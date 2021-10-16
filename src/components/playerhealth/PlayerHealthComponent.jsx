import React from 'react';

import "./PlayerHealth.css";


const PlayerHealthComponent = (props) =>
{
	let options = new Array();
	const hidden = {display: "none"};
	let lockAllStyle = props.romReady ? {} : hidden;


	return (
		<div className="playerHealth rowLinedFlex">
			<label className="windowText">
				Use this window to edit the health of the players.
			</label>
			<label className="windowText">
				Type a value between 0 and 255 to be the new health value, 
				values outside that range will be ignored.
			</label>
			<label className="windowText">
				After doing your changes, click Apply Data to set your 
				value in the ROM. If you want to edit a ROM and then 
				change it later, save a preset file and load it later.
			</label>
			<label
				className="windowErrorMessage warning"
				style={props.romReady ? {display: "none"} : {}}
			>
				No ROM ready to edit.
			</label>
			<div
				className="windowContentLine"
				style={lockAllStyle}
			>
				<label>Health (HP): </label>
				<input
					type="text"
					name="health"
					className="textfield"
					value={props.health ? props.health : ""}
					onChange={props.handleChange}
				/>
				<button
					className="buttonSolid"
					onClick={props.onDefaultValueClick}
				>
					Default Value
				</button>
			</div>
			<div
				className="windowContentLine"
				style={lockAllStyle}
			>
				<button
					className="buttonSolid"
					onClick={props.onReloadDataClick}
				>
					Reload Data
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
					onClick={props.onApplyDataClick}
				>
					Apply Data
				</button>
			</div>
		</div>
	);
}


export default PlayerHealthComponent;