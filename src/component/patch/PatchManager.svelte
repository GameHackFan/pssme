
<script>
  import { PatchManager } from "./patch-manager";

  export let props
  let data;
  const setData = (newData) => {data = newData};
  const patchManager = new PatchManager(props, setData);
</script>

<style>@import url("./patch-manager.css");</style>


<div class="patch flex-i-row">
  <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
    Use this window to apply patches to the ROM. 
    Select a patch and click in apply patch to apply the 
    selected patch. You can also apply a patch from a file.
  </span>
  <div class="window-content-line flex-i-col">
    <span>Patch: </span>
    <select
      class="button-solid"
      value={data.patchKey}
      on:change={(e) => patchManager.onValueChange(e, "setPatchKey")}
    >
      <option value="">Select a patch</option>
      {#each data.patchList as patch(patch.key)}
        <option value={patch.key}>{patch.label}</option>
      {/each}
    </select>
  </div>
  <div class="patch-description window-content-line flex-i-col">
    <span class={`window-text${data.componentData.showHintText ? "" : " hidden"}`}>
      {data.selectedPatch?.text ? data.selectedPatch.text : ""}
    </span>
  </div>
  <div class="window-content-line">
    <button
      class="button-solid"
      on:click={patchManager.addPatch}
    >
      Add Patch
    </button>
    <button
      class="button-solid"
      on:click={patchManager.requestFile}
    >
      Add Patch From File
      <input
        type="file"
        value=""
        on:change={patchManager.onLoadPatchFileChange}
      />
    </button>
  </div>
</div>