
export function FocusListSlide(data) {
  const raw = data.data ?? [];

  const bullets = raw.filter(d => d.name === "bullet");
  const headingItem = raw.find(d => d.name === "heading");

  if (!bullets.length) {
    throw new Error("focusList: requires bullets");
  }

  const actions = [];
  const sid = `s${data.start}`;
  const headingId = `${sid}-heading`;

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

  if (headingItem) processTimings(headingItem, headingId);

  const html = `
    <section class="slide focusList" id="${sid}">

      ${
        headingItem
          ? `<h1 id="${headingId}" class="hidden ${headingItem.classes || ""}">
              ${headingItem.content}
            </h1>`
          : ``
      }

      <ul>
        ${bullets.map((b, i) => {
          const id = `${sid}-b${i + 1}`;
          processTimings(b, id);
          return `<li id="${id}" class="hidden ${b.classes || ""}">${b.content}</li>`;
        }).join("")}
      </ul>

    </section>
  `;

  return { html, actions };
}