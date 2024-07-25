import { TopicPage } from 'eventregistry';
import { type ER } from 'eventregistry';

export interface GetArticlesRes {
  articles: {
    page: number;
    pages: number;
    totalResults: number;
    results: Article[];
  };
  topicPage: TopicPage;
}

export interface Article {
  uri: string;
  lang: string;
  isDuplicate: boolean;
  date: string;
  time: string;
  dateTime: string;
  dateTimePub: string;
  dataType: ER.DataType;
  sim: number;
  url: string;
  title: string;
  body: string;
  source: {
    uri: string;
    dataType: ER.DataType;
    title: string;
  };
  authors: any[];
  image: string;
  eventUri: string;
  sentiment: number;
  wgt: number;
  relevance: number;
}

interface PipelineResSuccess {
  status: 200;
  performance: {
    aggregate: number;
    summarization_total: number;
  };
  data: {
    title: string;
    date: string;
    url: string;
    source: string;
    summary: string;
  }[];
}

interface PipelineResError {
  status: 400 | 401 | 500;
  msg: string;
}

export type PipelineRes = PipelineResError | PipelineResSuccess;
