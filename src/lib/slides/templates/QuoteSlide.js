// QuoteSlide
export function QuoteSlide(data, currentShowAt = null) {
  const raw = data.data ?? [];

  const quoteItem = raw.find(d => d.name === "quote");
  const authorItem = raw.find(d => d.name === "author");

  const showQuote =
    currentShowAt === null || (quoteItem?.showAt ?? 0) <= currentShowAt;

  const showAuthor =
    currentShowAt === null || (authorItem?.showAt ?? 0) <= currentShowAt;

  return `
    <blockquote class="slide quoteSlide">
      ${showQuote ? `<p class="${quoteItem?.classes || ""}">${quoteItem?.content}</p>` : ``}
      ${showAuthor ? `<footer class="${authorItem?.classes || ""}">${authorItem?.content}</footer>` : ``}
    </blockquote>
  `;
}