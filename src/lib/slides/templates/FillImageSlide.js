// FillImageSlide
export function FillImageSlide(data, currentShowAt = null) {
  const raw = data.data ?? [];

  const img = raw.find(d => d.name === "image");

  if (!img?.content) {
    throw new Error("fillImage: image required");
  }

  const showImg =
    currentShowAt === null || (img.showAt ?? 0) <= currentShowAt;

  return `
    <section class="slide fillImage">
      ${showImg ? `<img class="${img.classes || ""}" src="${img.content}" />` : ``}
    </section>
  `;
}