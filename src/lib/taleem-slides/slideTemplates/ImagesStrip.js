export function ImageStripSlide(data) {
  const raw = data.data ?? [];

  const imagesRaw = raw.filter(d => d.name === "image");

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

  // 🔥 normalize like other slides
  const images = imagesRaw.map((img, i) => {
    const id = `${sid}-img${i + 1}`;
    processTimings(img, id);

    return {
      id,
      src: img.content,
      classes: img.classes || ""
    };
  });

  const html = `
    <section class="slide imageStrip" id="${sid}">
      <div class="image-strip">

        ${images.map(img => `
          <div class="image-strip-item">
            <img 
              id="${img.id}" 
              class="hidden ${img.classes}" 
              src="${img.src}" 
            />
          </div>
        `).join("")}

      </div>
    </section>
  `;

  return { html, actions };
}