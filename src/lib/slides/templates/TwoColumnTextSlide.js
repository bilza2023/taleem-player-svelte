// src/templates/TwoColumnTextSlide.js

export function TwoColumnTextSlide(data) {
  const leftItems = data.data?.filter(d =>
    d.name === "leftText" || d.name === "leftImage"
  );

  const rightItems = data.data?.filter(d =>
    d.name === "rightText" || d.name === "rightImage"
  );

  if (!leftItems?.length || !rightItems?.length) {
    throw new Error("twoColumnText: requires left and right content");
  }

  function renderItem(item) {
    const classes = item.classes || "";
    const hide = item.hide === true;

    if (hide) return "";

    if (item.name === "leftText" || item.name === "rightText") {
      return `<div class="${classes}">${item.content}</div>`;
    }

    if (item.name === "leftImage" || item.name === "rightImage") {
      return `<img class="${classes}" src="${item.content}" alt="" />`;
    }

    return "";
  }

  return `
    <section class="slide twoColumnText">

      <div class="col left">
        ${leftItems.map(renderItem).join("")}
      </div>

      <div class="col right">
        ${rightItems.map(renderItem).join("")}
      </div>

    </section>
  `;
}