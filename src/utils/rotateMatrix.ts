export const rotateMatrix = <T>(matrix: T[][], times: number): T[][] => {
  if (times <= 0) return matrix
  const rotated = matrix[0].map((val, index) =>
    matrix.map((row) => row[index]).reverse()
  )
  return rotateMatrix(rotated, times - 1)
}
