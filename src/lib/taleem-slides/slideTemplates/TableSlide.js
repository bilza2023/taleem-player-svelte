export function TableSlide(data) {
  const items = data.data ?? [];

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("table: requires rows");
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

  const html = `
    <section class="slide table" id="${sid}">
      <table>
        <tbody>
          ${items
            .filter(item => item.name === "row")
            .map((item, i) => {
              const id = `${sid}-row${i + 1}`;
              processTimings(item, id);

              const cells = item.content.split(",").map(s => s.trim());

              return `
                <tr id="${id}" class="hidden ${item.classes || ""}">
                  ${cells.map(cell => `<td>${cell}</td>`).join("")}
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    </section>
  `;

  return { html, actions };
}