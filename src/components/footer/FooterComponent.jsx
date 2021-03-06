import React from 'react';

import "./Footer.css";


const FooterComponent = (props) =>
{
	let appVersion = "Version 1.6, \u00A9 2021-2022";

	return (
		<footer
			id="footer"
			className="footer colLinedFlex"
			style={{zoom: props.zoom}}
		>
			<div className="colLinedFlex">
				<div className="colLinedFlex">
					<a href="https://github.com/GameHackFan/pssme" target="_blank">
						Source Code
					</a>
					<label>{appVersion}</label>
				</div>
			</div>
		</footer>
	);
}


export default FooterComponent;