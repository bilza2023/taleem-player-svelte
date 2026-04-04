
export function BulletListSlide(data) {
  const rawItems = data.data ?? [];

  const bullets = rawItems.filter(d => d.name === "bullet");
  const headingItem = rawItems.find(d => d.name === "heading");

  if (bullets.length === 0) {
    throw new Error("bulletList: requires at least one bullet");
  }

  const actions = [];

  const sid = `s${data.start}`; // ✅ self-contained slide id

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

  const headingId = `${sid}-heading`;

  if (headingItem) processTimings(headingItem, headingId);

  bullets.forEach((b, i) => {
    const id = `${sid}-b${i + 1}`;
    processTimings(b, id);
  });

  const html = `
    <section class="slide bulletList" id="${sid}">

      ${
        headingItem
          ? `<h1 id="${headingId}" class="hidden ${headingItem.classes || ""}">
              ${headingItem.content}
            </h1>`
          : ``
      }

      <ul>
        ${bullets
          .map((b, i) => `
            <li id="${sid}-b${i + 1}" class="hidden ${b.classes || ""}">
              ${b.content}
            </li>
          `)
          .join("")}
      </ul>

    </section>
  `;

  return { html, actions };
}