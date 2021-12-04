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
