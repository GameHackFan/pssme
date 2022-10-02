<script>
  import { PalleteEditor } from "./pallete-editor";

  export let props;
  let data;
  const setData = (newData) => {data = newData};
  const palleteEditor = new PalleteEditor(props, setData);
</script>

<style>@import url("./pallete-editor.css");</style>


<div class="pallete flex-i-row">
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    Use this window to edit the color palletes of the game.
  </span>
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    To edit a pallete, you need to select the pallete, edit its 
    colors and click on Add Changes to add the modifications you 
    made to the modification queue. If you want to edit a ROM and 
    then change it later, save a preset file and load it later.
  </span>
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    Be aware that changes made by the Level Editor or the Seed 
    Randomizer will make changes to some palletes.
  </span>
  <div>
    <span class={`warning${data.romReady ? " hidden" : ""}`}>
      Make sure you have a ROM cloned first to properly use this editor.
    </span>
    <span class={`warning${data.romReady ? " hidden" : ""}`}>
      After, click Reload Data to ensure all palletes are the default palletes.
    </span>
  </div>
  <div class={`window-content-line flex-i-col${data.romReady ? "" : " hidden"}`}>
    <span>Pallete Filter: </span>
    <input
      type="text"
      class="textfield"
      value={data.filterPalleteString}
      on:input={(e) => palleteEditor.onValueChange(e, "setFilterPalleteString")}
    />
  </div>
  <div class={`window-content-line flex-i-col${data.romReady ? "" : " hidden"}`}>
    <span>Select Pallete: </span>
    <select
      class="button-solid"
      value={data.palleteId}
      on:change={(e) => palleteEditor.onValueChange(e, "setPalleteId")}
    >
      <option value="">Select a pallete</option>
      {#each data.palleteInfoList as pi(pi.id)}
        <option value={pi.id.toString()}>
          {pi.id}: {pi.originalUsage} / {pi.pssmeUsage}
          ({pi.address}, {pi.hexAddress})
        </option>
      {/each}
    </select>
  </div>
  <div class={`color-container flex-i-col${data.showColorEdit ? "" : " hidden"}`}>
    {#each data.selectedPallete as color, index}
      <button
        class={data.colorId === index.toString() ? "color-selected" : ""}
        style={`background-color: ${color}`}
        on:click={(e) => palleteEditor.setColorId(index)}
      />
    {/each}
  </div>
  <div class={data.showColorEdit ? "" : " hidden"}>
    <div class="window-content-line flex-i-col">
      <span>Hex Mode: </span>
      <label for="hexMode" class="checkbox">
        <input
          id="hexMode"
          class="checkbox"
          type="checkbox"
          checked={data.hexMode}
          on:change={(e) => palleteEditor.toggleHexMode()}
        />
      </label>
      <div
        class="custom-color"
        style={`background-color: #${data.inputColor}`}
      ></div>
    </div>
    <div class={`window-content-line flex-i-col${data.hexMode ? "" : " hidden"}`}>
      <span>Hex Color: </span>
      <input
        type="text"
        class="textfield"
        value={data.hexColor}
        on:input={(e) => palleteEditor.onValueChange(e, "setHexColor")}
      />
    </div>
    <div class={`window-content-line flex-i-col${data.hexMode ? " hidden" : ""}`}>
      <span>Red: </span>
      <input
        type="text"
        class="textfield"
        value={data.red}
        on:input={(e) => palleteEditor.onInputDecimal(e, "setRed")}
      />
    </div>
    <div class={`window-content-line flex-i-col${data.hexMode ? " hidden" : ""}`}>
      <span>Green: </span>
      <input
        type="text"
        class="textfield"
        value={data.green}
        on:input={(e) => palleteEditor.onInputDecimal(e, "setGreen")}
      />
    </div>
    <div class={`window-content-line flex-i-col${data.hexMode ? " hidden" : ""}`}>
      <span>Blue: </span>
      <input
        type="text"
        class="textfield"
        value={data.blue}
        on:input={(e) => palleteEditor.onInputDecimal(e, "setBlue")}
      />
    </div>
  </div>
  <div class={`window-content-line flex-i-col${data.showColorEdit ? "" : " hidden"}`}>
    <button
      class="button-solid"
      on:click={(e) => palleteEditor.reloadPallete()}
    >
      Reload Pallete
    </button>
    <button
      class="button-solid"
      on:click={(e) => palleteEditor.reloadColor()}
    >
      Reload Color
    </button>
    <button
      class="button-solid"
      on:click={(e) => palleteEditor.setColor()}
    >
      Set Color
    </button>
  </div>
  <div class={`pallete-hint${data.showColorEdit ? "" : " hidden"}`}>
    <b>{data.selectedPalleteInfo?.originalUsage} </b>
    <span>uses this pallete in the original game.</span>
    <br />
    <b>{data.selectedPalleteInfo?.pssmeUsage} </b>
    <span>
      uses this pallete in PSSME Level Editor and Seed Randomizer.
    </span>
  </div>
  <div class={`window-content-line${data.romReady ? "" : " hidden"}`}>
    <button
      class="button-solid"
      on:click={(e) => palleteEditor.reloadData()}
    >
      Reload Data
    </button>
    <button
      class="button-solid"
      on:click={palleteEditor.requestFile}
    >
      Load Preset
      <input
        type="file"
        value=""
        on:change={palleteEditor.onLoadPresetFileChange}
      />
    </button>
    <button
      class="button-solid"
      on:click={(e) => palleteEditor.savePalletePresetFile()}
    >
      Save Pallete Preset
    </button>
    <button
      class="button-solid"
      on:click={(e) => palleteEditor.saveAllPresetFile()}
    >
      Save All Preset
    </button>
    <button
      class="button-solid"
      on:click={(e) => palleteEditor.addChanges()}
    >
      Add Changes
    </button>
  </div>
</div>