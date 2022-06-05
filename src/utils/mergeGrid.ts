export const mergeGrid = (
  sourceGird: (string | number)[][],
  destGrid: (string | number)[][]
) =>
  destGrid.map((row, rowIdx) =>
    row.map((cell, cellIdx) => sourceGird[rowIdx][cellIdx] || cell)
  )
