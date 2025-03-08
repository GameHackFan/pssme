<script>
  import { StageOrderEditor } from "./stage-order-editor";

  export let props;
  let data;
  const setData = (newData) => {data = newData};
  const stageOrderEditor = new StageOrderEditor(props, setData);
</script>

<style>@import url("./stage-order-editor.css");</style>


<div class="order flex-i-row">
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    Use this window to edit the order of the stages in the game.
    You can save and load a 'Preset' with the changes you like.
  </span>
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    Select a stage and then select a value between 0 and 9 to 
    be the new stage order. Do not use duplicated order value, 
    and only use the order value 9 if you are using the
    'Extra Stage Patch'.
    Stage 8 needs to be the last stage or the game will behave
    weirdly, not showing lifebars anymore.
    Also make sure all stages has a valid value in order to not
    lose any stage pointer.
  </span>
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    After doing your changes, click Add Changes to put your 
    changes in the modification queue. If you want to edit a 
    ROM and then change it later, save a preset file and 
    load it later.
  </span>
  <div class="window-content-line flex-i-col">
    <span>Stage: </span>
    <select
      class="button-solid"
      value={data.stageKey}
      on:change={(e) => stageOrderEditor.onValueChange(e, "setStageKey")}
    >
      <option value="">Select a stage</option>
      {#each stageOrderEditor.createStageOrderDataList() as sod}
        <option value={sod.key}>{sod.label}</option>
      {/each}
    </select>
  </div>
  <div class={`window-content-line flex-i-col${data.showOrderField ? "" : " hidden"}`}>
    <span>Order: </span>
    <select
      class="button-solid"
      value={data.order}
      on:change={(e) => stageOrderEditor.onValueChange(e, "setStageOrder")}
    >
      <option value="">Select an order</option>
      {#each stageOrderEditor.createStageOrderValueList() as sov}
        <option value={sov}>{sov}</option>
      {/each}
    </select>
    <button
      class="button-solid"
      on:click={(e) => stageOrderEditor.setStageOrderToDefault()}
    >
      Default Value
    </button>
  </div>
  <div class="window-content-line">
    <button
      class="button-solid"
      on:click={(e) => stageOrderEditor.clearData()}
    >
      Clear Data
    </button>
    <button
      class="button-solid"
      on:click={stageOrderEditor.requestFile}
    >
      Load Preset
      <input
        type="file"
        value=""
        on:change={stageOrderEditor.onLoadPresetFileChange}
      />
    </button>
    <button
      class="button-solid"
      on:click={(e) => stageOrderEditor.savePresetFile()}
    >
      Save Preset
    </button>
    <button
      class="button-solid"
      on:click={(e) => stageOrderEditor.addChanges()}
    >
      Add Changes
    </button>
  </div>
</div>