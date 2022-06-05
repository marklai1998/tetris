import { Grid } from './../types/grid'

export const getGrid = ({ row, col }: { row: number; col: number }): Grid =>
  new Array(row).fill(0).map(() => new Array(col).fill(0))
