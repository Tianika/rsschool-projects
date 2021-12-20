import { sortTypes } from './constants';

export function sortToys(index: number): void {
  switch (index) {
    case 0:
      sortDescend(sortTypes.default);
      break;
    case 1:
      sortDescend(sortTypes.sortFromLetters);
      break;
    case 2:
      sortAscend(sortTypes.sortFromLetters);
      break;
    case 3:
      sortAscend(sortTypes.sortFromYear);
      break;
    case 4:
      sortDescend(sortTypes.sortFromYear);
      break;
  }
}

function sortAscend(typeSort: string): void {
  const cards = document.querySelector('.toys-container');

  if (!cards) return;

  for (let i = 0; i < cards.children.length; i++) {
    for (let j = i; j < cards.children.length; j++) {
      if (
        getAttrForSort(typeSort, cards.children[i]) <
        getAttrForSort(typeSort, cards.children[j])
      ) {
        const replacedElem = cards.replaceChild(
          cards.children[i],
          cards.children[j]
        );

        insertElement(replacedElem, cards.children[i]);
      }
    }
  }
}

function sortDescend(typeSort: string): void {
  const cards = document.querySelector('.toys-container');

  if (!cards) return;

  for (let i = 0; i < cards.children.length; i++) {
    for (let j = i; j < cards.children.length; j++) {
      if (
        getAttrForSort(typeSort, cards.children[i]) >
        getAttrForSort(typeSort, cards.children[j])
      ) {
        const replacedElem = cards.replaceChild(
          cards.children[i],
          cards.children[j]
        );

        insertElement(replacedElem, cards.children[i]);
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

function insertElement(firstElem: Element, secondElem) {
  if (secondElem) {
    return secondElem.parentNode.insertBefore(
      firstElem,
      secondElem.nextSibling
    );
  }
}
