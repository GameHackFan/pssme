import React from 'react';

import palleteData from "../../data/pallete/PalleteData";

import "./PalleteEditor.css";


const PalleteEditorComponent = (props) =>
{
	const {palleteId, palleteInfoList} = props;
	const palleteOptions = [];
	const colorButtons = [];
	let palleteInfo = palleteInfoList[palleteId];
	palleteInfo = palleteInfo ? palleteInfo : {};
	let pid = parseInt(palleteId);
	pid = isNaN(pid) ? - 1 : pid;

	const pallete = props.pallete ? props.pallete : [];
	const hidden = {display: "none"};
	const warningStyle = props.romReady ? hidden : {};
	const editStyle = props.pallete ? {} : hidden;

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

	pallete.forEach((color, index) =>
	{
		colorButtons.push(
			<label
				key={index}
				name={"colorId_" + index}
				className={props.colorId === index ? "colorSelected" : ""}
				style={{backgroundColor: color}}
				onClick={props.onColorClick}
			></label>
		);
	});


	return (
		<div className="pallete rowLinedFlex">
			<label className="windowText">
				Use this window to edit the color palletes of the game.
			</label>
			<label className="windowText">
				To edit a pallete, you need to select the pallete, edit its 
				colors and click on Add Changes to add the modifications you 
				made to the modification queue. If you want to edit a ROM and 
				then change it later, save a preset file and load it later.
			</label>
			<label className="windowText">
				Be aware that changes made by the Level Editor or the Seed 
				Randomizer will make changes to some palletes.
			</label>
			<label className="windowErrorMessage warning" style={warningStyle}>
				Make sure you have a ROM cloned first to properly use this editor.
			</label>
			<label className="windowErrorMessage warning" style={warningStyle}>
				After, click Reload Data to ensure all palletes are the default palletes.
			</label>
			<div className="windowContentLine colLinedFlex">
				<label>
					Pallete Filter: 
				</label>
				<input
					type="text"
					name="filterPalleteString"
					className="textfield"
					value={props.filterPalleteString ? props.filterPalleteString : ""}
					onChange={props.handleChange}
				/>
			</div>
			<div className="windowContentLine colLinedFlex">
				<label>Select Pallete: </label>
				<select
					name="palleteId"
					className="buttonSolid"
					value={pid}
					onChange={props.handleChange}
				>
					<option key="-1" value="-1">
						Select a pallete
					</option>
					{palleteOptions}
				</select>
			</div>
			<div
				className="colorContainer colLinedFlex"
				style={editStyle}
			>
				{colorButtons}
			</div>
			<div style={editStyle}>
				<div className="windowContentLine colLinedFlex">
					<label>Hex Mode: </label>
					<label htmlFor="hexMode" className="checkbox">
						<input
							id="hexMode"
							name="hexMode"
							className="checkbox"	
							type="checkbox"
							checked={props.hexMode}
							onChange={props.handleChange}
						/>
					</label>
					<div
						className="customColor"
						style={props.getCustomColorCSSStyle()}
					></div>
				</div>
				<div
					className="windowContentLine colLinedFlex"
					style={props.hexMode ? {} : hidden}
				>
					<label>
						Hex Color: 
					</label>
					<input
						type="text"
						name="hexColor"
						className="textfield"
						value={props.hexColor ? props.hexColor : "000000"}
						onChange={props.handleChange}
					/>
				</div>
				<div
					className="windowContentLine colLinedFlex"
					style={props.hexMode ? hidden : {}}
				>
					<label>
						Red: 
					</label>
					<input
						type="text"
						name="red"
						className="textfield"
						value={props.red ? props.red : "0"}
						onChange={props.handleChange}
					/>
				</div>
				<div
					className="windowContentLine colLinedFlex"
					style={props.hexMode ? hidden : {}}
				>
					<label>
						Green: 
					</label>
					<input
						type="text"
						name="green"
						className="textfield"
						value={props.green ? props.green : "0"}
						onChange={props.handleChange}
					/>
				</div>
				<div
					className="windowContentLine colLinedFlex"
					style={props.hexMode ? hidden : {}}
				>
					<label>
						Blue: 
					</label>
					<input
						type="text"
						name="blue"
						className="textfield"
						value={props.blue ? props.blue : "0"}
						onChange={props.handleChange}
					/>
				</div>
			</div>
			<div
				className="windowContentLine colLinedFlex"
				style={editStyle}
			>
				<button
					className="buttonSolid"
					onClick={props.onReloadPallete}
				>
					Reload Pallete
				</button>
				<button
					className="buttonSolid"
					onClick={props.onReloadColorClick}
				>
					Reload Color
				</button>
				<button
					className="buttonSolid"
					onClick={props.onSetColorClick}
				>
					Set Color
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


export default PalleteEditorComponent;