import scraper from '#/lib/scraper';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

/**
 * API route handler for testing manual scraping
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  const articleContent = await scraper(url as string);

  return Response.json({ text: articleContent?.textContent });
}
