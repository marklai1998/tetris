import { Grid } from './../types/grid'

export const mergeGrid = (sourceGird: Grid, destGrid: Grid): Grid =>
  destGrid.map((row, rowIdx) =>
    row.map((cell, cellIdx) => sourceGird[rowIdx][cellIdx] || cell)
  )
