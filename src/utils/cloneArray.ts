import { Grid } from '../types/grid'

export const cloneGrid = (grid: Grid): Grid =>
  grid.map((row) => row.map((cell) => cell))
