export function TitleAndParaSlide(data) {
  const rawItems = data.data ?? [];

  const titleItem = rawItems.find(d => d.name === "title");
  const paraItem = rawItems.find(d => d.name === "para");

  if (!paraItem) {
    throw new Error("titleAndPara: requires para");
  }

  const actions = [];
  const sid = `s${data.start}`;

  function processTimings(item, id) {
    if (!item?.timings) return;

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
  const paraId = `${sid}-para`;

  processTimings(titleItem, titleId);
  processTimings(paraItem, paraId);

  const html = `
    <section class="slide titleAndPara" id="${sid}">
      
      ${
        titleItem
          ? `<h1 id="${titleId}" class="hidden ${titleItem.classes || ""}">
              ${titleItem.content}
            </h1>`
          : ``
      }

      <p id="${paraId}" class="hidden ${paraItem.classes || ""}">
        ${paraItem.content}
      </p>

    </section>
  `;

  return { html, actions };
}