import React, {Component} from 'react';
import WindowComponent from './WindowComponent';

import editorService from '../../service/EditorService';
import zoomService from '../../service/ZoomService';


class Window extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {showContent: true};
		this.toggleWindow = this.toggleWindow.bind(this);
		this.closeWindow = this.closeWindow.bind(this);
		this.onActionResult = this.onActionResult.bind(this);
		this.createMessage = this.createMessage.bind(this);
		this.toggleText = this.toggleText.bind(this);
	}

	componentDidMount()
	{
		editorService.putComponent(this.props.windowKey, this);
	}

	toggleText(event)
	{
		let w = event.target.parentNode.parentNode.parentNode;
		let wt = w.getElementsByClassName('windowText');
		let s;

		for(let i = 0; i < wt.length; i++)
		{
			s = wt[i].attributeStyleMap.get("display");

			if(s && s.value === "block")
				wt[i].attributeStyleMap.set("display", "none");
			else
				wt[i].attributeStyleMap.set("display", "block");
		}
	}

	toggleWindow(event)
	{
		editorService.toggleWindow(this.props.windowKey,
				event.target.name === "maximize");
	}

	closeWindow(event)
	{
		editorService.closeWindow(this.props.windowKey);
	}

	onActionResult(extras)
	{
		let s = this.createMessage(extras);
		s.actionExtras = extras;
		s.actionData = extras.actionData;
		this.setState(s, () =>
		{
			setTimeout(() =>
			{
				let clear = this.createMessage({});
				this.setState(clear);
			}, 3500);
		});
	}

	createMessage(extras)
	{
		let message = {}
		message.successMessage = extras.successMessage;
		message.errorMessage = extras.errorMessage;
		return message;
	}

	render()
	{
		return (
			<WindowComponent
				zoom={zoomService.getComponentZoom(this.props.windowKey)}
				windowKey={this.props.windowKey}
				canClose={this.props.canClose}
				windowTitle={this.props.windowTitle}
				windowContent={this.props.windowContent}
				showContent={this.state.showContent}
				actionExtras={this.state.actionExtras}
				actionData={this.state.actionData}
				successMessage={this.state.successMessage}
				errorMessage={this.state.errorMessage}
				toggleText={this.toggleText}
				toggleWindow={this.toggleWindow}
				closeWindow={this.closeWindow}
				onActionResult={this.onActionResult}
			/>
		);
	} 
}


export default Window;