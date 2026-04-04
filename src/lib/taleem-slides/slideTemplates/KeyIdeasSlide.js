export function KeyIdeasSlide(data) {
  function getSp(item, name) {
    return item.spItems?.find(sp => sp.name === name)?.content;
  }

  const rawCards = (data.data || []).filter(d => d.name === "card");

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

  const html = `
    <section class="slide keyIdeasSlide" id="${sid}">
      ${rawCards.map((c, i) => {
        const id = `${sid}-card${i + 1}`;
        processTimings(c, id);
        return `
          <div id="${id}" class="key-idea hidden ${c.classes || ""}">
            <div class="icon">${getSp(c, "icon") ?? ""}</div>
            <div class="label">${c.content}</div>
          </div>
        `;
      }).join("")}
    </section>
  `;

  return { html, actions };
}