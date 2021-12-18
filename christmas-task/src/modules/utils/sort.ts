import { sortTypes } from './constants';

function insertElement(firstElem: Element, secondElem) {
  if (secondElem) {
    return secondElem.parentNode.insertBefore(
      firstElem,
      secondElem.nextSibling
    );
  }
}

function getAttrForSort(typeSort: string, item): string | number {
  if (typeSort === sortTypes.sortFromLetters) {
    return item.getAttribute(typeSort).toLowerCase();
  } else {
    return +item.getAttribute(typeSort);
  }
}

//function compareValues()

export function sortAscend(typeSort: string): void {
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

export function sortDescend(typeSort: string): void {
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
