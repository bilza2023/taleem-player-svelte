import { extractRequired } from "./helpers/extractRequired";

export function ImageSlide(data, currentShowAt = null) {
  const rawItems = data.data ?? [];

  const imageItem = rawItems.find(d => d.name === "image");

  if (!imageItem) {
    throw new Error("imageSlide: requires image");
  }

  const image = imageItem.content;
  const imageClasses = imageItem.classes || "";
  const imageShowAt = imageItem.showAt ?? 0;

  const showImage =
    currentShowAt === null ? true : imageShowAt <= currentShowAt;

  return `
    <section class="slide imageSlide">
      
      ${
        showImage
          ? `<img class="${imageClasses}" src="${image}" alt="" />`
          : ``
      }

    </section>
  `;
}