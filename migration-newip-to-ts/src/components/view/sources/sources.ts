import './sources.css';
import { ISources } from '../../interfaces';

class Sources {
    draw(data: Array<ISources>): void {
        const fragmentL = document.createDocumentFragment();
        const letterItemTemp: HTMLTemplateElement | null = document.querySelector('#letterItemTemp');

        let setLetters: Set<string> = new Set();
        data.forEach((item) => {
            setLetters.add(item.id[0].toUpperCase());
        });

        let letterArr: Array<string> = [...setLetters];

        letterArr.forEach((item) => {
            if (!letterItemTemp) return;
            const letterClone = letterItemTemp.content.cloneNode(true) as HTMLTemplateElement;

            if (!letterClone) return;
            (letterClone.querySelector('.letter__item-name') as HTMLElement).textContent = item;

            const letterItem = letterClone.querySelector('.letter__item') as HTMLElement;
            letterItem.setAttribute('data-letter-id', item);
            letterItem.addEventListener('click', (e) => {
                console.log(e);
            });

            fragmentL.append(letterClone);
        });

        const letters = document.querySelector('.letters');
        if (!letters) return;
        letters.append(fragmentL);

        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            if (!sourceItemTemp) return;
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;

            if (!sourceClone) return;
            (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;

            const sourceItem = sourceClone.querySelector('.source__item') as HTMLElement;
            sourceItem.setAttribute('data-source-id', item.id);

            if (item.name[0].toUpperCase() !== 'A') {
                sourceItem.classList.add('hide');
            }

            fragment.append(sourceClone);
        });

        const sources = document.querySelector('.sources');
        if (!sources) return;
        sources.append(fragment);
    }
}

export default Sources;
