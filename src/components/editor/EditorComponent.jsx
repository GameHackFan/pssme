import React from 'react';

import Window from '../window/Window';
import components from '../../data/Components'
import componentService from '../../service/ComponentService';

import "./Editor.css";


const EditorComponent = (props) =>
{
	let im = componentService.getInfoMap();
	let windows = new Array();

	Object.keys(im).forEach((element) =>
	{
		if(componentService.isActiveWindowContent(element))
		{
			let ci = im[element];
			windows.unshift(
				<Window
					key={element}
					windowKey={element}
					canClose={ci.canClose}
					windowTitle={ci.title}
					windowContent={components[element]}
				/>
			);
		}
	});

	return (
		<div
			id="editor"
			className="editor rowLinedFlex"
			style={{zoom: props.zoom}}
		>
			{windows}
		</div>
	);
}


export default EditorComponent;