import {
  EventRegistry,
  QueryArticles,
  RequestArticlesInfo
} from 'eventregistry';

const { NEWS_API_KEY } = process.env;

const er = new EventRegistry({
  apiKey: NEWS_API_KEY,
  allowUseOfArchive: false
});

export async function GET(_req: Request) {
  const requestArticlesInfo = new RequestArticlesInfo({
    count: 100,
    sortBy: 'date',
    sortByAsc: false
  });
  const q1 = new QueryArticles({
    keywords: 'Barack Obama',
    dataType: ['news', 'pr']
  });
  q1.setRequestedResult(requestArticlesInfo);
  const res = await er.execQuery(q1);

  return Response.json({ data: res });
}
