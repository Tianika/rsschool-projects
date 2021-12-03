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
    draw(data: Array<NewsSoures>) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            if (!sourceItemTemp) return;
            const sourceClone = sourceItemTemp.content.cloneNode(true);

            sourceClone.querySelector('.source__item-name').textContent = item.name;
            sourceClone.querySelector('.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sources = document.querySelector('.sources');
        if (!sources) return;
        sources.append(fragment);
    }
}

export default Sources;
