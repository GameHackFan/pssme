import React, {Component} from 'react';
import HeaderComponent from './HeaderComponent';

import editorService from '../../service/EditorService';
import zoomService from '../../service/ZoomService';


class Header extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {};
	}

	componentDidMount()
	{
		editorService.putComponent('header', this);
	}

	render()
	{
		return (
			<HeaderComponent
				zoom={zoomService.getComponentZoom("header")}
			/>
		);
	}
}


export default Header;