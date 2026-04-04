export function TitleAndSubtitleSlide(data) {
  const rawItems = data.data ?? [];

  const titleItem = rawItems.find(d => d.name === "title");
  const subtitleItem = rawItems.find(d => d.name === "subtitle");

  if (!titleItem) {
    throw new Error("titleAndSubtitle: requires title");
  }

  const actions = [];
  const sid = `s${data.start}`;

  function processTimings(item, id) {
    if (!item.timings) return;

    for (const t of item.timings) {
      if (t.event === "show") {
        actions.push({
          time: t.time,
          targets: [id],
          action: "removeClass",
          classes: ["hidden"]
        });
      }
    }
  }

  const titleId = `${sid}-title`;
  const subtitleId = `${sid}-subtitle`;

  processTimings(titleItem, titleId);
  if (subtitleItem) {
    processTimings(subtitleItem, subtitleId);
  }

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

  return { html, actions };
}