import { ApiKey, IGetSources } from '../interfaces';
class Loader {
    baseLink: string;
    options: ApiKey;

    constructor(baseLink: string, options: ApiKey) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: { endpoint: string; options?: { sources: string } | {} },
        callback = (): void => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: {}, endpoint: string): string {
        const urlOptions: { apiKey: string; sources?: string } = { ...this.options, ...options };
        console.log(this.options, options);
        console.log(Object.keys(urlOptions));

        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        console.log(url);

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: (data?: IGetSources) => void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
