import React from 'react';

import "./FoodHeal.css";


const FoodHealComponent = (props) =>
{
	let options = new Array();
	const hidden = {display: "none"};
	const fieldOn = (props.foodKey in props.foodHealMap);
	let fieldStyle = fieldOn ? {} : hidden;
	let heal = props.foodHealData[props.foodKey];

	Object.keys(props.foodHealMap).forEach((k) => {
		options.push(
			<option key={k} value={k}>
				{props.foodHealMap[k].label}
			</option>
		);
	});


	return (
		<div className="foodHeal rowLinedFlex">
			<label className="windowText">
				Use this window to edit how much each food will heal.
			</label>
			<label className="windowText">
				Select a food and type a value between 0 and 255 to be the 
				new heal value, values outside that range will be ignored.
			</label>
			<label className="windowText">
				After doing your changes, click Add Changes to put your 
				changes in the modification queue. If you want to edit a 
				ROM and then change it later, save a preset file and 
				load it later.
			</label>
			<div className="windowContentLine colLinedFlex">
				<label>Food: </label>
				<select
					name="foodKey"
					className="buttonSolid"
					value={props.foodKey}
					onChange={props.handleChange}
				>
					<option key="-1" value="none">
						Select a food
					</option>
					{options}
				</select>
			</div>
			<div
				className="windowContentLine colLinedFlex"
				style={fieldStyle}
			>
				<label>Heal Value: </label>
				<input
					type="text"
					name="heal"
					className="textfield"
					value={heal ? heal : ""}
					onChange={props.handleChange}
				/>
				<button
					className="buttonSolid"
					onClick={props.onDefaultValueClick}
				>
					Default Value
				</button>
			</div>
			<div className="windowContentLine">
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
					onClick={props.onAddChangesClick}
				>
					Add Changes
				</button>
			</div>
		</div>
	);
}


export default FoodHealComponent;