import { AsyncParser } from '@json2csv/node';
import { NextRequest } from 'next/server';
import getAllArticles from '#/lib/aggregate-articles';
import PerformanceMarker from '#/lib/PerformanceMarker';
import scraper from '#/lib/scraper';
import summarizeText from '#/lib/summarizer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

/**
 * API route handler for summarization/classification pipeline
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const output = searchParams.get('output') || 'json';

  const articleMarker = new PerformanceMarker();
  const summaryMarker = new PerformanceMarker();

  // pull article data from new aggregate API
  articleMarker.start();
  const articles = await getAllArticles();
  articleMarker.end();

  // summarize all articles
  summaryMarker.start();
  const summaries = await Promise.all(
    articles.map(async (article) => {
      const { url, body } = article;
      const scraped = await scraper(url);

      return summarizeText(scraped?.textContent || body, {
        model_id: 'meta-llama/llama-3-405b-instruct',
        decoding_method: 'sample',
        temperature: 0.15,
        top_p: 1,
        top_k: 20,
        max_new_tokens: 200,
        min_new_tokens: 50,
        repetition_penalty: 1.0,
        stop_sequences: ['<|endoftext|>', '\n\n']
      });

      // TODO: classification step
    })
  );
  summaryMarker.end();

  const dataObj = summaries.map((summary, idx) => {
    const {
      title,
      date,
      url,
      source: { title: source }
    } = articles[idx];

    return {
      title,
      date,
      summary,
      url,
      source
    };
  });

  if (output === 'csv') {
    const parser = new AsyncParser();
    const csv = await parser.parse(dataObj).promise();

    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment;filename=summaries_${new Date()
          .toJSON()
          .slice(0, 19)
          .replaceAll(/-|\:|\T/g, '_')}.csv`
      }
    });
  }

  return Response.json({
    status: 200,
    total: summaries.length,
    performance: {
      aggregate: articleMarker.measure(),
      summary_total: summaryMarker.measure(),
      summary_avg: summaryMarker.measure() / summaries.length
    },
    data: dataObj
  });
}
