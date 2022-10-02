<script>
  import { ModificationManager } from "./modification-manager";

  export let props;
  let data;
  const setData = (newData) => {data = newData}
  const modificationManager = new ModificationManager(props, setData);
</script>

<style>@import url("./modification-manager.css");</style>


<div class="modification flex-i-row">
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    This window allow you to see and remove all the modifications 
    you added to the queue. The modifications in this queue will 
    be applied in the ROM at the moment you generate the ROM.
  </span>
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    To remove some unwanted modifications you added, select a 
    modification and click the Remove button.
  </span>
  <div class="window-content-line flex-i-col">
    <select
      size='10'
      on:change={(e) => modificationManager.onValueChange(e, "setModificationSelected")}
    >
      <option value="">
        No selection.
      </option>
      {#each data.modificationList as md(md.priority)}
        <option value={md.priority}>
          {`${md.componentLabel}, ${md.complementLabel}, Priority ${md.priority}`}
        </option>
      {/each}
    </select>
  </div>
  <div>
    <button
      class="button-solid"
      on:click={(e) => modificationManager.remove()}
    >
      Remove
    </button>
    <button
      class="button-solid"
      on:click={(e) => modificationManager.removeAll()}
    >
      Remove All
    </button>
  </div>
</div>



<!--
let options = new Array();
let md = modificationService.getModificationData();

Object.keys(md).forEach((k) =>
{
  let d = md[k];

  options.push(
    <option key={k} value={k}>
      {`${d.componentLabel}, ${d.complementLabel}, Priority ${k}`}
    </option>
  );
});
-->