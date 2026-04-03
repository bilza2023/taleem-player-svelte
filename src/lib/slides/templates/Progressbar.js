// Progressbar
export function Progressbar(raw, currentShowAt = null) {
  function getSp(item, name) {
    return item.spItems?.find(sp => sp.name === name)?.content;
  }

  const items = raw.data ?? [];

  const bars =
    currentShowAt === null
      ? items.filter(d => d.name === "progress")
      : items.filter(d => d.name === "progress" && (d.showAt ?? 0) <= currentShowAt);

  return `
    <section class="slide progressbar">
      ${bars
        .map(d => {
          const value = Math.max(0, Math.min(100, Number(getSp(d, "value") ?? 0)));
          return `
            <div class="progressbar-item ${d.classes || ""}">
              <div class="progressbar-label">${d.content}</div>
              <div class="progressbar-track">
                <div class="progressbar-fill" style="width:${value}%"></div>
              </div>
            </div>
          `;
        })
        .join("")}
    </section>
  `;
}