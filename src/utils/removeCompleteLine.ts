import { getGrid } from './getGrid'
import { Grid } from './../types/grid'

export const removeCompleteLine = (grid: Grid) => {
  const withoutCompleteLine = grid.filter((row) => !row.every(Boolean))
  return [
    ...getGrid({
      row: grid.length - withoutCompleteLine.length,
      col: grid[0].length,
    }),
    ...withoutCompleteLine,
  ]
}
