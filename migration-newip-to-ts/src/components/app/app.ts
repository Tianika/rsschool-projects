import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e): void =>
            this.controller.getNews(e, (data) => {
                if (!data) return;
                this.view.drawNews(data);
            })
        );
        this.controller.getSources((data) => {
            if (!data) return;
            this.view.drawSources(data);
        });
    }
}

export default App;
