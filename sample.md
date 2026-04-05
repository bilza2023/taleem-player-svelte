import { extractTimeline } from "../renders/extractTimeline.js";
import { buildSequentialStates } from "../renders/buildSequentialStates.js";

export function TitleAndSubtitleSlide(data) {
  const rawItems = data.data ?? [];

  const titleItem = rawItems.find(d => d.name === "title");
  const subtitleItem = rawItems.find(d => d.name === "subtitle");

  if (!titleItem) {
    throw new Error("titleAndSubtitle: requires title");
  }

  const sid = `s${data.start}`;

  // 🔹 1. assign ids
  const titleId = `${sid}-title`;
  const subtitleId = subtitleItem ? `${sid}-subtitle` : null;

  const items = [
    {
      id: titleId,
      timings: titleItem.timings || []
    },
    ...(subtitleItem
      ? [
          {
            id: subtitleId,
            timings: subtitleItem.timings || []
          }
        ]
      : [])
  ];

  const allIds = items.map(i => i.id);

  // 🔹 2. build timeline
  const timeline = extractTimeline(items);

  // 🔹 3. build state actions (accumulation)
  const actions = buildSequentialStates(timeline, allIds);

  // 🔹 4. HTML (initial = everything hidden)
  const html = `
    <section class="slide titleAndSubtitle" id="${sid}">

      <h1 
        id="${titleId}" 
        class="hidden ${titleItem.classes || ""}"
      >
        ${titleItem.content}
      </h1>

      ${
        subtitleItem
          ? `
            <h2 
              id="${subtitleId}" 
              class="hidden ${subtitleItem.classes || ""}"
            >
              ${subtitleItem.content}
            </h2>
          `
          : ``
      }

    </section>
  `;

  // 🔥 DEBUG (important for now)
  // console.log("STATE ACTIONS:", actions);

  return { html, actions };
}