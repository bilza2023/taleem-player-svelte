export function SkeletonSlide(data) {
  const items = data.data ?? [];

  if (!items.length) {
    throw new Error("skeleton: requires items");
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

  function renderItem(item, i) {
    const id = `${sid}-${item.name}${i}`;
    processTimings(item, id);

    if (item.name === "title") {
      return `<h1 id="${id}" class="hidden ${item.classes || ""}">${item.content}</h1>`;
    }

    if (item.name === "para") {
      return `<p id="${id}" class="hidden ${item.classes || ""}">${item.content}</p>`;
    }

    if (item.name === "image") {
      return `
        <div id="${id}" class="skeleton-image hidden ${item.classes || ""}">
          <img src="${item.content}" />
        </div>
      `;
    }

    return "";
  }

  const html = `
    <section class="slide skeleton" id="${sid}">
      <div class="skeleton-body">
        ${items.map(renderItem).join("")}
      </div>
    </section>
  `;

  return { html, actions };
}