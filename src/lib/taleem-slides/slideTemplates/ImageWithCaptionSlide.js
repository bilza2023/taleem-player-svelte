export function ImageWithCaptionSlide(data) {
  const raw = data.data ?? [];

  const img = raw.find(d => d.name === "image");
  const cap = raw.find(d => d.name === "caption");

  const actions = [];
  const sid = `s${data.start}`;
  const imgId = `${sid}-image`;
  const capId = `${sid}-caption`;

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

  if (img) processTimings(img, imgId);
  if (cap) processTimings(cap, capId);

  const html = `
    <figure class="slide imageWithCaption" id="${sid}">
      <img id="${imgId}" class="hidden ${img?.classes || ""}" src="${img?.content}" />
      <figcaption id="${capId}" class="hidden ${cap?.classes || ""}">
        ${cap?.content || ""}
      </figcaption>
    </figure>
  `;

  return { html, actions };
}