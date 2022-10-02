<script>
  import { ZoomManager } from "./zoom-manager";

  export let props;
  let data;
  const setData = (newData) => {data = newData};
  const zoomManager = new ZoomManager(props, setData);
</script>

<style>@import url("./zoom-manager.css");</style>


<div class="zoom flex-i-row">
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    Use this window to edit the zoom of the components of the 
    editor, adjusting it in a way that makes it more confortable 
    for you. You can save and load a 'Preset' with the changes
    you like.
  </span>
  <div class="window-content-line flex-i-col">
    <span>Edit Zoom: </span>
    <select
      class="button-solid"
      value={data.componentKey}
      on:change={(e) => zoomManager.onValueChange(e, "setComponentKey")}
    >
      <option value="">
        Select a component
      </option>
      {#each data.componentDataList as cdl}
        <option value={cdl.key}>{cdl.title}</option>
      {/each}
    </select>
  </div>
  <div
    class={`window-content-line flex-i-col${data.showZoomField ? "" : " hidden"}`}
  >
    <span>Zoom: </span>
    <input
      type="text"
      class="textfield"
      value={data.componentZoom}
      on:input={(e) => zoomManager.onValueChange(e, "setComponentZoom")}
    />
  </div>
  <div class="window-content-line">
    <button
      class="button-solid"
      on:click={(e) => zoomManager.clearChanges()}
    >
      Clear Changes
    </button>
    <button
      class="button-solid"
      on:click={zoomManager.requestFile}
    >
      Load Preset
      <input
        type="file"
        value=""
        on:change={zoomManager.onLoadPresetFileChange}
      />
    </button>
    <button
      class="button-solid"
      on:click={(e) => zoomManager.onSavePreset()}
    >
      Save Preset
    </button>
  </div>
</div>