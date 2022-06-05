import { rotateMatrix } from './rotateMatrix'
import { Grid } from './../types/grid'
import { blocks } from '../constants/blockMap'
import { BlockState } from '../types/state'

export const drawBlockToGrid = ({
  grid,
  block: { x, y, blockCode, rotation },
  dryRun,
}: {
  grid: Grid
  block: BlockState
  dryRun?: boolean
}) => {
  const block = blocks[blockCode]

  const rotatedBlock = rotateMatrix(block, rotation)

  rotatedBlock.forEach((row, rowIdx) => {
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
