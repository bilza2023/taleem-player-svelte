<script>
  import { onMount } from "svelte";
  import { getHtmlAtTime,getDeckEndTime } from "../lib/utils/index.js";
 
  import SyllabusBar from "./SyllabusBar.svelte";

  export let deck;
  export let timer;
  let deckEndTime=0;

  let html = "";
  let currentTime = 0;
  let showSidebar = true;
  export let links = [];

  // --- handlers ---
  function handlePlayBtn() {
    timer.play();
  }

  function handlePauseBtn() {
    timer.pause();
  }

  function handleStopBtn() {
    timer.pause();
    timer.seek(0);
  }

  function handleScrub(e) {
    const t = parseFloat(e.target.value) * (timer.duration ?? 1);
    timer.seek(t);
  }

  function toggleSidebar() {
    showSidebar = !showSidebar;
  }

  onMount(async () => {
   deckEndTime = getDeckEndTime(deck);
   console.log("deckEndTime" , deckEndTime);
  });

  // --- time loop ---
  setInterval(() => {
    if (!timer) return;

    currentTime = timer.now();
  }, 100);

  // --- reactive render ---
  $: if (deck) {
    html = getHtmlAtTime(deck, currentTime);
  }
</script>

<div class="root">

  <div class="left">
    <div class="stage">
      {@html html}
    </div>

    <!-- ============= Bottom NavBar ============= -->
    <div class="navbar">
      
      <!-- controls -->
      <div class="controls">
        <button on:click={handlePlayBtn}>▶</button>
        <button on:click={handlePauseBtn}>⏸</button>
        <button on:click={handleStopBtn}>⏹</button>
        <span class="time">{currentTime.toFixed(1)}/{deckEndTime}s</span>
      </div>
      
      <!-- scrub -->
      <div class="scrub-wrap">
        <input
          type="range"
          min="0"
          max= {deckEndTime - 1}
          step="1"
          value={ currentTime || 0}
          on:input={handleScrub}
        />
      </div>
      
      <!-- right -->
      <div class="right">
        <a href="/">←</a>
        <button on:click={toggleSidebar}>▥</button>
      </div>
      
    </div>
    <!-- ============= Bottom NavBar ============= -->

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
    background-color: #081B7A;
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

/* nav bar */

  .navbar {
	height: 40px;
	display: flex;
	align-items: center;
	padding: 0 10px;
	gap: 8px;
	border-top: 1px solid #333;
	background: rgba(0, 0, 0, 0.3);
	color: white;
  }
  
  .controls {
	display: flex;
	align-items: center;
	gap: 8px;
	flex-shrink: 0;
  }
  
  .time {
	font-size: 13px;
	color: white;
	white-space: nowrap;
  }
  
  /* Scrub takes all remaining width */
  .scrub-wrap {
	flex: 1;
	display: flex;
	align-items: center;
	min-width: 0;
  }
  
  .scrub-wrap input {
	width: 100%;
  }
  
  .right {
	display: flex;
	align-items: center;
	gap: 8px;
	flex-shrink: 0;
  }
  
  button, a {
	background: none;
	border: none;
	cursor: pointer;
	font-size: 16px;
	text-decoration: none;
	color: white;
  }


</style>