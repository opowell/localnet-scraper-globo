import { afterEach, describe, expect, it } from 'vitest'
import { parserLoader, resetPage, visit } from '#scraper-test'

// The parser, evaluated with the helpers it is injected with, as a scrape runs it.
const load = parserLoader(__dirname)

afterEach(resetPage)

describe('news fronts', () => {
  it.each([
    ['globo.js', 'parseGlobo', 'https://g1.globo.com/', '<a href="https://g1.globo.com/mundo/noticia/2026/11/13/a.ghtml">A</a><a href="https://g1.globo.com/mundo/">Mundo</a>', ['https://g1.globo.com/mundo/noticia/2026/11/13/a.ghtml']],
  ])('%s reads a front as a listing of its stories', async (file, parser, url, body, listed) => {
    visit(url, body)
    const parsed = await load(file, [parser])[parser]()
    expect(parsed.listing).toBe(true)
    expect(parsed.links.map((link: any) => link.url)).toEqual(listed)
  })
})
