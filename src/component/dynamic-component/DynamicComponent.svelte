<script>
  import ModificationManager from "../modification/ModificationManager.svelte";
  import EditorManager from "../manager/EditorManager.svelte";
  import HealthEditor from "../health/HealthEditor.svelte";
  import DamageEditor from "../damage/DamageEditor.svelte";
  import ZoomManager from "../zoom/ZoomManager.svelte";
  import FoodEditor from "../food/FoodEditor.svelte";
  import SeedRandomizer from "../randomizer/SeedRandomizer.svelte";
  import PatchManager from "../patch/PatchManager.svelte";
  import LevelEditor from "../level/LevelEditor.svelte";
  import PalleteEditor from "../pallete/PalleteEditor.svelte";


  export let componentProps;
  const componentMap =
  {
    "manager": EditorManager,
    "zoom": ZoomManager,
    "modification": ModificationManager,
    "food": FoodEditor,
    "health": HealthEditor,
    "damage": DamageEditor,
    "patch": PatchManager,
    "randomizer": SeedRandomizer,
    "level": LevelEditor,
    "pallete": PalleteEditor,
  }
  const component = componentMap[componentProps.key];
</script>


{#if component}
  <svelte:component this={component} props={componentProps} />
{/if}
