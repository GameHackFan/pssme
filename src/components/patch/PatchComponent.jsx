import React from 'react';

import "./Patch.css";


const PatchComponent = (props) =>
{
	let options = new Array();
	let patchMapKeys = Object.keys(props.patchMap);
	let selectedPatch = props.patchMap[props.patchKey];
	selectedPatch = selectedPatch ? selectedPatch : {};

	patchMapKeys.forEach((e) =>
	{
		let patch = props.patchMap[e];

		if(patch.show)
		{
			options.push(
				<option key={e} value={e}>
					{patch.label}
				</option>
			);
		}
	});

	return (
		<div className="patch rowLinedFlex">
			<label className="windowText">
				Use this window to apply patches to the ROM. Select a patch and 
				click Add Patch to add the selected patch to the modification 
				queue. You can also add a patch from a valid JSON file patch.
			</label>
			<div className="windowContentLine colLinedFlex">
				<label>Patch: </label>
				<select
					name="patchKey"
					className="buttonSolid"
					value={props.patchKey}
					onChange={props.handleChange}
				>
					<option key="-1" value="">
						Select a patch
					</option>
					{options}
				</select>
			</div>
			<div className="windowContentLine colLinedFlex">
				<span className="windowText">
					{selectedPatch.text}
				</span>
			</div>
			<div className="windowContentLine">
				<button
					className="buttonSolid"
					onClick={props.onAddPatchClick}
				>
					Add Patch
				</button>
				<button
					className="buttonSolid"
					onClick={props.requestFile}
				>
					Add Patch From File
					<input
						type="file"
						value=""
						onChange={props.onAddPatchFileChange}
					/>
				</button>
			</div>
		</div>
	);
}


export default PatchComponent;