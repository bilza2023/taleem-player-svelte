export function BarChartSlide(data) {
  function getSp(item, name) {
    return item.spItems?.find(sp => sp.name === name)?.content;
  }

  const rawBars = (data.data || []).filter(d => d.name === "bar");

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

  const bars = rawBars.map((d, i) => {
    const id = `${sid}-bar${i + 1}`;
    processTimings(d, id);

    return {
      id,
      label: d.content,
      value: Number(getSp(d, "value")),
      classes: d.classes || ""
    };
  });

  if (!bars.length) {
    return { html: `<section class="slide barChart"></section>`, actions };
  }

  const maxValue = Math.max(...bars.map(b => b.value));

  const html = `
    <section class="slide barChart" id="${sid}">
      <div class="bar-chart">
        
        ${bars
          .map(bar => {
            const width = maxValue > 0 ? (bar.value / maxValue) * 100 : 0;

            return `
              <div id="${bar.id}" class="bar-row hidden ${bar.classes}">
                
                <div class="bar-label">${bar.label}</div>

                <div class="bar-track">
                  <div class="bar-fill" style="width: ${width}%"></div>
                </div>

                <div class="bar-value">${bar.value}</div>

              </div>
            `;
          })
          .join("")}

      </div>
    </section>
  `;

  return { html, actions };
}