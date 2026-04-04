export function FillImageSlide(data) {
  const raw = data.data ?? [];

  const img = raw.find(d => d.name === "image");

  if (!img?.content) {
    throw new Error("fillImage: image required");
  }

  const actions = [];
  const sid = `s${data.start}`;
  const imgId = `${sid}-image`;

  if (img.timings) {
    for (const t of img.timings) {
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
    <section class="slide fillImage" id="${sid}">
      <img id="${imgId}" class="hidden ${img.classes || ""}" src="${img.content}" />
    </section>
  `;

  return { html, actions };
}