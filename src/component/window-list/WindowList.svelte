<script>
  import { WindowList } from "./window-list";
  import Window from "../window/Window.svelte";

  let data;
  const setData = (newData) => {data = newData};
  const windowList = new WindowList(setData);
</script>

<style>@import url("./window-list.css");</style>


<div
  id="windowList"
  class="window-list flex-i-row"
  style={`zoom: ${data.zoom}`}
>
  {#each data.activeWindowList as awl(awl.key)}
    <Window windowKey={awl.key} />
  {/each}
</div>