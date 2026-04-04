// ImageLeftBulletsRightSlide
export function ImageLeftBulletsRightSlide(data, currentShowAt = null) {
  const raw = data.data ?? [];

  const img = raw.find(d => d.name === "image");
  const bullets = raw.filter(d => d.name === "bullet");

  const showImg = currentShowAt === null || (img?.showAt ?? 0) <= currentShowAt;

  const visibleBullets =
    currentShowAt === null
      ? bullets
      : bullets.filter(b => (b.showAt ?? 0) <= currentShowAt);

  return `
    <section class="slide imageLeftBulletsRight">
      ${showImg ? `<img class="${img?.classes || ""}" src="${img?.content}" />` : ``}
      <ul>
        ${visibleBullets.map(b => `<li class="${b.classes || ""}">${b.content}</li>`).join("")}
      </ul>
    </section>
  `;
}