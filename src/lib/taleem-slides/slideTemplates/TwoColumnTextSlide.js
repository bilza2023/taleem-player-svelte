export function TwoColumnTextSlide(data) {
  const leftItems = data.data?.filter(d =>
    d.name === "leftText" || d.name === "leftImage"
  );

  const rightItems = data.data?.filter(d =>
    d.name === "rightText" || d.name === "rightImage"
  );

  if (!leftItems?.length || !rightItems?.length) {
    throw new Error("twoColumnText: requires left and right content");
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

  function renderItem(item, id) {
    processTimings(item, id);

    const classes = item.classes || "";

    if (item.name === "leftText" || item.name === "rightText") {
      return `<div id="${id}" class="hidden ${classes}">${item.content}</div>`;
    }

    if (item.name === "leftImage" || item.name === "rightImage") {
      return `<img id="${id}" class="hidden ${classes}" src="${item.content}" alt="" />`;
    }

    return "";
  }

  const html = `
    <section class="slide twoColumnText" id="${sid}">

      <div class="col left">
        ${leftItems.map((item, i) => renderItem(item, `${sid}-l${i + 1}`)).join("")}
      </div>

      <div class="col right">
        ${rightItems.map((item, i) => renderItem(item, `${sid}-r${i + 1}`)).join("")}
      </div>

    </section>
  `;

  return { html, actions };
}