import React from 'react';

import modificationService from '../../service/ModificationService';

import "./Modification.css";


const ModificationComponent = (props) =>
{
	let options = new Array();
	let md = modificationService.getModificationData();

	Object.keys(md).forEach((k) =>
	{
		let d = md[k];

		options.push(
			<option key={k} value={k}>
				{`${d.componentLabel}, ${d.complementLabel}, Priority ${k}`}
			</option>
		);
	});

	return (
		<div className="modification rowLinedFlex">
			<label className="windowText">
				This window allow you to see and remove all the modifications 
				you added to the queue. The modifications in this queue will 
				be applied in the ROM at the moment you generate the ROM.
			</label>
			<label className="windowText">
				To remove some unwanted modifications you added, select a 
				modification and click the Remove button.
			</label>
			<div className="colLinedFlex windowContentLine">
				<select
					name="priority"
					size='10'
					onChange={props.handleChange}
				>
					<option key="none" value="">
						No selection.
					</option>
					{options}
				</select>
			</div>
			<div>
				<button
					className="buttonSolid"
					onClick={props.onRemoveClick}
				>
					Remove
				</button>
			</div>
		</div>
	);
}


export default ModificationComponent;