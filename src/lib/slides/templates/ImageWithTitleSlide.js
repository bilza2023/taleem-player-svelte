// ImageWithTitleSlide
export function ImageWithTitleSlide(data, currentShowAt = null) {
  const raw = data.data ?? [];

  const img = raw.find(d => d.name === "image");
  const title = raw.find(d => d.name === "title");

  const showTitle = currentShowAt === null || (title?.showAt ?? 0) <= currentShowAt;
  const showImg = currentShowAt === null || (img?.showAt ?? 0) <= currentShowAt;

  return `
    <section class="slide imageWithTitle">
      ${showTitle ? `<h1 class="${title?.classes || ""}">${title?.content}</h1>` : ``}
      ${showImg ? `<img class="${img?.classes || ""}" src="${img?.content}" />` : ``}
    </section>
  `;
}