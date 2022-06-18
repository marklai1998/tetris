import { cloneGrid } from './cloneArray'
import { getGrid } from './getGrid'
import { Grid } from './../types/grid'

export const removeCompleteLine = (grid: Grid) => {
  const clonedGrid = cloneGrid(grid)
  const withoutCompleteLine = clonedGrid.filter((row) => !row.every(Boolean))
  const removedLine = clonedGrid.length - withoutCompleteLine.length

  return {
    removedLine,
    grid: [
      ...getGrid({ row: removedLine, col: grid[0].length }),
      ...withoutCompleteLine,
    ],
  }
}
