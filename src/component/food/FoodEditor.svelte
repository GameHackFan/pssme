<script>
  import { FoodEditor } from "./food-editor";

  export let props;
  let data;
  const setData = (newData) => {data = newData};
  const foodEditor = new FoodEditor(props, setData);
</script>

<style>@import url("./food-editor.css");</style>


<div class="food flex-i-row">
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    Use this window to edit how much each food will heal.
  </span>
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    Select a food and type a value between 0 and 255 to be the 
    new heal value, values outside that range will be ignored.
  </span>
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    After doing your changes, click Add Changes to put your 
    changes in the modification queue. If you want to edit a 
    ROM and then change it later, save a preset file and 
    load it later.
  </span>
  <div class="window-content-line flex-i-col">
    <span>Food: </span>
    <select
      class="button-solid"
      value={data.foodKey}
      on:change={(e) => foodEditor.onValueChange(e, "setFoodKey")}
    >
      <option value="">Select a food</option>
      {#each foodEditor.createFoodHealList() as fhl}
        <option value={fhl.key}>{fhl.label}</option>
      {/each}
    </select>
  </div>
  <div class={`window-content-line flex-i-col${data.showHealField ? "" : " hidden"}`}>
    <span>Food Heal: </span>
    <input
      type="text"
      class="textfield"
      value={data.foodHeal}
      on:input={(e) => foodEditor.onInputDecimal(e, "setFoodHeal")}
    />
    <button
      class="button-solid"
      on:click={(e) => foodEditor.setFoodHealToDefault()}
    >
      Default Value
    </button>
  </div>
  <div class="window-content-line">
    <button
      class="button-solid"
      on:click={(e) => foodEditor.clearData()}
    >
      Clear Data
    </button>
    <button
      class="button-solid"
      on:click={foodEditor.requestFile}
    >
      Load Preset
      <input
        type="file"
        value=""
        on:change={foodEditor.onLoadPresetFileChange}
      />
    </button>
    <button
      class="button-solid"
      on:click={(e) => foodEditor.savePresetFile()}
    >
      Save Preset
    </button>
    <button
      class="button-solid"
      on:click={(e) => foodEditor.addChanges()}
    >
      Add Changes
    </button>
  </div>
</div>