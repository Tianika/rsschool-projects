import './sources.css';

interface NewsSoures {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

class Sources {
    draw(data: Array<NewsSoures>): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

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
