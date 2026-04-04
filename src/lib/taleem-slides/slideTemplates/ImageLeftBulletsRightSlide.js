export function ImageLeftBulletsRightSlide(data) {
  const raw = data.data ?? [];

  const img = raw.find(d => d.name === "image");
  const bullets = raw.filter(d => d.name === "bullet");

  const actions = [];
  const sid = `s${data.start}`;
  const imgId = `${sid}-image`;

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

  const html = `
    <section class="slide imageLeftBulletsRight" id="${sid}">
      
      <img id="${imgId}" class="hidden ${img?.classes || ""}" src="${img?.content}" />

      <ul>
        ${bullets
          .map((b, i) => {
            const id = `${sid}-b${i + 1}`;
            processTimings(b, id);
            return `<li id="${id}" class="hidden ${b.classes || ""}">${b.content}</li>`;
          })
          .join("")}
      </ul>

    </section>
  `;

  return { html, actions };
}