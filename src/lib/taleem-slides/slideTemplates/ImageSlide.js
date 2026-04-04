export function ImageSlide(data) {
  const rawItems = data.data ?? [];

  const imageItem = rawItems.find(d => d.name === "image");

  if (!imageItem) {
    throw new Error("imageSlide: requires image");
  }

  const actions = [];
  const sid = `s${data.start}`;
  const imgId = `${sid}-image`;

  if (imageItem.timings) {
    for (const t of imageItem.timings) {
      if (t.event === "show") {
        actions.push({
          time: t.time,
          targets: [imgId],
          action: "removeClass",
          classes: ["hidden"]
        });
      }
    }
  }

  const html = `
    <section class="slide imageSlide" id="${sid}">
      <img id="${imgId}" class="hidden ${imageItem.classes || ""}" src="${imageItem.content}" alt="" />
    </section>
  `;

  return { html, actions };
}