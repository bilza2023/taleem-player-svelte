export function EqSlide(data) {
  const lines = data.data ?? [];

  if (!lines.length) {
    throw new Error("eq: requires lines");
  }

  const actions = [];
  const sid = `s${data.start}`;

  function processTimings(item, id) {
    if (!item?.timings) return;

    for (const t of item.timings) {
      if (t.event === "show") {
        actions.push({
          time: t.time,
          targets: [id],
          action: "removeClass",
          classes: ["hidden"]
        });
      }
    }
  }

  const html = `
    <section class="slide eq" id="${sid}">
      
      <ul class="eq-lines">
        ${lines.map((line, i) => {
          const id = `${sid}-line${i + 1}`;
          processTimings(line, id);

          return `
            <li id="${id}" class="eq-line hidden ${line.classes || ""}">
              ${line.content}
            </li>
          `;
        }).join("")}
      </ul>

      <div class="eq-side-panel">
        ${lines.map((line, i) => {
          const spItems = line.spItems ?? [];

          return spItems.map((item, j) => {
            const id = `${sid}-sp${i + 1}-${j + 1}`;
            processTimings(line, id);

            if (item.name === "image") {
              return `
                <div id="${id}" class="eq-explain-item eq-explain-image hidden">
                  <img src="${item.content}" />
                </div>
              `;
            }

            return `
              <div id="${id}" class="eq-explain-item hidden">
                ${item.content}
              </div>
            `;
          }).join("");
        }).join("")}
      </div>

    </section>
  `;

  return { html, actions };
}