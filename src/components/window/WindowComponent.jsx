import React from 'react';


import "./Window.css";


const WindowComponent = (props) =>
{
	let showContent = props.showContent ? "block" : "none";
	let closeMethod = props.canClose ? props.closeWindow : null;
	let message = props.errorMessage ?
			props.errorMessage : props.successMessage ? 
			props.successMessage : null;
	let messageStyle = props.errorMessage ?
			"windowErrorMessage" : "windowSuccessMessage";

	return (
		<div
			id={props.windowKey}
			className="windowBox rowLinedFlex"
			style={{zoom: props.zoom}}
		>
			<div
				className="titlebar colLinedFlex"
			>
				<label>{props.windowTitle}</label>
				<div>
					<button
						className="buttonSolid"
						onClick={props.toggleText}
					>
						T
					</button>
					<button
						name="minimize"
						className="buttonSolid"
						onClick={props.toggleWindow}
					>
						_
					</button>
					<button
						name="maximize"
						className="buttonSolid"
						onClick={props.toggleWindow}
					>
						◻
					</button>
					<button
						className="buttonSolid"
						onClick={closeMethod}
						disabled={!props.canClose}
					>
						X
					</button>
				</div>
			</div>
			<div
				className="windowContent"
				style={{display: showContent}}
			>
				<props.windowContent
					actionExtras={props.actionExtras}
					actionData={props.actionData}
					onActionResult={props.onActionResult}
				/>
			</div>
			<div
				className="windowContentLine"
				style={message ? {} : {display: "none"}}
			>
				<label className={messageStyle}>
					{message}
				</label>
			</div>
		</div>
	);
}


export default WindowComponent;