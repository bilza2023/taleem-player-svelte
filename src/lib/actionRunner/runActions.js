import { getStateAtTime } from "./getStateAtTime.js";
import { applyStateToDOM } from "./applyStateToDOM.js";

export function runActions(actions, currentTime) {
  const state = getStateAtTime(actions, currentTime);
  if (!state) return;

  applyStateToDOM(state);
}