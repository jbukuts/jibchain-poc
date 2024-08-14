import { PipelineRes } from '#/app/api/pipeline/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '#/components/ui/card';

const getData = async () => {
  const res = await fetch('http://localhost:3000/api/pipeline', {
    // cache: 'no-store',
    method: 'GET'
  }).then((r) => r.json());
  return res as PipelineRes;
};

export default async function Test() {
  const res = await getData();

  if (res.status !== 200) return null;

  return (
    <div className='flex flex-col gap-2 p-4'>
      {res.data.map((item, idx) => {
        const { title, summary, source, url, date } = item;

        return (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>
                {source} - {date}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{summary}</p>
            </CardContent>
            <CardFooter className='gap-3'>
              <a href={url}>Link</a>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
