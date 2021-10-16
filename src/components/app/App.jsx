
import React, {Component} from 'react';
import AppComponent from './AppComponent';

import editorService from '../../service/EditorService';


class App extends Component
{
	componentDidMount()
	{
		editorService.putComponent("app", this);
	}

	render()
	{
		return (<AppComponent />);
	}
}


export default App;