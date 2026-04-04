// import { extractOptional } from "../core/extractOptional";

export function BulletListSlide(data, slideIndex = 0) {
  const rawItems = data.data ?? [];

  const bullets = rawItems.filter(d => d.name === "bullet");

  if (bullets.length === 0) {
    throw new Error("bulletList: requires at least one bullet");
  }

  const headingItem = rawItems.find(d => d.name === "heading");

  return `
    <section class="slide bulletList" id="s${slideIndex}">

      ${
        headingItem
          ? `<h1 id="s${slideIndex}-heading" class="hidden ${headingItem.classes || ""}">
              ${headingItem.content}
            </h1>`
          : ``
      }

      <ul>
        ${bullets
          .map((b, i) => `
            <li 
              id="s${slideIndex}-b${i + 1}" 
              class="hidden ${b.classes || ""}"
            >
              ${b.content}
            </li>
          `)
          .join("")}
      </ul>

    </section>
  `;
}