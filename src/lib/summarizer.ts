import 'server-only';

import { WatsonxAI } from '@langchain/community/llms/watsonx_ai';
import { Document } from '@langchain/core/documents';
import { PromptTemplate } from '@langchain/core/prompts';
import { TokenTextSplitter } from '@langchain/textsplitters';
import { loadSummarizationChain } from 'langchain/chains';

const { WATSONX_AI_APIKEY, WATSONX_AI_PROJECT_ID } = process.env;

const SUMMARY_TEMPLATE = `
Read the following news article and then write an informational and factual summary in 5 sentences.

News Article: {text}
Summary:
`.trimStart();

const TEXT_SPLITTER = new TokenTextSplitter({
  chunkSize: 10000,
  chunkOverlap: 250
});

interface ModelParams {
  model_id: string;
  decoding_method: 'sample' | 'greedy';
  temperature?: number;
  top_p?: number;
  top_k?: number;
  min_new_tokens: number;
  max_new_tokens: number;
  repetition_penalty?: number;
  stop_sequences?: string[];
}

const DEF_MODEL_PARAMS: ModelParams = {
  model_id: 'meta-llama/llama-3-405b-instruct',
  decoding_method: 'greedy',
  max_new_tokens: 200,
  min_new_tokens: 50,
  repetition_penalty: 1.0,
  stop_sequences: ['<|endoftext|>', '\n\n']
};

/**
 * Summarize input text via watsonx.ai
 *
 * @param body input text to summarize
 * @returns summarized text
 */
export default async function summarizeText(
  body: string,
  params?: ModelParams
) {
  const { model_id, ...rest } = params || DEF_MODEL_PARAMS;

  const document = new Document({
    pageContent: body
  });

  const llmSummarizer = new WatsonxAI({
    ibmCloudApiKey: WATSONX_AI_APIKEY,
    projectId: WATSONX_AI_PROJECT_ID,
    modelId: model_id,
    modelParameters: rest
  });

  const splitDocs = await TEXT_SPLITTER.splitDocuments([document]);
  const summaryPrompt = PromptTemplate.fromTemplate(SUMMARY_TEMPLATE);

  const chain = loadSummarizationChain(llmSummarizer, {
    type: 'stuff',
    verbose: false,
    prompt: summaryPrompt
  });

  const summary = await chain.run(splitDocs);
  return summary;
}
