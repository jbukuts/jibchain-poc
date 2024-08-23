import 'server-only';

import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';

/**
 * Takes URL to articles and returns scraped body content
 *
 * @param url URL to web article
 * @returns scraped content
 */
export default async function scraper(url: string) {
  try {
    const html = await fetch(url as string, {
      method: 'GET',
      cache: 'no-store'
    }).then((r) => r.text());

    const doc = new JSDOM(html, { url: url as string });
    const articleText = new Readability(doc.window.document, {
      debug: false
    }).parse();

    return articleText;
  } catch {
    return null;
  }
}
