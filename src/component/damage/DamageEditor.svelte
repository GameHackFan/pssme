<script>
  import { DamageEditor } from "./damage-editor";

  export let props;
  let data;
  const setData = (newData) => {data = newData}
  const damageEditor = new DamageEditor(props, setData);
</script>

<style>@import url("./damage-editor.css");</style>


<div class="character-damage flex-i-row">
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    Use this window to edit how much damage a character's 
    attack will do.
  </span>
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    Select a character and an attack, then type a value 
    between 0 and 255 to be the new damage value, values 
    outside that range will be ignored.
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
      on:change={(e) => damageEditor.onValueChange(e, "setCharacterKey")}
    >
      <option value="">
        Select a character
      </option>
      {#each damageEditor.createCharacterDataList() as cdl}
        <option value={cdl.key}>{cdl.label}</option>
      {/each}
    </select>
  </div>
  <div
    class={`window-content-line flex-i-col${data.showAttackField ? "" : " hidden"}`}
  >
    <span>Attack: </span>
    <select
      class="button-solid"
      value={data.attackKey}
      on:change={(e) => damageEditor.onValueChange(e, "setAttackKey")}
    >
      <option value="">
        Select an attack
      </option>
      {#each data.attackDataList as adl}
        <option value={adl.key}>{adl.label}</option>
      {/each}
    </select>
  </div>
  <div
    class={`window-content-line flex-i-col${data.showDamageField ? "" : " hidden"}`}
  >
    <span>Damage: </span>
    <input
      type="text"
      class="textfield"
      value={data.damage}
      on:input={(e) => damageEditor.onInputDamage(e, "setDamage")}
    />
    <button
      class="button-solid"
      on:click={(e) => damageEditor.setDamageToDefault()}
    >
      Default Value
    </button>
  </div>
  <div class="window-content-line">
    <button
      class="button-solid"
      on:click={(e) => damageEditor.clearData()}
    >
      Clear Data
    </button>
    <button
      class="button-solid"
      on:click={damageEditor.requestFile}
    >
      Load Preset
      <input
        type="file"
        value=""
        on:change={damageEditor.onLoadPresetFileChange}
      />
    </button>
    <button
      class="button-solid"
      on:click={(e) => damageEditor.savePresetFile()}
    >
      Save Preset
    </button>
    <button
      class="button-solid"
      on:click={(e) => damageEditor.addChanges()}
    >
      Add Changes
    </button>
  </div>
</div>