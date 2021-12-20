import { sortTypes } from './constants';

export function sortToys(index: number): void {
  switch (index) {
    case 0:
      sortAscend(sortTypes.default);
      break;
    case 1:
      sortAscend(sortTypes.sortFromLetters);
      break;
    case 2:
      sortDescend(sortTypes.sortFromLetters);
      break;
    case 3:
      sortDescend(sortTypes.sortFromYear);
      break;
    case 4:
      sortAscend(sortTypes.sortFromYear);
      break;
  }
}

function sortAscend(typeSort: string): void {
  const cards = document.querySelector('.toys-container') as HTMLElement;

  if (!cards) return;

  for (let i = 0; i < cards.children.length; i++) {
    for (let j = i; j < cards.children.length; j++) {
      if (
        getAttrForSort(typeSort, cards.children[i]) >
        getAttrForSort(typeSort, cards.children[j])
      ) {
        const replacedCard = cards.replaceChild(
          cards.children[j],
          cards.children[i]
        );
        cards.children[j - 1].after(replacedCard);
      }
    }
  }
}

function sortDescend(typeSort: string): void {
  const cards = document.querySelector('.toys-container') as HTMLElement;

  if (!cards) return;

  for (let i = 0; i < cards.children.length; i++) {
    for (let j = i; j < cards.children.length; j++) {
      if (
        getAttrForSort(typeSort, cards.children[i]) <
        getAttrForSort(typeSort, cards.children[j])
      ) {
        const replacedCard = cards.replaceChild(
          cards.children[j],
          cards.children[i]
        );
        cards.children[j - 1].after(replacedCard);
      }
    }
  }
}

function getAttrForSort(typeSort: string, item): string | number {
  if (typeSort === sortTypes.sortFromLetters) {
    return item.getAttribute(typeSort).toLowerCase();
  } else {
    return +item.getAttribute(typeSort);
  }
}
