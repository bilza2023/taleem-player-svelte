

export function applyStateToDOM(state) {
    const slide = document.querySelector(".slide");
    if (!slide) return;
  
    const allEls = slide.querySelectorAll("[id]");
  
    // 1. RESET → remove ALL known classes
    for (const el of allEls) {
      el.classList.remove("hidden");
    }
  
    // 2. APPLY → based on state
    for (const [groupName, ids] of Object.entries(state)) {
      for (const id of ids) {
        const el = slide.querySelector(`#${id}`);
        if (!el) continue;
  
        if (groupName === "hidden") {
          el.classList.add("hidden");
        }
  
        // visible → do nothing (no class)
      }
    }
  }