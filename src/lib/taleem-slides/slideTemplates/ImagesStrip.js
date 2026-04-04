export function ImageStripSlide(data) {
  const raw = data.data ?? [];

  const images = raw.filter(d => d.name === "image");

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
    <section class="slide imageStrip" id="${sid}">
      <div class="image-strip">
        ${images.map((img, i) => {
          const id = `${sid}-img${i + 1}`;
          processTimings(img, id);
          return `
            <div class="image-strip-item">
              <img id="${id}" class="hidden ${img.classes || ""}" src="${img.content}" />
            </div>
          `;
        }).join("")}
      </div>
    </section>
  `;

  return { html, actions };
}