import React from 'react';

import randomizerData from '../../data/randomizer/RandomizerData';

import "./Randomizer.css";


const RandomizerComponent = (props) =>
{
	const profileOptions = [];
	const levelOptions = [];
	const groupOptions = [];
	const fields = [];
	let enemyGroups = randomizerData.enemyGroups[props.level];
	enemyGroups = enemyGroups ? enemyGroups : {};
	let enemyGroup = enemyGroups[props.enemyGroup];
	enemyGroup = enemyGroup ? enemyGroup : {};

	const groupOn = props.level ? true : false;
	const editOn = groupOn && props.enemyGroup;
	const hidden = {display: "none"}
	const customStyle = props.randomProfile === "custom" ? {} : hidden;
	const groupStyle = groupOn ? {} : hidden;
	const editStyle = editOn ? {} : hidden;

	let rps = randomizerData.randomProfile;
	Object.keys(rps).forEach((rp) => 
	{
		profileOptions.push(
			<option key={rp} value={rp}>
				{rps[rp].label}
			</option>
		);
	});

	for(let i = 0; i < randomizerData.levels.keys.length; i++)
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
		data = data ? data : {};
		let gui = ess[key];

		fields.push(
			<div
				key={key}
				className="windowContentLine colLinedFlex"
			>
				<label title={gui.information}>
					{gui.label}
				</label>
				<span title="Minimum Amount, must be less than the maximum.">
					Min:
				</span>
				<input
					type="text"
					name={key + "-min"}
					className="textfield"
					value={data.randomMinAmount ? data.randomMinAmount : ""}
					onChange={props.handleGroupDataChange}
				/>
				<span title="Maximum Amount, must be more than the minimum.">
					Max:
				</span>
				<input
					type="text"
					name={key + "-max"}
					className="textfield"
					value={data.randomMaxAmount ? data.randomMaxAmount : ""}
					onChange={props.handleGroupDataChange}
				/>
			</div>
		);
	});

	return (
		<div className="randomizer rowLinedFlex">
			<label className="windowText">
				Use this window to create a ROM with random enemies at random 
				positions based on a "Seed" and a profile you selected.
				Remember that if you inform the same "Seed" and the same values 
				it will always generate the same ROM, but the same "Seed" with 
				different values will generate a different ROM.
			</label>
			<label className="windowText">
				Inside the game, several enemies are stored together and it 
				is being called enemy group. An enemy group contains 1 or 
				more enemies next to each other inside the ROM, You can change 
				the amount of enemies in an enemy group, but you must add at 
				least 1 enemy to each enemy group. Adding a lot of enemies can 
				also cause lags or crashes. The randomizer will take care to 
				cap the amount of enemies to avoid crashes.
			</label>
			<label className="windowText">
				If you don't want to use the profiles available, you can select 
				the Custom profile, it will allow you to make your own random 
				profile base on several enemy randomizer strategies, if you 
				like a specific strategy, add the minimum and the maximum amount 
				of enemies for that strategy. The amount of enemies in a specific 
				group will be the sum of all enemies passed inside all enemy 
				strategies and the result must be at least 1. If it exceeds the 
				maximum amount accepted for that group, the randomizer will 
				randomly remove enemies until it reaches the maximum amount.
			</label>
			<label className="windowText">
				Click Add Changes to add the randomizer changes to the modification 
				queue.
			</label>
			<label className="windowText">
				If you want to edit the stuff made by the randomizer with the level 
				editor, select the things you want and click Save Level Editor Preset 
				and then load the saved preset in the Level Editor.
			</label>
			<label className="windowText">
				Be aware that changes made by the Seed Randomizer will increase 
				or decrease the amount of bytes for all levels, so after you 
				generate a randomized ROM, using PSSME to edit the ROM again will 
				probably result in a bugged ROM.
			</label>
			<div className="windowContentLine colLinedFlex">
				<label>Seed: </label>
				<input
					type="text"
					name="seed"
					className="textfield"
					onChange={props.handleRandomizerDataChange}
					value={props.seed}
				/>
				<b>
					{"(Minimum = " + Number.MIN_SAFE_INTEGER}
					{", Maximum = " + Number.MAX_SAFE_INTEGER + ")"}
				</b>
			</div>
			<div className="windowContentLine colLinedFlex">
				<label>Random Profile: </label>
				<select
					name="randomProfile"
					className="buttonSolid"
					value={props.randomProfile}
					onChange={props.handleRandomizerDataChange}
				>
					<option key="-1" value="">
						Select a random profile
					</option>
					{profileOptions}
				</select>
			</div>
			<div style={customStyle}>
				<div className="windowContentLine colLinedFlex">
					<label>Level: </label>
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
					<label>Enemy Group: </label>
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
					{/* <label className="enemyGroupText">

					</label> */}
					{/* <div className="windowContentLine colLinedFlex">
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
					</div> */}
					<div className="enemyGroup">
						{fields}
					</div>
				</div>
			</div>
			<div className="windowContentLine">
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
					onClick={props.onAddChangesClick}
				>
					Add Changes
				</button>
			</div>
		</div>
	);
}


export default RandomizerComponent;