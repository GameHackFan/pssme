import React from 'react';

import "./Footer.css";


const FooterComponent = (props) =>
{
  let appVersion = "Version 0.3, \u00A9 2021";

  return (
    <footer
      id="footer"
      className="footer colLinedFlex"
      style={{zoom: props.zoom}}
    >
      <label>{appVersion}</label>
    </footer>
  );
}


export default FooterComponent;