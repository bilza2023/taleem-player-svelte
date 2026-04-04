export function Progressbar(data) {
  function getSp(item, name) {
    return item.spItems?.find(sp => sp.name === name)?.content;
  }

  const items = data.data ?? [];

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
    <section class="slide progressbar" id="${sid}">
      ${items
        .filter(d => d.name === "progress")
        .map((d, i) => {
          const id = `${sid}-p${i + 1}`;
          processTimings(d, id);

          const value = Math.max(0, Math.min(100, Number(getSp(d, "value") ?? 0)));

          return `
            <div id="${id}" class="progressbar-item hidden ${d.classes || ""}">
              <div class="progressbar-label">${d.content}</div>
              <div class="progressbar-track">
                <div class="progressbar-fill" style="width:${value}%"></div>
              </div>
            </div>
          `;
        })
        .join("")}
    </section>
  `;

  return { html, actions };
}