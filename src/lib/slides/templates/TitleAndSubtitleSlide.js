import { extractRequired } from "./helpers/extractRequired";
import { extractOptional } from "./helpers/extractOptional";

export function TitleAndSubtitleSlide(data, currentShowAt = 0) {
  const rawItems = data.data ?? [];

  const titleItem = rawItems.find(d => d.name === "title");
  const subtitleItem = rawItems.find(d => d.name === "subtitle");

  if (!titleItem) {
    throw new Error("titleAndSubtitle: requires title");
  }

  const title = titleItem.content;
  const subtitle = subtitleItem?.content;

  const titleShowAt = titleItem.showAt ?? 0;
  const subtitleShowAt = subtitleItem?.showAt ?? 0;

  const titleClasses = titleItem.classes || "";
  const subtitleClasses = subtitleItem?.classes || "";

  // visibility logic
  const showTitle =
    currentShowAt === null ? true : titleShowAt <= currentShowAt;

  const showSubtitle =
    currentShowAt === null
      ? true
      : subtitleItem && subtitleShowAt <= currentShowAt;

  return `
    <section class="slide titleAndSubtitle">
      
      ${
        showTitle
          ? `<h1 class="${titleClasses}">${title}</h1>`
          : ``
      }

      ${
        showSubtitle
          ? `<h2 class="${subtitleClasses}">${subtitle}</h2>`
          : ``
      }

    </section>
  `;
}