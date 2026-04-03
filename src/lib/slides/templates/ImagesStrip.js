// ImageStripSlide
export function ImageStripSlide(data, currentShowAt = null) {
  const raw = data.data ?? [];

  const images =
    currentShowAt === null
      ? raw.filter(d => d.name === "image")
      : raw.filter(d => d.name === "image" && (d.showAt ?? 0) <= currentShowAt);

  return `
    <section class="slide imageStrip">
      <div class="image-strip">
        ${images.map(img => `
          <div class="image-strip-item">
            <img class="${img.classes || ""}" src="${img.content}" />
          </div>
        `).join("")}
      </div>
    </section>
  `;
}