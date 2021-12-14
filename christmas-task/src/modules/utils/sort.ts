import { dataToys } from './interfaces'

export function sortingFromFirstLetter(data: Array<dataToys>): Array<dataToys> {
  data.sort((prev, next): any => {
    if (prev.name < next.name) return -1
    if (prev.name < next.name) return 1
  })

  return data
}

export function sortingFromLastLetter(data: Array<dataToys>): Array<dataToys> {
  data.sort((prev, next): any => {
    if (prev.name > next.name) return -1
    if (prev.name > next.name) return 1
  })

  return data
}

export function newOnesFirst(data: Array<dataToys>): Array<dataToys> {
  data.sort((prev, next): number => Number(next.year) - Number(prev.year))

  return data
}

export function oldOnesFirst(data: Array<dataToys>): Array<dataToys> {
  data.sort((prev, next): number => Number(prev.year) - Number(next.year))

  return data
}
