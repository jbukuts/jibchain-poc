import { EventRegistry, TopicPage } from 'eventregistry';

const { NEWS_API_KEY } = process.env;

const TOPIC_URI = 'a9ecc696-6e83-4e67-8927-c5f081051742';

const er = new EventRegistry({
  apiKey: NEWS_API_KEY,
  allowUseOfArchive: false
});

export async function GET() {
  const topic = new TopicPage(er);
  const articles = await topic.loadTopicPageFromER(TOPIC_URI).then(() => {
    return topic.getArticles({ count: 5, dataType: ['news'] });
  });

  return Response.json({ data: articles });
}
