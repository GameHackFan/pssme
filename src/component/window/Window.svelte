<script>
  import { Window } from "./window";
  import DynamicComponent from "../dynamic-component/DynamicComponent.svelte";

  export let windowKey;
  let data;
  const setData = (newData) => {data = newData};
  const window = new Window(windowKey, setData);
</script>

<style>@import url("./window.css");</style>


<div
  id={data.key}
  class="window-box flex-i-row"
  style={`zoom: ${data.zoom}`}
>
  <div class="titlebar flex-i-col">
    <span>{data.componentData.title}</span>
    <div>
      <button
        class="button-solid bi bi-chat-text"
        title="Toggle Text"
        on:click={window.toggleHintText}
      />
      <button
        class="button-solid bi bi-sunglasses"
        title="Toggle Content"
        on:click={window.toggleContent}
      />
      <button
        class="button-solid bi bi-window-x"
        on:click={window.closeWindow}
        title="Close Window"
        disabled={!data.componentData.canClose}
      />
    </div>
  </div>
  <div
    class="window-content"
    style={`${data.componentData.showContent ? "" : "display: none"}`}
  >
    <DynamicComponent
      componentProps=
      {
        {
          key: windowKey,
          window: window
        }
      }
    />
  </div>
  <div class={`window-content-line${data.showMessage ? "" : " hidden"}`}>
    <span class={`window-${data.hasError ? "error" : "success"}-message`}>
      {data.message}
    </span>
  </div>
</div>