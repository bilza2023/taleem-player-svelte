export function BarChartSlide(raw, currentShowAt = null) {
  function getSp(item, name) {
    return item.spItems?.find(sp => sp.name === name)?.content;
  }

  const rawBars = (raw.data || []).filter(d => d.name === "bar");

  const visibleBars =
    currentShowAt === null
      ? rawBars
      : rawBars.filter(b => (b.showAt ?? 0) <= currentShowAt);

  const bars = visibleBars.map(d => ({
    label: d.content,
    value: Number(getSp(d, "value")),
    classes: d.classes || ""
  }));

  if (!bars.length) {
    return `<section class="slide barChart"></section>`;
  }

  const maxValue = Math.max(...bars.map(b => b.value));

  return `
    <section class="slide barChart">
      <div class="bar-chart">
        
        ${bars
          .map(bar => {
            const width = maxValue > 0 ? (bar.value / maxValue) * 100 : 0;

            return `
              <div class="bar-row ${bar.classes}">
                
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
}