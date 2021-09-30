import React from 'react';

import "./Footer.css";


const FooterComponent = (props) =>
{
  let appVersion = "Version 0.7, \u00A9 2021";

  return (
    <footer
      id="footer"
      className="footer colLinedFlex"
      style={{zoom: props.zoom}}
    >
      <div className="colLinedFlex">
        <a href="https://github.com/GameHackFan/pssme" target="_blank">
          Source Code
        </a>
        <label>{appVersion}</label>
      </div>
    </footer>
  );
}


export default FooterComponent;