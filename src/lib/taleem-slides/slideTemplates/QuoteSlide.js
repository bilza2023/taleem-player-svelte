export function QuoteSlide(data) {
  const raw = data.data ?? [];

  const quoteItem = raw.find(d => d.name === "quote");
  const authorItem = raw.find(d => d.name === "author");

  const actions = [];
  const sid = `s${data.start}`;
  const quoteId = `${sid}-quote`;
  const authorId = `${sid}-author`;

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

  if (quoteItem) processTimings(quoteItem, quoteId);
  if (authorItem) processTimings(authorItem, authorId);

  const html = `
    <blockquote class="slide quoteSlide" id="${sid}">
      <p id="${quoteId}" class="hidden ${quoteItem?.classes || ""}">
        ${quoteItem?.content || ""}
      </p>
      <footer id="${authorId}" class="hidden ${authorItem?.classes || ""}">
        ${authorItem?.content || ""}
      </footer>
    </blockquote>
  `;

  return { html, actions };
}