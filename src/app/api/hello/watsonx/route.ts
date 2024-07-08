import { WatsonXAI } from '@ibm-cloud/watsonx-ai';

const { WATSONX_AI_PROJECT_ID, WATSONX_AI_SERVICE_URL } = process.env;

const watsonxAIService = WatsonXAI.newInstance({
  version: '2024-05-31',
  serviceUrl: WATSONX_AI_SERVICE_URL
});

export async function GET(_req: Request) {
  const origText = 'this is a test of the embedding api';

  const test = await watsonxAIService.textEmbeddings({
    parameters: {},
    projectId: WATSONX_AI_PROJECT_ID,
    inputs: [origText],
    modelId: 'ibm/slate-125m-english-rtrvr'
  });

  return Response.json({ data: test.result });
}
