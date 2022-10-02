<script>
  import { SeedRandomizer } from "./seed-randomizer";

  export let props;
  let data;
  const setData = (newData) => {data = newData}
  const seedRandomizer = new SeedRandomizer(props, setData);
</script>

<style>@import url("./seed-randomizer.css");</style>


<div class="randomizer flex-i-row">
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    Use this window to create a ROM with random enemies at random 
    positions based on a "Seed" and a profile you selected.
    Remember that if you inform the same "Seed" and the same values 
    it will always generate the same ROM, but the same "Seed" with 
    different values will generate a different ROM.
  </span>
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    Inside the game, several enemies are stored together and it 
    is being called enemy group. An enemy group contains 1 or 
    more enemies next to each other inside the ROM, You can change 
    the amount of enemies in an enemy group, but you must add at 
    least 1 enemy to each enemy group. Adding a lot of enemies can 
    also cause lags or crashes. The randomizer will take care to 
    cap the amount of enemies to avoid crashes.
  </span>
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    If you don't want to use the profiles available, you can select 
    the Custom profile, it will allow you to make your own random 
    profile base on several enemy randomizer strategies, if you 
    like a specific strategy, add the minimum and the maximum amount 
    of enemies for that strategy. The amount of enemies in a specific 
    group will be the sum of all enemies passed inside all enemy 
    strategies and the result must be at least 1. If it exceeds the 
    maximum amount accepted for that group, the randomizer will 
    randomly remove enemies until it reaches the maximum amount.
  </span>
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    If you want to edit the stuff made by the randomizer with the level 
    editor, select the things you want and click Save Level Editor Preset 
    and then load the saved preset in the Level Editor.
  </span>
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    Be aware that changes made by the Seed Randomizer will increase 
    or decrease the amount of bytes for all levels, so after you 
    generate a randomized ROM, using PSSME to edit the modified ROM
    will probably result in a bugged ROM.
  </span>
  <div class="window-content-line flex-i-col">
    <span>Seed: </span>
    <input
      type="text"
      class="textfield"
      value={data.seed}
      on:input={(e) => seedRandomizer.onValueChange(e, "setSeed")}
    />
    <b>
      {`(Minimum = ${Number.MIN_SAFE_INTEGER}, `}
      {`Maximum = ${Number.MAX_SAFE_INTEGER})`}
    </b>
  </div>
  <div class="window-content-line flex-i-col">
    <span>Random Profile: </span>
    <select
      class="button-solid"
      value={data.randomProfile}
      on:change={(e) => seedRandomizer.onValueChange(e, "setRandomProfile")}
    >
      <option value="">Select a random profile</option>
      {#each seedRandomizer.createRandomProfileList() as rpl}
        <option value={rpl.key}>{rpl.label}</option>
      {/each}
    </select>
  </div>
  <div class={`window-content-line flex-i-col ${data.showLevelField ? "" : " hidden"}`}>
    <span>Level: </span>
    <select
      class="button-solid"
      value={data.levelKey}
      on:change={(e) => seedRandomizer.onValueChange(e, "setLevelKey")}
    >
      <option value="">Select a level</option>
      {#each seedRandomizer.createLevelList() as ll}
        <option value={ll.key}>{ll.label}</option>
      {/each}
    </select>
  </div>
  <div class={`window-content-line flex-i-col ${data.showGroupField ? "" : " hidden"}`}>
    <span>Enemy Group: </span>
    <select
      class="button-solid"
      value={data.enemyGroupKey}
      on:change={(e) => seedRandomizer.onValueChange(e, "setEnemyGroupKey")}
    >
      <option value="">Select an enemy group</option>
      {#each data.enemyGroupList as eg}
        <option value={eg.key}>{eg.label}</option>
      {/each}
    </select>
  </div>
  <div class={`flex-i-row ${data.showStrategyFields ? "" : " hidden"}`}>
    <div class="enemy-group-text">
      <span>The original rom has</span>
      <b> {data.enemyGroup.defaultAmount} </b>
      <span>enemy(ies) in this group.</span>
      <br />
      <span>The maximum amount accepted is</span>
      <b> {data.enemyGroup.maxAmount} </b>
      <span>enemy(ies) in this group.</span>
    </div>
    <div class="enemy-group">
      {#each data.enemyStrategyList as es(es.key)}
        <div class="window-content-line flex-i-col">
          <span title={es.information}>{es.label}</span>
          <span title="Minimum Amount, must be less than the maximum.">
            Min:
          </span>
          <input
            type="text"
            class="textfield"
            value={es.randomMinAmount}
            on:input={(e) => seedRandomizer.onInputDecimal(e, "setMinimumAmount", {field: es.key})}
          />
          <span title="Maximum Amount, must be more than the minimum.">
            Max:
          </span>
          <input
            type="text"
            class="textfield"
            value={es.randomMaxAmount}
            on:input={(e) => seedRandomizer.onInputDecimal(e, "setMaximumAmount", {field: es.key})}
          />
        </div>
      {/each}
    </div>
  </div>
  <div class="window-content-line">
    <button
      class="button-solid"
      on:click={(e) => seedRandomizer.clearData()}
    >
      Clear Data
    </button>
    <button
      class="button-solid"
      on:click={seedRandomizer.requestFile}
    >
      Load Preset
      <input
        type="file"
        value=""
        on:change={seedRandomizer.onLoadPresetFileChange}
      />
    </button>
    <button
      class="button-solid"
      on:click={(e) => seedRandomizer.savePreset()}
    >
      Save Preset
    </button>
    <button
      class="button-solid"
      on:click={(e) => seedRandomizer.saveLevelEditorPreset()}
    >
      Save Level Editor Preset
    </button>
    <button
      class="button-solid"
      on:click={(e) => seedRandomizer.addChanges()}
    >
      Add Changes
    </button>
  </div>
</div>