import React from 'react';

import componentService from
    '../../service/ComponentService';

import "./Manager.css";


const ManagerComponent = (props) =>
{
  let options = new Array();
  let im = componentService.getInfoMap();

  Object.keys(im).forEach((e) =>
  {
    let ci = im[e];

    if(e !== "manager" && ci.type === "windowContent")
    {
      options.push(
        <option key={e} value={e}>
          {ci.title}
        </option>
      );
    }
  });

  return (
    <div className="manager rowLinedFlex">
      <label className="windowText">
        This is the main window of the editor. Here you can enable all the features this editor offers. Here you can also load, clone and generate a ROM. Before start editing the ROM, you need to load and clone it. After doing all the changes desired, you need to click on Generate ROM to create the .zip file of the rom. Keep in mind that the process to generate a ROM is a little bit slow, so be patient and wait a little bit. If you applied changes made by the Seed Randomizer and the Level Editor, the byte order might change and apply more changes from those 2 windows might crash the ROM, so make sure you do all changes needed first before applying them to the ROM. You can also clone the ROM in case you did unwanted changes, it will clone the ROM loaded and overwrite all changes made.
      </label>
      <div className="colLinedFlex windowContentLine">
        <label>Window Selector: </label>
        <select
          className="buttonSolid"
          onChange={props.handleChange}
        >
          <option key="none" value="none">
            Select a window
          </option>
          {options}
        </select>
      </div>
      <div>
        <button
          className="buttonSolid"
          onClick={props.requestFile}
        >
          Load Original ROM
          <input
            type="file"
            value=""
            onChange={props.onLoadROMFileChange}
          />
        </button>
        <button
          className="buttonSolid"
          onClick={props.onCloneROMClick}
        >
          Clone ROM
        </button>
        <button
          className="buttonSolid"
          onClick={props.onGenerateROMClick}
        >
          Generate ROM
        </button>
      </div>
    </div>
  );
}


export default ManagerComponent;