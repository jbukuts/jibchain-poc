import getAllArticles from '#/lib/aggregate-articles';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

/**
 * API route handler for testing scraping logic
 */
export async function GET() {
  const articles = await getAllArticles();

  return Response.json({
    status: 200,
    data: articles
  });
}
