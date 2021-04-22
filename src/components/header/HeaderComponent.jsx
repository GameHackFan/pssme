import React from 'react';

import imageMap from '../../data/ImageMap';

import "./Header.css";


const HeaderComponent = (props) =>
{
  let logoTitle =
      "Pretty Soldier Sailor Moon Editor (Arcade)";
      
  return (
    <header
      className="header colLinedFlex"
      style={{zoom: props.zoom}}
    >
      <div className="colLinedFlex">
        <img
          src={imageMap.portraitV}
          title="Sailor V"
        />
        <img
          src={imageMap.portraitJupiter}
          title="Sailor Jupiter"
        />
        <img
          src={imageMap.portraitMercury}
          title="Sailor Mercury"
        />
        <img
          className="pssmeLogo"
          src={imageMap.pssmeLogo}
          title={logoTitle}
        />
        <img
          src={imageMap.portraitMoon}
          title="Sailor Moon"
        />
        <img
          src={imageMap.portraitMars}
          title="Sailor Mars"
        />
        <img
          src={imageMap.portraitVenus}
          title="Sailor Venus"
        />
      </div>
    </header>
  );
}


export default HeaderComponent;