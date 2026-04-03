<script>
  export let deck;
  export let currentTime;

  import { getHtmlAtTime } from "../lib/utils/index.js";

  let html = "";

  $: if (deck) {
    html = getHtmlAtTime(deck, currentTime);
  }
</script>

<div class="player">
  {@html html}
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
