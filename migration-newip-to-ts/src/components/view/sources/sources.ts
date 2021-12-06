import './sources.css';
import { ISources } from '../../interfaces';

class Sources {
    draw(data: Array<ISources>): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        console.log(data);
        let setLetters = new Set();
        data.forEach((item) => {
            setLetters.add(item.id[0].toUpperCase());
        });
        console.log(setLetters);

        data.forEach((item) => {
            if (!sourceItemTemp) return;
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;

            if (!sourceClone) return;
            (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sources = document.querySelector('.sources');
        if (!sources) return;
        sources.append(fragment);
    }
}

export default Sources;
