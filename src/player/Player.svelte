<script>
  import { onMount } from "svelte";
  import { getHtmlAtTime } from "../lib/utils/index.js";
  import BottomNavBar from "./BottomNavBar.svelte";

  export let deck;
  export let timer;

  let html = "";
  let currentTime = 0;

  // DOM element refs bound from BottomNavBar
  let playBtn, pauseBtn, stopBtn, scrub, timeEl;

  // Poll timer for currentTime
  setInterval(() => {
    currentTime = timer.now();

    // Update the time display element
    if (timeEl) timeEl.textContent = currentTime.toFixed(1) + "s";

    // Update scrub position (assuming timer has a duration)
    if (scrub && timer.duration) {
      scrub.value = currentTime / timer.duration;
    }
  }, 100);

  $: if (deck) {
    html = getHtmlAtTime(deck, currentTime);
  }

  // Attach event listeners once DOM elements are bound
  onMount(() => {
    if (playBtn)  playBtn.addEventListener("click",  () => timer.play());
    if (pauseBtn) pauseBtn.addEventListener("click", () => timer.pause());
    if (stopBtn)  stopBtn.addEventListener("click",  () => timer.stop());

    if (scrub) {
      scrub.addEventListener("input", (e) => {
        const t = parseFloat(e.target.value) * (timer.duration ?? 1);
        timer.seek(t);
      });
    }
  });
</script>

<div class="player">
  {@html html}
  <BottomNavBar
    bind:playBtn
    bind:pauseBtn
    bind:stopBtn
    bind:scrub
    bind:timeEl
  />
</div>

<style>
  @import "/css/themes/dark.css";
  @import "/css/taleem.css";
  @import "/css/app.css";

  #stage {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  #bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background-size: cover;
    background-position: center;
  }

  #slides {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  .controls {
    position: fixed;
    bottom: 20px;
    left: 20px;
    display: flex;
    gap: 10px;
    opacity: 0.4;
    z-index: 1000;
  }

  .controls:hover {
    opacity: 1;
  }

  .info {
    position: fixed;
    bottom: 20px;
    right: 20px;
    font-size: 18px;
    opacity: 0.7;
    background: rgba(0, 0, 0, 0.4);
    padding: 6px 10px;
    border-radius: 6px;
    color: white;
    z-index: 1000;
  }
</style>