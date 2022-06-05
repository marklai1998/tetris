import { blocks } from '../constants/blockMap'

export const drawBlockToGrid = ({
  blockCode,
  grid,
  y,
  x,
  dryRun,
}: {
  grid: (string | number)[][]
  blockCode: keyof typeof blocks
  x: number
  y: number
  dryRun?: boolean
}) => {
  const block = blocks[blockCode]

  block.forEach((row, rowIdx) => {
    const targetY = y - rowIdx
    const hitBottom = targetY >= grid.length
    if (hitBottom) {
      throw new Error('OUT_OF_BOUND')
    }
    if (targetY >= 0) {
      row.forEach((value, colIdx) => {
        if (!value) return
        const hitLeft = x - colIdx < 0
        const hitRight = x - colIdx >= grid[targetY].length
        if (hitLeft || hitRight) {
          throw new Error('OUT_OF_BOUND')
        }

        const targetX = x - colIdx

        if (grid[targetY][targetX]) {
          throw new Error('OVERLAP_VALUE')
        }

        if (!dryRun) {
          grid[targetY][targetX] = blockCode
        }
      })
    }
  })
  return grid
}
