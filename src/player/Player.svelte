<script>
  import { onMount } from "svelte";
  import { getDeckEndTime } from "../lib/utils/index.js";
  import { renderTaleemSlide } from "../lib/taleem-slides";
  import { runActions } from "../lib/actionRunner/runActions.js";
  import { getSlideAtTime } from "../lib/utils/getSlideAtTime.js";

  import SyllabusBar from "./SyllabusBar.svelte";

  export let deck;
  export let timer;
  let deckEndTime = 0;

  let html = "";
  let actions = [];
  let currentTime = 0;
  let currentSlide = null;
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
  });

  // --- time loop ---
  setInterval(() => {
  if (!timer || !deck) return;

  currentTime = timer.now();

  const slide = getSlideAtTime(deck, currentTime);

  if (slide !== currentSlide) {
    currentSlide = slide;

    if (slide) {
      const result = renderTaleemSlide(slide);
      html = result.html;
      actions = result.actions;
    }
  }

  runActions(actions, currentTime);
}, 100);

  // --- reactive render ---
  $: if (deck) {
    // html = renderTaleemSlide(deck.deck[0]);
    const result = renderTaleemSlide(deck.deck[1]);
    debugger;
    html = result.html;
    actions = result.actions;
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
          max={deckEndTime - 1}
          step="1"
          value={currentTime || 0}
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
  @import "../css/index.css";
  @import "/css/app.css";

  :global(body) {
    margin: 0;
    padding: 0;
    height: 100vh;
    overflow: hidden;
    background-color: #081b7a;
  }

  /* 🔥 GRID FIX (core change) */
  .root {
    display: grid;
    grid-template-columns: 1fr 260px;
    width: 100vw;
    height: 100vh;
    background-color: rgba(16, 0, 0, 0.788);
    transition: grid-template-columns 0.28s ease;
  }

  /* when sidebar hidden → collapse column */
  .root:has(.sidebar.hidden) {
    grid-template-columns: 1fr 0px;
  }

  .left {
    display: flex;
    flex-direction: column;
    min-width: 0;
    overflow: hidden;
  }

  .stage {
    flex: 1;
    overflow: hidden;
    position: relative;
  }

  .sidebar {
    overflow: hidden;
    border-left: 1px solid #333;
    opacity: 1;
    transition: opacity 0.2s ease;
  }

  .sidebar.hidden {
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

  button,
  a {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    text-decoration: none;
    color: white;
  }
</style>
