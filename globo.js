// A story (g1.globo.com/…/noticia/2026/11/13/….ghtml, and those of Globo's other sites, ge.globo.com among them) reads
// as its headline and the paragraphs, headings, lists and pictures of its body (.mc-article-body), headed by its
// authors and time. Any other page (a home page, a section) is a listing of each story it links to.
function parseGlobo(_profileId) {
  if (!/(?:^|\.)globo\.com$/.test(location.hostname)) {
    return null
  }
  return newsPage({
    body: '.mc-article-body',
    title: '.content-head__title, h1',
    skip: '.content-ads, .content-media__description__share, [class*="publicidade"]',
    listed: /^https:\/\/[a-z0-9.]*globo\.com\/.+\/noticia\/\d{4}\/\d{2}\/\d{2}\/.+\.ghtml$/,
    article: /\/noticia\//.test(location.pathname),
  })
}

// The parser a scrape calls.
registerParser(parseGlobo)
