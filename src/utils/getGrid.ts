export const getGrid = ({
  row,
  col,
}: {
  row: number
  col: number
}): (string | number)[][] =>
  new Array(row).fill(0).map(() => new Array(col).fill(0))
