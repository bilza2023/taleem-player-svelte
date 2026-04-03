

import { renderTaleemSlide } from "../slides/renderTaleemSlide.js";
import { getSlideAtTime } from "./getSlideAtTime.js";

export function getHtmlAtTime(deck, time) {
    const slide = getSlideAtTime(deck, time);
    if (!slide) return "";
    return renderTaleemSlide(slide, time);
  }