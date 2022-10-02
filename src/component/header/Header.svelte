<script>
  import { Header } from "./header";

  let data;
  const setData = (newData) => {data = newData};
  const header = new Header(setData);
</script>

<style>@import url("./header.css");</style>


<!-- svelte-ignore component-name-lowercase -->
<header class="header flex-i-col" style={`zoom: ${data.zoom}`}>
  <div class="flex-i-col">
    <img src={data.imageMap.portraitV} alt="Sailor V" />
    <img src={data.imageMap.portraitJupiter} alt="Sailor Jupiter" />
    <img src={data.imageMap.portraitMercury} alt="Sailor Mercury" />
    <img
      class="pssmeLogo"
      src={data.imageMap.pssmeLogo}
      alt="Pretty Soldier Sailor Moon Editor (Arcade)"
    />
    <img src={data.imageMap.portraitMoon} alt="Sailor Moon" />
    <img src={data.imageMap.portraitMars} alt="Sailor Mars" />
    <img src={data.imageMap.portraitVenus} alt="Sailor Venus" />
  </div>
</header>