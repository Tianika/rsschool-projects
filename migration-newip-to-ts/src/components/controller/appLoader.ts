import Loader from './loader';
import { LINK_NEWS_API, API_KEY } from '../constants';

class AppLoader extends Loader {
    constructor() {
        super(LINK_NEWS_API, {
            apiKey: API_KEY, // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
