import { EventRegistry, TopicPage } from 'eventregistry';
import getAllArticles from '#/lib/aggregate-articles';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

const { NEWS_API_KEY, NEW_API_TOPIC_URI } = process.env;

const er = new EventRegistry({
  apiKey: NEWS_API_KEY,
  allowUseOfArchive: false
});

/**
 * API route handler for testing scraping logic
 */
export async function GET() {
  const topic = new TopicPage(er);
  await topic.loadTopicPageFromER(NEW_API_TOPIC_URI as string);
  const articles = await getAllArticles(5);

  return Response.json({
    status: 200,
    data: articles.map((sum, idx) => {
      const {
        title,
        date,
        url,
        body,
        source: { title: source }
      } = articles[idx];

      return {
        title,
        date,
        orig: body,
        url,
        source
      };
    })
  });
}
