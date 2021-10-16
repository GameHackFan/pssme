import React from 'react';

import "./Zoom.css";


const ZoomComponent = (props) =>
{
	let options = new Array();
	let zoomMapKeys = Object.keys(props.zoomMap);
	let zv = props.zoomValue;
	zv = zv !== null || zv !== undefined ? zv : "";
	let showField = zoomMapKeys.includes(props.component);

	zoomMapKeys.forEach((e) => {
		options.push(
			<option key={e} value={e}>
				{props.zoomMap[e].label}
			</option>
		);
	});

	return (
		<div className="zoom rowLinedFlex">
			<label className="windowText">
				Use this window to edit the zoom of the components of the 
				editor, adjusting it in a way that makes it more confortable 
				to you. You can save and load a 'Preset' with the changes you like.
			</label>
			<div className="windowContentLine colLinedFlex">
				<label>Edit Component Zoom: </label>
				<select
					name="component"
					className="buttonSolid"
					value={props.component}
					onChange={props.handleChange}
				>
					<option key="-1" value="">
						Select a component
					</option>
					{options}
				</select>
			</div>
			<div
				className="windowContentLine"
				style={{display: showField ? "block" : "none"}}
			>
				<label>Zoom Value: </label>
				<input
					type="text"
					name="zoomValue"
					className="textfield"
					value={zv}
					onChange={props.handleChange}
				/>
			</div>
			<div className="windowContentLine">
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
			</div>
		</div>
	);
}


export default ZoomComponent;
