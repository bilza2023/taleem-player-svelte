// FocusListSlide
import { extractOptional } from "./helpers/extractOptional";

export function FocusListSlide(data, currentShowAt = null) {
  const raw = data.data ?? [];

  const bullets = raw.filter(d => d.name === "bullet");

  if (!bullets.length) {
    throw new Error("focusList: requires bullets");
  }

  const { heading } = extractOptional(data, ["heading"]);
  const headingClasses = data.heading?.classes || "";

  // when this slide has own css remove bulletList class and add focusList
  return `
    <section class="slide focusList">

      ${heading ? `<h1 class="${headingClasses}">${heading}</h1>` : ``}

      <ul>
        ${bullets.map(b => {
          const show = currentShowAt === null || (b.showAt ?? 0) <= currentShowAt;
          const isActive = (b.showAt ?? 0) === currentShowAt;

          if (!show) return "";

          const stateClass = isActive ? "active" : "dim";

          return `<li class="${b.classes || ""} ${stateClass}">${b.content}</li>`;
        }).join("")}
      </ul>

    </section>
  `;
}