import { extractTimeline } from "../renders/extractTimeline.js";
import { addIdToItems } from "../helpers/addIdToItems.js";

export function SkeletonSlide(data) {
  const rawItems = data.data ?? [];

  if (!rawItems.length) {
    throw new Error("skeleton: requires items");
  }

  const items = addIdToItems(rawItems);

  // 🔹 timeline
  const timeline = extractTimeline(items);

  // 🔹 one-at-a-time actions (active/remove)
  const actions = [];

  const allIds = items.map(i => i.id);

  for (const step of timeline) {
    const activeId = step.id;

    const removeIds = allIds.filter(id => id !== activeId);

    actions.push({
      time: step.time,
      state: {
        active: [activeId],
        remove: removeIds
      }
    });
  }

  function renderItem(item) {
    const id = item.id;

    if (item.name === "title") {
      return `<h1 id="${id}" class="remove ${item.classes || ""}">
        ${item.content}
      </h1>`;
    }

    if (item.name === "para") {
      return `<p id="${id}" class="remove ${item.classes || ""}">
        ${item.content}
      </p>`;
    }

    if (item.name === "image") {
      return `
        <div id="${id}" class="skeleton-image remove ${item.classes || ""}">
          <img src="${item.content}" />
        </div>
      `;
    }

    return "";
  }

  const html = `
    <section class="slide skeleton">

      <div class="skeleton-body">
        ${items.map(renderItem).join("")}
      </div>

    </section>
  `;

  return {
    html,
    actions,
    groups: {
      active: [],
      remove: ["remove"]
    }
  };
}