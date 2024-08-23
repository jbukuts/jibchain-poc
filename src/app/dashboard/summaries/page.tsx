import { format } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '#/components/ui/alert';
import { Badge } from '#/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '#/components/ui/card';
import getAllArticles from '#/lib/server/aggregate-articles';
import classifyArticle from '#/lib/server/classification';
import scraper from '#/lib/server/scraper';
import summarizeText from '#/lib/server/summarizer';

interface ClassifiedSummary {
  title: string;
  summary: string;
  date: string;
  source: string;
  url: string;
  category: string;
}

export const dynamic = 'force-static';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getSummaries(): Promise<ClassifiedSummary[]> {
  /**
   * API route handler for summarization/classification pipeline
   */

  const articles = await getAllArticles();

  const summaries: any[] = [];

  const MAX_CONCURRENT = 8;
  const iterations = Math.ceil(articles.length / MAX_CONCURRENT);

  // need to limit max concurrent API calls or else will 429
  for await (const i of Array.from({ length: iterations }, (v, k) => k)) {
    const s = await Promise.all(
      articles
        .slice(i * MAX_CONCURRENT, (i + 1) * MAX_CONCURRENT)
        .map(async (article) => {
          const { url, body } = article;
          const scraped = await scraper(url);

          const summary = await summarizeText(scraped?.textContent || body, {
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

          // not ideal but the only way to realy avoid the 429 while keeping some concurrency
          await sleep(1000);

          // classification added
          const category = await classifyArticle(summary);

          summaries.push({ summary, category });
        })
    );

    await sleep(1000);

    summaries.concat(s);
  }

  // for await (const a of articles) {
  //   const { url, body } = a;
  //   const scraped = await scraper(url);

  //   const summary = await summarizeText(scraped?.textContent || body, {
  //     model_id: 'meta-llama/llama-3-405b-instruct',
  //     decoding_method: 'sample',
  //     temperature: 0.15,
  //     top_p: 1,
  //     top_k: 20,
  //     max_new_tokens: 200,
  //     min_new_tokens: 50,
  //     repetition_penalty: 1.0,
  //     stop_sequences: ['<|endoftext|>', '\n\n']
  //   });

  //   // classification added
  //   const category = await classifyArticle(summary);

  //   summaries.push({ summary, category });
  // }

  const dataObj: ClassifiedSummary[] = summaries.map((llm_data, idx) => {
    const {
      title,
      date,
      url,
      source: { title: source }
    } = articles[idx];

    const { summary, category } = llm_data;

    return {
      title,
      date,
      summary,
      category,
      url,
      source
    };
  });

  return dataObj;
}

function SummaryCard(props: ClassifiedSummary) {
  const { title, summary, date, category, url } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className='flex flex-col gap-2 items-start mt-3'>
          <p>{format(date, 'LLLL d u')}</p>
          <Badge variant={'secondary'}>{category}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className='mb-2'>{summary}</p>
        <a
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          className='underline'>
          Original Source
        </a>
      </CardContent>
    </Card>
  );
}

export default async function SummaryPage() {
  const summaries = await getSummaries();

  return (
    <div className='p-4 mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>Article Summaries</h1>
      <Alert className='mb-4 z-0'>
        <AlertTitle>AI Driven Summaries</AlertTitle>
        <AlertDescription>
          Below are example outputs of leveraging generative AI to distill
          articles down into easily digestable summaries and classify them into
          risk categories.
        </AlertDescription>
      </Alert>
      <div className='flex flex-col gap-4'>
        {summaries.map((s, idx) => (
          <SummaryCard key={idx} {...s} />
        ))}
      </div>
    </div>
  );
}
