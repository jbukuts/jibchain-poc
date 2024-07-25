import { PipelineRes } from '#/app/api/pipeline/types';

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
        const { title, summary, source, url } = item;

        return (
          <div
            key={idx}
            className='border border-solid border-border p-4 bg-white'>
            <h4 className='font-bold text-lg mb-3'>{title}</h4>
            <p>{source}</p>
            <p>{summary}</p>
            <a href={url}>Link</a>
          </div>
        );
      })}
    </div>
  );
}
