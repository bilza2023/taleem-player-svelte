export function TableSlide(raw) {
  const items = raw.data;
  const tableClasses = raw.classes || "";

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("table: requires rows");
  }

  return `
    <section class="slide table">
      <table class="${tableClasses}">
        <tbody>
          ${items
            .filter(item => item.name === "row")
            .map(item => {
              const cells = item.content
                .split(",")
                .map(s => s.trim());

              return `
                <tr>
                  ${cells
                    .map(cell => `<td>${cell}</td>`)
                    .join("")}
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    </section>
  `;
}