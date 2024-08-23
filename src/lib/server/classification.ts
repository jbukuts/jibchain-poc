import 'server-only';

import { WatsonXAI } from '@ibm-cloud/watsonx-ai';

const { WATSONX_AI_SERVICE_URL, WATSONX_AI_CLASSIFIER_ID } = process.env;

export default async function classifyArticle(text: string) {
  const watsonxService = WatsonXAI.newInstance({
    version: '2024-05-31',
    serviceUrl: WATSONX_AI_SERVICE_URL
  });

  const res = await watsonxService.deploymentGenerateText({
    idOrName: WATSONX_AI_CLASSIFIER_ID as string,
    input: text,
    parameters: {
      decoding_method: 'greedy',
      max_new_tokens: 200,
      min_new_tokens: 0,
      stop_sequences: [],
      repetition_penalty: 1
    }
  });

  const category = res.result.results[0].generated_text;
  return category;
}
