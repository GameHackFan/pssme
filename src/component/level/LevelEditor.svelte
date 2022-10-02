<script>
  import { LevelEditor } from "./level-editor";

  export let props;
  let data;
  const setData = (newData) => {data = newData};
  const levelEditor = new LevelEditor(props, setData);
</script>

<style>@import url("./level-editor.css");</style>


<div class="level flex-i-row">
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    Use this window to edit all the enemies in all levels.
  </span>
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    Here you can choose what enemy or item will spawn, change 
    the position to trigger their spawn and change their X and 
    Y positions.
  </span>
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    You need to select the level and the enemy group to be able 
    to add, remove or edit an enemy or item.
  </span>
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    Click Add Changes and it will add all changes made here in
    the modification queue. Click in Save Preset and it will 
    save a file containing all the customizations. Click in 
    Load Preset to load a file contaning all the customizations 
    you saved previously.
  </span>
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    The Trigger Position, the Position X and Y always have a 
    minimum and maximum value. The editor will allow you to 
    insert any value you want but it will fix those values to 
    be the maximum or the minimum possible to avoid the game 
    to have weird behavior. It is recommended that you always 
    insert valid values between the maximum and the minimum 
    value to avoid having surprises about the enemies being 
    automatically moved by the editor when you apply the 
    customizations.
  </span>
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    Be aware that changes made by the Level Editor will increase 
    or decrease the amount of bytes for all levels, so after you
    generate a rom, changes made here will modify the ROM in a way 
    that editing it again with PSSME will probably result in a 
    bugged ROM. Make sure you're editing the original ROM so you 
    don't end up with a bugged ROM. If you want to edit a ROM and 
    then change it later, save a preset file and load it later so 
    you don't lose the progress of your customizations.
  </span>
  <div class="window-content-line flex-i-col">
    <span>Level: </span>
    <select
      class="button-solid"
      value={data.levelKey}
      on:change={(e) => levelEditor.onValueChange(e, "setLevelKey")}
    >
      <option value="">Select a level</option>
      {#each levelEditor.createLevelList() as lvl}
        <option value={lvl.key}>{lvl.label}</option>
      {/each}
    </select>
  </div>
  <div class={`window-content-line flex-i-col${data.showGroupField ? "" : " hidden"}`}>
    <span>Enemy Group: </span>
    <select
      class="button-solid"
      value={data.enemyGroupKey}
      on:change={(e) => levelEditor.onValueChange(e, "setEnemyGroupKey")}
    >
      <option value="">Select an enemy group</option>
      {#each data.enemyGroupList as e(e.key)}
        <option value={e.key}>{e.label}</option>
      {/each}
    </select>
  </div>
  <div class={`enemy-group${data.showLevelEditArea ? "" : " hidden"}`}>
    <div class={`level-display${data.enemyGroup.hasElevator ? " .vertical-scroll" : ""}`}>
      <img src={data.levelAreaImage} alt="Current Area"/>
    </div>
    <div class="enemy-group-text">
      <span>The original rom has</span>
      <b> {data.enemyGroup.defaultAmount} </b>
      <span>object(s) in this group.</span>
      <br />
      <span>The maximum amount accepted is</span>
      <b> 14 </b>
      <span>enemy(ies) per group.</span>
      <br />
      <span>If you insert more than </span>
      <b>14</b>
      <span>
        , the editor will remove the extra enemy(ies) to avoid 
        the game to crash.
      </span>
    </div>
    <div class="hint-text">
      <span>
        <b>Cyan Line: </b>
        Represents the limits of the group.
      </span>
      <span>
        <b>Green Line: </b>
        Represents the position of the camera that will 
        trigger the enemy being spawned.
      </span>
      <span>
        <b>Golden Line: </b>
        Represets the camera's field of view.
      </span>
    </div>
    <div class="window-content-line flex-i-col">
      <button
        class="button-solid"
        on:click={(e) => levelEditor.addEnemy()}
      >
        Add
      </button>
      <button
        class="button-solid"
        on:click={(e) => levelEditor.removeEnemy()}
      >
        Remove Selected
      </button>
      <button
        class="button-solid"
        on:click={(e) => levelEditor.refreshImage()}
      >
        Refresh Image
      </button>
    </div>
    <div class="window-content-line flex-i-col">
      <span>Enemy ID: </span>
      <select
        class="button-solid"
        value={data.enemyId}
        on:change={(e) => levelEditor.onValueChange(e, "setEnemyId")}
      >
        <option value="">Select an enemy id</option>
        {#each data.enemyAddedList as ea(ea.id)}
          <option value={ea.id}>{ea.label}</option>
        {/each}
      </select>
    </div>
    <div class={data.showEnemyFields ? "" : " hidden"}>
      <div class="window-content-line flex-i-col">
        <span>Enemy / Item Filter: </span>
        <input
          type="text"
          class="textfield"
          value={data.filterEnemyString}
          on:input={(e) => levelEditor.onValueChange(e, "setFilterEnemyString")}
        />
      </div>
      <div class="window-content-line flex-i-col">
        <span>Enemy / Items: </span>
        <select
          class="button-solid"
          value={data.enemy.enemyKey}
          on:change={(e) => levelEditor.onValueChange(e, "setEnemyKey")}
        >
          {#each data.enemyFilteredList as e(e.key)}
            <option value={e.key}>{e.label}</option>
          {/each}
        </select>
      </div>
      <div class="window-content-line flex-i-col">
        <span>Trigger Position: </span>
        <input
          type="text"
          class="textfield"
          value={data.enemy.triggerPosition}
          title="Position that will activate the enemy spawn."
          on:input={(e) => levelEditor.onInputDecimal(e, "setEnemyTriggerPosition")}
        />
        <b>
          {`(Minimum = ${data.enemyGroup.screenPositionStart}`}
          {`, Maximum = ${data.enemyGroup.screenPositionEnd})`}
        </b>
      </div>
      <div class="window-content-line flex-i-col">
        <span>Position X: </span>
        <input
          type="text"
          class="textfield"
          value={data.enemy.positionX}
          on:input={(e) => levelEditor.onValueChange(e, "setEnemyPositionX")}
        />
        <b>(Recommended Values from -130 to 450)</b>
      </div>
      <div class="window-content-line flex-i-col">
        <span>Position Y: </span>
        <input
          type="text"
          class="textfield"
          value={data.enemy.positionY}
          on:input={(e) => levelEditor.onInputDecimal(e, "setEnemyPositionY")}
        />
        <b>
          {`(Recommended Values between ${data.enemyGroup.walkablePositionYTop}`}
          {` and ${data.enemyGroup.walkablePositionYBottom})`}
        </b>
      </div>
    </div>
  </div>
  <div class="window-content-line">
    <button
      class="button-solid"
      on:click={(e) => levelEditor.clearData()}
    >
      Clear Data
    </button>
    <button
      class="button-solid"
      on:click={levelEditor.requestFile}
    >
      Load Preset
      <input
        type="file"
        value=""
        on:change={levelEditor.onLoadPresetFileChange}
      />
    </button>
    <button
      class="button-solid"
      on:click={(e) => levelEditor.savePreset()}
    >
      Save Preset
    </button>
    <button
      class="button-solid"
      on:click={(e) => levelEditor.addChanges()}
    >
      Add Changes
    </button>
  </div>
</div>