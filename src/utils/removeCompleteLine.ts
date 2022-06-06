import { getGrid } from './getGrid'
import { Grid } from './../types/grid'

export const removeCompleteLine = (grid: Grid) => {
  const withoutCompleteLine = grid.filter((row) => !row.every(Boolean))
  const removedLine = grid.length - withoutCompleteLine.length

  return {
    removedLine,
    grid: [
      ...getGrid({ row: removedLine, col: grid[0].length }),
      ...withoutCompleteLine,
    ],
  }
}
