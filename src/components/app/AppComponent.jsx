import React from 'react';

import Header from "../header/Header";
import Editor from "../editor/Editor";
import Footer from "../footer/Footer";

import "./App.css";


const AppComponent = (props) =>
{
	return (
		<div className="app">
			<Header />
			<Editor />
			<Footer />
		</div>
	);
}


export default AppComponent;