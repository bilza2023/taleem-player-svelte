// ImageWithCaptionSlide
export function ImageWithCaptionSlide(data, currentShowAt = null) {
  const raw = data.data ?? [];

  const img = raw.find(d => d.name === "image");
  const cap = raw.find(d => d.name === "caption");

  const showImg = currentShowAt === null || (img?.showAt ?? 0) <= currentShowAt;
  const showCap = currentShowAt === null || (cap?.showAt ?? 0) <= currentShowAt;

  return `
    <figure class="slide imageWithCaption">
      ${showImg ? `<img class="${img?.classes || ""}" src="${img?.content}" />` : ``}
      ${showCap ? `<figcaption class="${cap?.classes || ""}">${cap?.content}</figcaption>` : ``}
    </figure>
  `;
}