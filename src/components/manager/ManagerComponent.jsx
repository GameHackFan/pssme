import React from 'react';

import componentService from '../../service/ComponentService';

import "./Manager.css";


const ManagerComponent = (props) =>
{
	let options = new Array();
	let im = componentService.getInfoMap();
	let waitMessage = props.generatingROM ? {} : {display: "none"};

	Object.keys(im).forEach((e) =>
	{
		let ci = im[e];

		if(e !== "manager" && ci.type === "windowContent")
		{
			options.push(
				<option key={e} value={e}>
					{ci.title}
				</option>
			);
		}
	});

	return (
		<div className="manager rowLinedFlex">
			<label className="windowText">
				This is the main window of the editor. Here you can enable all 
				the features this editor offers. Here you can also load, clone 
				and generate a ROM.
			</label>
			<label className="windowText">
				The hack author field allows you to write the name of the author 
				of the hack, it will be shown in the title screen of the game.
				This feature will not work for a seed randomized ROM.
			</label>
			<label className="windowText">
				Before start editing the ROM, you need to load and clone it.
				After adding the desired changes you made to the modification
				queue, you need to click on Generate ROM to create the ROM's 
				.zip file. Keep in mind that the process to generate a ROM is 
				a little bit slow, so be patient and wait a little bit.
			</label>
			<label className="windowText">
				After you generate a ROM, don't use that same hack ROM on
				PSSME, the changes made by the Seed Randomizer and the Level 
				Editor might change the position of important bytes and trying 
				to edit a hack like that with PSSME will probably result in a 
				bugged ROM, make sure you're editing the original game's ROM.
			</label>
			<label className="windowText">
				If you generated a ROM lacking some changes you wanted to add, 
				You can use the Clone ROM button to restore the ROM you loaded, 
				add the changes you forgot and then generate a ROM again.
			</label>
			<div className="colLinedFlex windowContentLine">
				<label>Hack Author: </label>
				<input
					name="hackAuthor"
					className="textfield"
					onChange={props.handleChange}
					value={props.hackAuthor ? props.hackAuthor : ""}
					type="text"
				/>
				<b>(Maximum 20 characters)</b>
			</div>
			<div className="colLinedFlex windowContentLine">
				<label>Window Selector: </label>
				<select
					className="buttonSolid"
					onChange={props.onWindowSelectorChanged}
				>
					<option key="none" value="">
						Select a window
					</option>
					{options}
				</select>
			</div>
			<div>
				<button
					className="buttonSolid"
					onClick={props.requestFile}
				>
					Load Original ROM
					<input
						type="file"
						value=""
						onChange={props.onLoadROMFileChange}
					/>
				</button>
				<button
					className="buttonSolid"
					onClick={props.onCloneROMClick}
				>
					Clone ROM
				</button>
				<button
					className="buttonSolid"
					onClick={props.onGenerateROMClick}
				>
					Generate ROM
				</button>
			</div>
			<div
				className="windowContentLine colLinedFlex"
				style={waitMessage}
			>
				<label className="romMessage">
					Please wait, the ROM is being generated.
				</label>
			</div>
		</div>
	);
}


export default ManagerComponent;