// SkeletonSlide
export function SkeletonSlide(data, currentShowAt = null) {
  const items = data.data ?? [];

  if (!items.length) {
    throw new Error("skeleton: requires items");
  }

  function visible(item) {
    return currentShowAt === null || (item.showAt ?? 0) === currentShowAt;
  }

  function renderItem(item) {
    if (!visible(item)) return "";

    if (item.name === "title") {
      return `<h1 class="${item.classes || ""}">${item.content}</h1>`;
    }

    if (item.name === "para") {
      return `<p class="${item.classes || ""}">${item.content}</p>`;
    }

    if (item.name === "image") {
      return `
        <div class="skeleton-image ${item.classes || ""}">
          <img src="${item.content}" />
        </div>
      `;
    }

    if (item.name === "bullets") {
      const bullets = item.content || [];
      return `
        <ul class="${item.classes || ""}">
          ${bullets.map(b => `<li>${b}</li>`).join("")}
        </ul>
      `;
    }

    return "";
  }

  return `
    <section class="slide skeleton">
      <div class="skeleton-body">
        ${items.map(renderItem).join("")}
      </div>
    </section>
  `;
}