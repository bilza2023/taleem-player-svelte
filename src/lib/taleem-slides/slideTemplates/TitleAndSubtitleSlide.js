


export function TitleAndSubtitleSlide(data, slideIndex = 0) {
  const rawItems = data.data ?? [];

  const titleItem = rawItems.find(d => d.name === "title");
  const subtitleItem = rawItems.find(d => d.name === "subtitle");

  if (!titleItem) {
    throw new Error("titleAndSubtitle: requires title");
  }

  return `
    <section class="slide titleAndSubtitle" id="s${slideIndex}">

      <h1 
        id="s${slideIndex}-title" 
        class=" ${titleItem.classes || ""}"
      >
        ${titleItem.content}
      </h1>

      ${
        subtitleItem
          ? `
            <h2 
              id="s${slideIndex}-subtitle" 
              class=" ${subtitleItem.classes || ""}"
            >
              ${subtitleItem.content}
            </h2>
          `
          : ``
      }

    </section>
  `;
}