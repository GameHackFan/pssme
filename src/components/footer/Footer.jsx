import React, {Component} from 'react';
import FooterComponent from './FooterComponent';

import editorService from '../../service/EditorService';
import zoomService from '../../service/ZoomService';


class Footer extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {};
	}

	componentDidMount()
	{
		editorService.putComponent('footer', this);
	}

	render()
	{
		return (
			<FooterComponent
				zoom={zoomService.getComponentZoom("footer")}
			/>
		);
	}
}


export default Footer;