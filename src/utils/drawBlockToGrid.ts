import { rotateMatrix } from './rotateMatrix'
import { Grid } from './../types/grid'
import { blocks } from '../constants/blockMap'
import { BlockState } from '../types/state'
import { cloneGrid } from './cloneArray'

export const drawBlockToGrid = ({
  grid,
  block: { x, y, blockCode, rotation },
}: {
  grid: Grid
  block: BlockState
}) => {
  const block = blocks[blockCode]
  const clonedGrid = cloneGrid(grid)
  const rotatedBlock = rotateMatrix(block, rotation)

  rotatedBlock.forEach((row, rowIdx) => {
    const targetY = y - rowIdx
    const hitBottom = targetY >= clonedGrid.length
    if (hitBottom) {
      throw new Error('OUT_OF_BOUND')
    }

    row.forEach((value, colIdx) => {
      if (!value) return
      const targetX = x - colIdx

      const hitLeft = targetX < 0
      const hitRight = targetX >= clonedGrid?.[targetY]?.length

      if (hitLeft || hitRight) {
        throw new Error('OUT_OF_BOUND')
      }
      if (clonedGrid?.[targetY]?.[targetX]) {
        throw new Error('OVERLAP_VALUE')
      }
      if (targetY >= 0) {
        clonedGrid[targetY][targetX] = blockCode
      }
    })
  })
  return clonedGrid
}
