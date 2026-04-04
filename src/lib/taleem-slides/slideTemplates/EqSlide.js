// EqSlide
export function EqSlide(raw, currentShowAt = null) {
  const lines = raw.data ?? [];

  if (!lines.length) {
    throw new Error("eq: requires lines");
  }

  const activeLine =
    currentShowAt === null
      ? lines[0]
      : lines.find(l => (l.showAt ?? 0) === currentShowAt) || lines[0];

  const spItems = activeLine?.spItems ?? [];

  return `
    <section class="slide eq">
      
      <ul class="eq-lines">
        ${lines.map(line => {
          const isActive =
            currentShowAt !== null && (line.showAt ?? 0) === currentShowAt;

          const stateClass = isActive ? "highlighted" : "";

          return `
            <li class="eq-line ${line.classes || ""} ${stateClass}">
              ${line.content}
            </li>
          `;
        }).join("")}
      </ul>

      <div class="eq-side-panel">
        ${spItems.map(item => {
          if (item.name === "image") {
            return `
              <div class="eq-explain-item eq-explain-image">
                <img src="${item.content}" />
              </div>
            `;
          }

          return `
            <div class="eq-explain-item">
              ${item.content}
            </div>
          `;
        }).join("")}
      </div>

    </section>
  `;
}