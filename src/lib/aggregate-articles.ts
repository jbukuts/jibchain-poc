import 'server-only';

import { EventRegistry, TopicPage } from 'eventregistry';
import { Article, GetArticlesRes } from '../app/api/pipeline/types';

const { NEWS_API_KEY, NEW_API_TOPIC_URI } = process.env;

/**
 * Collect all articles from topic page into a flat list
 *
 * @param count amount of articles to pull per request
 * @returns list of article objects
 */
export default async function getAllArticles(
  count: number = 100
): Promise<Article[]> {
  const er = new EventRegistry({
    apiKey: NEWS_API_KEY,
    allowUseOfArchive: false
  });

  const topic = new TopicPage(er);
  await topic.loadTopicPageFromER(NEW_API_TOPIC_URI as string);

  const getArticlesPage = async (page: number = 1) => {
    return (await topic.getArticles({
      page,
      count,
      dataType: ['news']
    })) as GetArticlesRes;
  };

  const {
    articles: { pages, results }
  } = await getArticlesPage();

  const batch = await Promise.all(
    Array.from({ length: pages - 1 }, (_, i) => i + 2).map(async (p) => {
      const res = await getArticlesPage(p);
      return res.articles.results;
    })
  );

  return [...results, ...batch.flat()];
}
