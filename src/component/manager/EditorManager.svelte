<script>
  import { EditorManager } from "./editor-manager";

  export let props;
  let data;
  const setData = (newData) => {data = newData};
  const editorManager = new EditorManager(props, setData);
</script>

<style>@import url("./editor-manager.css");</style>


<div class="manager flex-i-row">
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    This is the main window of the editor. Here you can enable all 
    the features this editor offers. Here you can also load, clone 
    and generate a ROM.
  </span>
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    The hack author field allows you to write the name of the author 
    of the hack, it will be shown in the title screen of the game.
    This feature will not work for a seed randomized ROM.
  </span>
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    Before start editing the ROM, you need to load and clone it.
    After adding the desired changes you made to the modification
    queue, you need to click on Generate ROM to create the ROM's 
    .zip file. Keep in mind that the process to generate a ROM is 
    a little bit slow, so be patient and wait a little bit.
  </span>
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    After you generate a ROM, don't use that same hack ROM on
    PSSME, the changes made by the Seed Randomizer and the Level 
    Editor might change the position of important bytes and trying 
    to edit a hack like that with PSSME will probably result in a 
    bugged ROM, make sure you're editing the original game's ROM.
  </span>
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    If you generated a ROM lacking some changes you wanted to add, 
    You can use the Clone ROM button to restore the ROM you loaded, 
    add the changes you forgot and then generate a ROM again.
  </span>
  <div class="window-content-line flex-i-col">
    <span>Hack Author: </span>
    <input
      class="textfield"
      type="text"
      value={data.hackAuthor}
      on:input={(e) => editorManager.onValueChange(e, "setHackAuthor")}
    />
    <b>(Maximum 20 characters)</b>
  </div>
  <div class="window-content-line flex-i-col">
    <span>Window Selector: </span>
    <select
      class="button-solid"
      on:change={editorManager.onWindowSelected}
    >
      <option value="">
        Select a window
      </option>
      {#each editorManager.getValidWindowComponentDataList() as cd}
        <option value={cd.key}>{cd.title}</option>
      {/each}
    </select>
  </div>
  <div>
    <button
      class="button-solid"
      on:click={editorManager.requestFile}
    >
      Load Original ROM
      <input
        type="file"
        value=""
        on:change={editorManager.onLoadROMFileChange}
      />
    </button>
    <button
      class="button-solid"
      on:click={(e) => editorManager.cloneROM()}
    >
      Clone ROM
    </button>
    <button
      class="button-solid"
      on:click={(e) => editorManager.generateROM()}
    >
      Generate ROM
    </button>
  </div>
  <div
    class={`window-content-line flex-i-col${data.generatingROM ? "" : " hidden"}`}
  >
    <span class="rom-message">
      Please wait, the ROM is being generated.
    </span>
  </div>
</div>