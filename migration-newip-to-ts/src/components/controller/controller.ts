import AppLoader from './appLoader';
import { INewsData, IGetSources, CallbackType, SourceId } from '../interfaces';

class AppController extends AppLoader {
    getSources(callback: CallbackType<IGetSources>): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: CallbackType<INewsData>): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (!target || !newsContainer) return;

            if (target.classList.contains('source__item')) {
                const sourceId: SourceId = target.getAttribute('data-source-id');

                if (!sourceId) return;

                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
