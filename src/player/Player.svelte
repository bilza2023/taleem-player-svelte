<script>
    import { onMount } from 'svelte';
    import { resolveAssetPaths, getHtmlAtTime } from "../lib/utils/index.js";
    import { renderLoop, Timer } from "taleem-pam";
  
    let slidesEl;
    let bgEl;
    let infoEl;
  
    const state = { currentTime: 0, deck: null };
    const timer = new Timer();
  
    async function load() {
      const res = await fetch("/public/specs/goldenDeckV2.json");
      const deck = resolveAssetPaths(await res.json(), "/public/images/");
  
      state.deck = deck;
  
      const b = deck.background;
      if (b?.backgroundColor) bgEl.style.backgroundColor = b.backgroundColor;
      if (b?.backgroundImage) bgEl.style.backgroundImage = `url("${b.backgroundImage}")`;
    }
  
    function init() {
      renderLoop.setDraw(s => {
        slidesEl.innerHTML = getHtmlAtTime(s.deck, s.currentTime);
        infoEl.textContent = s.currentTime.toFixed(2);
      });
  
      renderLoop.start(() => {
        state.currentTime = timer.now();
        renderLoop.draw(state);
      });
    }
  
    function play() {
      timer.play();
    }
  
    function pause() {
      timer.pause();
    }
  
    function reset() {
      timer.pause();
      timer.seek(0);
    }
  
    onMount(async () => {
      await load();
      init();
    });
  </script>
  
  <!-- STAGE -->
  <div id="app">
    <div id="stage">
      <div id="bg" bind:this={bgEl}></div>
      <div id="slides" bind:this={slidesEl}></div>
    </div>
  </div>
  
  <!-- CONTROLS -->
  <div class="controls">
    <button on:click={play}>▶ Play</button>
    <button on:click={pause}>⏸ Pause</button>
    <button on:click={reset}>⟲ Reset</button>
  </div>
  
  <!-- INFO -->
  <div class="info" bind:this={infoEl}>time: 0.00</div>
  
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
      background: rgba(0,0,0,0.4);
      padding: 6px 10px;
      border-radius: 6px;
      color: white;
      z-index: 1000;
    }
  </style>