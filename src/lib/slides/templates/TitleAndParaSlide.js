import { extractRequired } from "./helpers/extractRequired";

export function TitleAndParaSlide(data, currentShowAt = null) {
  const rawItems = data.data ?? [];

  const titleItem = rawItems.find(d => d.name === "title");
  const paraItem = rawItems.find(d => d.name === "para");

  if (!paraItem) {
    throw new Error("titleAndPara: requires para");
  }

  const title = titleItem?.content;
  const para = paraItem.content;

  const titleShowAt = titleItem?.showAt ?? 0;
  const paraShowAt = paraItem.showAt ?? 0;

  const titleClasses = titleItem?.classes || "";
  const paraClasses = paraItem.classes || "";

  const showTitle =
    currentShowAt === null ? true : titleShowAt <= currentShowAt;

  const showPara =
    currentShowAt === null ? true : paraShowAt <= currentShowAt;

  return `
    <section class="slide titleAndPara">
      
      ${
        showTitle && title
          ? `<h1 class="${titleClasses}">${title}</h1>`
          : ``
      }

      ${
        showPara
          ? `<p class="${paraClasses}">${para}</p>`
          : ``
      }

    </section>
  `;
}