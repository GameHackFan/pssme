import React from 'react';

import levelEditorLevels from '../../data/level/LevelEditorLevels';
import levelEditorEnemies from '../../data/level/LevelEditorEnemies';

import "./LevelEditor.css";


const LevelEditorComponent = (props) =>
{
	const {level, enemyGroup, enemyId, enemy, enemies} = props;
	const levelOptions = [];
	const groupOptions = [];
	const idOptions = [];
	const enemyOptions = [];
	let leegs = levelEditorLevels[level];
	leegs = leegs ? leegs : {};
	leegs = leegs.groups;
	leegs = leegs ? leegs : {};
	let leeg = leegs[enemyGroup]; 
	leeg = leeg ? leeg : {};

	const groupOn = level ? true : false;
	const enemiesOn = groupOn && enemyGroup ? true : false;
	let editOn = enemiesOn && !isNaN(enemyId);
	editOn = editOn && enemies[enemyId] ? true : false;

	const hidden = {display: "none"};
	const groupStyle = groupOn ? {} : hidden;
	const enemiesStyle = enemiesOn ? {} : hidden;
	const editStyle = editOn ? {} : hidden;

	Object.keys(levelEditorLevels).forEach((lk) =>
	{
		levelOptions.push(
			<option key={lk} value={lk}>
				{levelEditorLevels[lk].label}
			</option>
		);
	});

	Object.keys(leegs).forEach((egk) =>
	{
		groupOptions.push(
			<option key={egk} value={egk}>
				{leegs[egk].label}
			</option>
		);
	});

	Object.keys(enemies).forEach((id) =>
	{
		let label = enemies[id].enemyKey;
		label = levelEditorEnemies[label].label;

		idOptions.push(
			<option key={id} value={id}>
				{id + ": " + label}
			</option>
		);
	});

	props.enemySelectList.forEach((ek) =>
	{
		let label = levelEditorEnemies[ek].label;

		if(label)
		{
			enemyOptions.push(
				<option key={ek} value={ek}>
					{label}
				</option>
			);
		}
	})

	return (
		<div className="level rowLinedFlex">
			<label className="windowText">
				Use this window to edit all the enemies in all levels.
			</label>
			<label className="windowText">
				Here you can choose what enemy or item will spawn, change 
				the position to trigger their spawn and change their X and 
				Y positions.
			</label>
			<label className="windowText">
				You need to select the level and the enemy group to be able 
				to add, remove or edit an enemy or item.
			</label>
			<label className="windowText">
				Click Add Changes and it will add all changes made here in
				the modification queue. Click in Save Preset and it will 
				save a file containing all the customizations. Click in 
				Load Preset to load a file contaning all the customizations 
				you saved previously.
			</label>
			<label className="windowText">
				The Trigger Position, the Position X and Y always have a 
				minimum and maximum value. The editor will allow you to 
				insert any value you want but it will fix those values to 
				be the maximum or the minimum possible to avoid the game 
				to have weird behavior. It is recommended that you always 
				insert valid values between the maximum and the minimum 
				value to avoid having surprises about the enemies being 
				automatically moved by the editor when you apply the 
				customizations.
			</label>
			<label className="windowText">
				Be aware that changes made by the Level Editor will increase 
				or decrease the amount of bytes for all levels, so after you
				generate a rom, changes made here will modify the ROM in a way 
				that editing it again with PSSME will probably result in a 
				bugged ROM. Make sure you're editing the original ROM so you 
				don't end up with a bugged ROM. If you want to edit a ROM and 
				then change it later, save a preset file and load it later so 
				you don't lose the progress of your customizations.
			</label>
			<div className="windowContentLine colLinedFlex">
				<label>Level: </label>
				<select
					name="level"
					className="buttonSolid"
					value={level ? level : ""}
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
					value={enemyGroup ? enemyGroup : ""}
					onChange={props.handleChange}
				>
					<option key="-1" value="">
						Select an enemy group
					</option>
					{groupOptions}
				</select>
			</div>
			<div className="enemyGroup" style={enemiesStyle}>
				<div className="levelDisplay">
					<img src={props.levelImage} />
				</div>
				<div className="enemyGroupText">
					<label>The original rom has</label>
					<span> {leeg.defaultAmount} </span>
					<label>enemy(ies) in this group.</label>
					<br />
					<label>The maximum amount accepted is</label>
					<span> {14} </span>
					<label>enemy(ies) per group. </label>
					<br />
					<label>If you insert more than </label>
					<span> {14}</span>
					<label>
						, the editor will remove the extra enemy(ies) to avoid the game to crash.
					</label>
				</div>
				<div className="hintText">
					<label>
						<b>{"Cyan Line: "}</b>
						Represents the limits of the group.
					</label>
					<label>
						<b>{"Green Line: "}</b>
						Represents the position of the camera that will trigger the enemy being spawned.
					</label>
					<label>
						<b>{"Golden Line: "}</b>
						Represets the camera's field of view.
					</label>
				</div>
				<div className="windowContentLine colLinedFlex">
					<button
						className="buttonSolid"
						onClick={props.onAddEnemyClick}
					>
						Add
					</button>
					<button
						className="buttonSolid"
						onClick={props.onRemoveEnemyClick}
					>
						Remove Selected
					</button>
					<button
						className="buttonSolid"
						onClick={props.onRefreshImageClick}
					>
						Refresh Image
					</button>
				</div>
				<div className="windowContentLine colLinedFlex">
					<label>ID: </label>
					<select
						name="enemyId"
						className="buttonSolid"
						value={enemyId}
						onChange={props.handleChange}
					>
						<option key="none" value="none">
							Select an enemy id
						</option>
						{idOptions}
					</select>
				</div>
				<div style={editStyle}>
					<div className="windowContentLine colLinedFlex">
						<label>
							Enemy / Item Filter: 
						</label>
						<input
							type="text"
							name="filterEnemyString"
							className="textfield"
							value={props.filterEnemyString ? props.filterEnemyString : ""}
							onChange={props.handleChange}
						/>
					</div>
					<div className="windowContentLine colLinedFlex">
						<label>Enemy / Item: </label>
						<select
							name="enemyKey"
							className="buttonSolid"
							value={enemy.enemyKey}
							onChange={props.handleEnemyDataChange}
						>
							{enemyOptions}
						</select>
					</div>
					<div className="windowContentLine colLinedFlex">
						<label>
							Trigger Position: 
						</label>
						<input
							type="text"
							name="triggerPosition"
							className="textfield"
							value={enemy.triggerPosition ? enemy.triggerPosition : ""}
							onChange={props.handleEnemyDataChange}
						/>
						<span>
							{"(Minimum = " + leeg.screenPositionStart}
							{", Maximum = " + leeg.screenPositionEnd + ")"} 
						</span>
					</div>
					<div className="windowContentLine colLinedFlex">
						<label>Position X: </label>
						<input
							type="text"
							name="positionX"
							className="textfield"
							value={enemy.positionX ? enemy.positionX : ""}
							onChange={props.handleEnemyDataChange}
						/>
						<span>
							{"(Recommended Values from -130 to 450)"}
						</span>
					</div>
					<div className="windowContentLine colLinedFlex">
						<label>Position Y: </label>
						<input
							type="text"
							name="positionY"
							className="textfield"
							value={enemy.positionY ? enemy.positionY : ""}
							onChange={props.handleEnemyDataChange}
						/>
						<span>
							{"(Minimum = " + leeg.walkablePositionYTop}
							{", Maximum = " + leeg.walkablePositionYBottom + ")"} 
						</span>
					</div>
				</div>
			</div>
			<div className="windowContentLine">
				<button
					className="buttonSolid"
					onClick={props.onClearDataClick}
				>
					Clear Data
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


export default LevelEditorComponent;