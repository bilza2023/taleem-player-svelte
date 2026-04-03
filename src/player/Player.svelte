<script>
  import { onMount } from "svelte";
  import { getHtmlAtTime } from "../lib/utils/index.js";
  import BottomNavBar from "./BottomNavBar.svelte";
  import SyllabusBar from "./SyllabusBar.svelte";

  export let deck;
  export let timer;

  let html = "";
  let currentTime = 0;
  let showSidebar = true;
  let links = [];

  let playBtn, pauseBtn, stopBtn, scrub, timeEl;

  onMount(async () => {
    const res = await fetch("/data/links.json");
    links = await res.json();

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

  setInterval(() => {
    currentTime = timer.now();
    if (timeEl) timeEl.textContent = currentTime.toFixed(1) + "s";
    if (scrub && timer.duration) {
      scrub.value = currentTime / timer.duration;
    }
  }, 100);

  $: if (deck) {
    html = getHtmlAtTime(deck, currentTime);
  }

  function toggleSidebar() {
    showSidebar = !showSidebar;
  }
</script>

<div class="root">

  <div class="left">
    <div class="stage">
      {@html html}
    </div>
    <BottomNavBar
      bind:playBtn
      bind:pauseBtn
      bind:stopBtn
      bind:scrub
      bind:timeEl
      onToggle={toggleSidebar}
    />
  </div>

  <div class="sidebar" class:hidden={!showSidebar}>
    <SyllabusBar {links} />
  </div>

</div>

<style>
  @import "/css/themes/dark.css";
  @import "/css/taleem.css";
  @import "/css/app.css";

  :global(body) {
    margin: 0;
    padding: 0;
    height: 100vh;
    overflow: hidden;
  }

  .root {
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: rgba(16, 0, 0, 0.788);
  }

  .left {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    overflow: hidden;
  }

  .stage {
    flex: 1;
    overflow: hidden;
    position: relative;
  }

  /* Sidebar: animate width for smooth slide in/out */
  .sidebar {
    width: 260px;
    flex-shrink: 0;
    overflow-y: auto;
    overflow-x: hidden;
    border-left: 1px solid #333;
    transition: width 0.3s ease, opacity 0.3s ease;
    opacity: 1;
  }

  .sidebar.hidden {
    width: 0;
    opacity: 0;
    border-left: none;
  }

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
</style>