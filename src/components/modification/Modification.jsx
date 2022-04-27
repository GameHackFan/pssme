import React, {Component} from 'react';
import modificationService from '../../service/ModificationService';
import ModificationComponent from './ModificationComponent';


class Modification extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {};
		this.handleChange = this.handleChange.bind(this);
		this.onRemoveClick = this.onRemoveClick.bind(this);
	}

	handleChange(event)
	{
		const {name, value} = event.target;
		this.setState({[name]: value});
	}

	onRemoveClick(event)
	{
		let extras = {};

		if(this.state.priority)
		{
			extras.successMessage = "Modification is removed!";
			modificationService.remove(this.state.priority);
			this.setState({priority: ""});
		}
		else
			extras.errorMessage = "Select a modification first!";

		this.props.onActionResult(extras);
	}
	
	render()
	{
		return (
			<ModificationComponent
				handleChange={this.handleChange}
				onRemoveClick={this.onRemoveClick}
			/>
		);
	} 
}


export default Modification;