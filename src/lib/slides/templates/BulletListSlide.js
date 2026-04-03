import { extractOptional } from "./helpers/extractOptional";

export function BulletListSlide(data, currentShowAt = null) {
  const rawItems = data.data ?? [];

  // normalize showAt
  const bullets = rawItems
    .filter(d => d.name === "bullet")
    .map(d => ({
      text: d.content,
      showAt: d.showAt ?? 0,
      classes: d.classes || ""
    }));

  if (bullets.length === 0) {
    throw new Error("bulletList: requires at least one bullet");
  }

  // if no stepping → show all (backward compatible)
  const visibleBullets =
    currentShowAt === null
      ? bullets
      : bullets.filter(b => b.showAt <= currentShowAt);

  const { heading } = extractOptional(data, ["heading"]);

  const headingClasses = data.heading?.classes || "";

  return `
    <section class="slide bulletList">

      ${
        heading
          ? `<h1 class="${headingClasses}">${heading}</h1>`
          : ``
      }

      <ul>
        ${visibleBullets
          .map(b => `<li class="${b.classes}">${b.text}</li>`)
          .join("")}
      </ul>

    </section>
  `;
}