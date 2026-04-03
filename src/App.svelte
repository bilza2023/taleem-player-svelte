<script>
  import { onMount } from "svelte";
  import Player from "./player/Player.svelte";

  import { renderLoop, Timer } from "taleem-pam";
  import { resolveAssetPaths } from "./lib/utils/index.js";

  let deck = null;
  let currentTime = 0;

  const timer = new Timer();

  async function loadDeck() {
    const res = await fetch("/public/specs/goldenDeckV2.json");
    const json = await res.json();
    deck = resolveAssetPaths(json);
  }

  onMount(async () => {
    await loadDeck();

    renderLoop.start(() => {
      currentTime = timer.now();
    });

    timer.play();
  });
</script>

{#if deck}
  <Player {deck} {currentTime} />
{/if}