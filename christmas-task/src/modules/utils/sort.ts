import { sortTypes } from './constants';
import { sortValue, typeForSortFunc } from './interfaces';

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

function sortDescend(typeSort: string): void {
  const cards = document.querySelector('.toys-container') as Element;

  if (!cards) return;

  for (let i = 0; i < cards.children.length; i++) {
    for (let j = i; j < cards.children.length; j++) {
      const valueI: typeForSortFunc = getAttrForSort(
        typeSort,
        cards.children[i]
      );
      const valueJ: typeForSortFunc = getAttrForSort(
        typeSort,
        cards.children[j]
      );

      if (valueI && valueJ && valueI < valueJ) {
        const el: Element = cards.replaceChild(
          cards.children[j],
          cards.children[i]
        );

        cards.insertBefore(el, cards.children[i].nextSibling);
      }
    }
  }
}

function sortAscend(typeSort: string): void {
  const cards = document.querySelector('.toys-container') as Element;

  for (let i = 0; i < cards.children.length; i++) {
    for (let j = i; j < cards.children.length; j++) {
      const valueI: typeForSortFunc = getAttrForSort(
        typeSort,
        cards.children[i]
      );
      const valueJ: typeForSortFunc = getAttrForSort(
        typeSort,
        cards.children[j]
      );

      if (valueI && valueJ && valueI > valueJ) {
        const el: Element = cards.replaceChild(
          cards.children[j],
          cards.children[i]
        );

        cards.insertBefore(el, cards.children[i].nextSibling);
      }
    }
  }
}

function getAttrForSort(typeSort: string, item: Element): typeForSortFunc {
  if (typeSort === sortTypes.sortFromLetters) {
    const value: sortValue = item.getAttribute(typeSort);

    return value?.toLowerCase();
  } else {
    const value: sortValue = item.getAttribute(typeSort);

    if (value) {
      return +value;
    }
  }
}
