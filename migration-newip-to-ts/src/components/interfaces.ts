export interface ISources {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

export interface INews {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: Source;
    title: string;
    url: string;
    urlToImage: string;
}

export type Source = { id: string; name: string };

export interface INewsData {
    articles: Array<INews>;
    status: string;
    totalResults: number;
}

export interface IGetSources {
    status: string;
    sources: Array<ISources>;
}

export type ApiKey = { apiKey: string };

export type CallbackType<T> = (data?: T) => void

export type SourceId = string | null

export type Options = Record<string, unknown>

export interface IGetResp { 
    endpoint: string; 
    options?: { sources: string } | Options
 }

export type GetRespCallback = () => void

export type LoadParams = {
    method: string;
    endpoint: string;
    callback: CallbackType<IGetSources>;
    options: Options
}