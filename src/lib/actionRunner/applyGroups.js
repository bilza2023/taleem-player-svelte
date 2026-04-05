export function applyGroups(state, groups) {
  if (!state) return;

  console.log("STATE:", state);

  const hiddenIds = state.hidden || [];

  const slide = document.querySelector(".slide");
  if (!slide) return;

  const allEls = slide.querySelectorAll("[id]");

  console.log("ALL ELEMENTS:", [...allEls].map(el => ({
    id: el.id,
    before: el.className
  })));

  // 1. remove hidden
  for (const el of allEls) {
    el.classList.remove("hidden");
  }

  console.log("AFTER REMOVE:", [...allEls].map(el => ({
    id: el.id,
    afterRemove: el.className
  })));

  // 2. apply hidden
  for (const id of hiddenIds) {
    const el = document.getElementById(id);
    if (!el) {
      console.log("NOT FOUND:", id);
      continue;
    }

    el.classList.add("hidden");
  }

  console.log("FINAL:", [...allEls].map(el => ({
    id: el.id,
    final: el.className
  })));
}