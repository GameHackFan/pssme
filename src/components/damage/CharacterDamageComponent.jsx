import React from 'react';

import "./CharacterDamage.css";


const CharacterDamageComponent = (props) =>
{
	let characterOptions = new Array();
	let attackOptions = new Array();
	let cdMapKeys = Object.keys(props.characterDamageMap);
	let attackDamageMap = props.characterDamageMap[props.characterKey];
	attackDamageMap = attackDamageMap ? attackDamageMap.damageMap : {};
	let caMapKeys = attackDamageMap ? Object.keys(attackDamageMap) : [];
	
	const hidden = {display: "none"};
	const subSelectOn = cdMapKeys.includes(props.characterKey) && props.romReady;
	const fieldOn = caMapKeys.includes(props.attackKey) && props.romReady;
	let subSelectStyle = subSelectOn ? {} : hidden;
	let lockAllStyle = props.romReady ? {} : hidden;
	let fieldStyle = fieldOn ? {} : hidden;


	cdMapKeys.forEach((k) => {
		characterOptions.push(
			<option key={k} value={k}>
				{props.characterDamageMap[k].label}
			</option>
		);
	});

	caMapKeys.forEach((k) => {
		attackOptions.push(
			<option key={k} value={k}>
				{attackDamageMap[k].label}
			</option>
		);
	});
	

	return (
		<div className="characterDamage rowLinedFlex">
			<label className="windowText">
				Use this window to edit how much damage a character's 
				attack will do.
			</label>
			<label className="windowText">
				Select a character and an attack, then type a value 
				between 0 and 255 to be the new damage value, values 
				outside that range will be ignored.
			</label>
			<label className="windowText">
				After doing your changes, click Apply Data to set your 
				values in the ROM. If you want to edit a ROM and then 
				change it later, save a preset file and load it later.
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
				<label>Character: </label>
				<select
					name="characterKey"
					className="buttonSolid"
					value={props.characterKey ? props.characterKey : "-1"}
					onChange={props.handleChange}
				>
					<option key="-1" value="none">
						Select a character
					</option>
					{characterOptions}
				</select>
			</div>
			<div
				className="windowContentLine colLinedFlex"
				style={subSelectStyle}
			>
				<label>Attack: </label>
				<select
					name="attackKey"
					className="buttonSolid"
					value={props.attackKey ? props.attackKey : "-1"}
					onChange={props.handleChange}
				>
					<option key="-1" value="none">
						Select an attack
					</option>
					{attackOptions}
				</select>
			</div>
			<div
				className="windowContentLine"
				style={fieldStyle}
			>
				<label>Damage: </label>
				<input
					type="text"
					name="damage"
					className="textfield"
					value={props.damage ? props.damage : ""}
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


export default CharacterDamageComponent;