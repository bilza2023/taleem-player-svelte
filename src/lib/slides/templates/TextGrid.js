// TextGridSlide
export function TextGridSlide(data, currentShowAt = null) {
  const raw = data.data ?? [];

  const items =
    currentShowAt === null
      ? raw.filter(d => d.name === "text")
      : raw.filter(d => d.name === "text" && (d.showAt ?? 0) <= currentShowAt);

  return `
    <section class="slide textGrid">
      <div class="text-grid">
        ${items.map(item => `
          <div class="text-grid-item ${item.classes || ""}">
            ${item.content}
          </div>
        `).join("")}
      </div>
    </section>
  `;
}