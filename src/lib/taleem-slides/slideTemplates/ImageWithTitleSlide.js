export function ImageWithTitleSlide(data) {
  const raw = data.data ?? [];

  const img = raw.find(d => d.name === "image");
  const title = raw.find(d => d.name === "title");

  const actions = [];
  const sid = `s${data.start}`;
  const imgId = `${sid}-image`;
  const titleId = `${sid}-title`;

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

  if (title) processTimings(title, titleId);
  if (img) processTimings(img, imgId);

  const html = `
    <section class="slide imageWithTitle" id="${sid}">
      <h1 id="${titleId}" class="hidden ${title?.classes || ""}">
        ${title?.content || ""}
      </h1>
      <img id="${imgId}" class="hidden ${img?.classes || ""}" src="${img?.content}" />
    </section>
  `;

  return { html, actions };
}