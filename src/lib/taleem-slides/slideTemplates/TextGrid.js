export function TextGridSlide(data) {
  const raw = data.data ?? [];

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
    <section class="slide textGrid" id="${sid}">
      <div class="text-grid">
        ${raw
          .filter(d => d.name === "text")
          .map((item, i) => {
            const id = `${sid}-t${i + 1}`;
            processTimings(item, id);

            return `
              <div id="${id}" class="text-grid-item hidden ${item.classes || ""}">
                ${item.content}
              </div>
            `;
          })
          .join("")}
      </div>
    </section>
  `;

  return { html, actions };
}