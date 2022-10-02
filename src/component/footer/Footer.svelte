<script>
  import { Footer } from "./footer";

  let data;
  const setData = (newData) => {data = newData}
  const footer = new Footer(setData);
</script>

<style>@import url("./footer.css");</style>


<!-- svelte-ignore component-name-lowercase -->
<footer id="footer" class="footer" style={`zoom: ${data.zoom}`}>
  <div class="flex-i-col">
    <a href="https://github.com/GameHackFan/pssme" target="_blank">
      Source Code
    </a>
    <span>{data.appVersion}</span>
  </div>
</footer>