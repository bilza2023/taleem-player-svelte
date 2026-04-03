
// src/core/renderSlide.js

import { SlideRegistry } from "./registry/registry.js";

export function renderTaleemSlide(raw,currentShowAt = 0) {
  const fn = SlideRegistry[raw.type];

  if (!fn) {
    throw new Error(`Unknown slide type: ${raw.type}`);
  }

  return fn(raw,currentShowAt); // ✅ pass full object
}