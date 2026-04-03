<script>
  import { onMount } from "svelte";
  import Player from "./player/Player.svelte";

  import { Timer } from "taleem-pam";
  import { resolveAssetPaths } from "./lib/utils/index.js";

  let deck = null;
  let links = null;
  
  let timer;

  async function loadDeck() {
    const res = await fetch("/public/specs/goldenDeckV2.json");
    const json = await res.json();
    deck = resolveAssetPaths(json,"/public/images/");

    // Now download links 
    const resLinks = await fetch("/data/links.json");
    links = await resLinks.json();
  }

  onMount(async () => {
    await loadDeck();
    timer = new Timer();

    // timer.play();
  });
</script>

{#if deck && timer && links}
  <Player {deck} {timer} {links}/>
{/if}