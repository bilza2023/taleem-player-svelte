// KeyIdeasSlide
export function KeyIdeasSlide(raw, currentShowAt = null) {
  function getSp(item, name) {
    return item.spItems?.find(sp => sp.name === name)?.content;
  }

  const rawCards = (raw.data || []).filter(d => d.name === "card");

  const visibleCards =
    currentShowAt === null
      ? rawCards
      : rawCards.filter(c => (c.showAt ?? 0) <= currentShowAt);

  const cards = visibleCards.map(d => ({
    icon: getSp(d, "icon"),
    label: d.content,
    classes: d.classes || ""
  }));

  return `
    <section class="slide keyIdeasSlide">
      ${cards
        .map(c => `
          <div class="key-idea ${c.classes}">
            <div class="icon">${c.icon ?? ""}</div>
            <div class="label">${c.label}</div>
          </div>
        `)
        .join("")}
    </section>
  `;
}