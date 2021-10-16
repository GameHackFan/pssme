import React, {Component} from 'react';
import EditorComponent from './EditorComponent';

import editorService from '../../service/EditorService';
import zoomService from '../../service/ZoomService';


class Editor extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {};
	}

	componentDidMount()
	{
		editorService.putComponent('editor', this);
	}

	render()
	{
		return (
			<EditorComponent
				zoom={zoomService.getComponentZoom("editor")}
			/>
		);
	}
}


export default Editor;