import { ApiKey, IGetSources, IGetResp, Options, GetRespCallback, LoadParams } from '../interfaces';
import { defaultErrorInfo } from '../utils';

class Loader {
    baseLink: string;
    options: ApiKey;

    constructor(baseLink: string, options: ApiKey) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: IGetResp,
        callback: GetRespCallback = defaultErrorInfo
    ) {
        this.load({method: 'GET', endpoint, callback, options});
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404){
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
                
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl( options: Options, endpoint: string): string {
        const urlOptions: Options = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        const urlOptionsKeys = Object.keys(urlOptions) as Array<keyof typeof urlOptions>

        urlOptionsKeys.forEach((key): void => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load({method, endpoint, callback, options = {}}: LoadParams): void {
        const url = this.makeUrl(options, endpoint);

        fetch(url, { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
