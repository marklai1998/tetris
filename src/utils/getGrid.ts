export const getGrid = ({ row, col }: { row: number; col: number }): 0[][] =>
  new Array(row).fill(new Array(col).fill(0))
