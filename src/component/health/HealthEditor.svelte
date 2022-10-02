<script>
  import { HealthEditor } from "./health-editor";

  export let props;
  let data;
  const setData = (newData) => {data = newData};
  const healthEditor = new HealthEditor(props, setData);
</script>

<style>@import url("./health-editor.css");</style>


<div class="health flex-i-row">
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    Use this window to edit how much health a character will have.
  </span>
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    Select a character and then type a value between 0 and 
    255 to be the new health value, values outside that range 
    will be ignored.
  </span>
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    After doing your changes, click Add Changes to put your 
    changes in the modification queue. If you want to edit a 
    ROM and then change it later, save a preset file and 
    load it later.
  </span>
  <div class="window-content-line flex-i-col">
    <span>Character: </span>
    <select
      class="button-solid"
      value={data.characterKey}
      on:change={(e) => healthEditor.onValueChange(e, "setCharacterKey")}
    >
      <option value="">Select a character</option>
      {#each healthEditor.createCharacterHealthList() as chl}
        <option value={chl.key}>{chl.label}</option>
      {/each}
    </select>
  </div>
  <div class={`window-content-line flex-i-col${data.showHealthField ? "" : " hidden"}`}>
    <span>Health: </span>
    <input
      type="text"
      class="textfield"
      value={data.health}
      on:input={(e) => healthEditor.onInputDecimal(e, "setHealth")}
    />
    <button
      class="button-solid"
      on:click={(e) => healthEditor.setHealthToDefault()}
    >
      Default Value
    </button>
  </div>
  <div class="window-content-line">
    <button
      class="button-solid"
      on:click={(e) => healthEditor.clearData()}
    >
      Clear Data
    </button>
    <button
      class="button-solid"
      on:click={healthEditor.requestFile}
    >
      Load Preset
      <input
        type="file"
        value=""
        on:change={healthEditor.onLoadPresetFileChange}
      />
    </button>
    <button
      class="button-solid"
      on:click={(e) => healthEditor.savePresetFile()}
    >
      Save Preset
    </button>
    <button
      class="button-solid"
      on:click={(e) => healthEditor.addChanges()}
    >
      Add Changes
    </button>
  </div>
</div>