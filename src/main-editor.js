import { mount } from 'svelte';
import Editor from "./editor/Editor.svelte";

function mountApp() {
  const el = document.getElementById("editor-root");

  const raw = window.__DECK__;

  const safeDeck = {
    deck: Array.isArray(raw?.deck) ? raw.deck : []
  };

  let currentDeck = safeDeck;

  function handleExport(updated) {
    currentDeck = updated;
    console.log("EXPORTED DECK:", currentDeck);

    // 🔥 call EJS-defined callback if present
    if (typeof window.__ON_SAVE__ === "function") {
      window.__ON_SAVE__(currentDeck);
    }
  }

  window.__GET_DECK__ = () => currentDeck;

  mount(Editor, {
    target: el,
    props: {
      deck: safeDeck,
      onExport: handleExport
    }
  });
}

mountApp();