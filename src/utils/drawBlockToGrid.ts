import { rotateMatrix } from './rotateMatrix'
import { Grid } from './../types/grid'
import { blocks } from '../constants/blockMap'
import { BlockState } from '../types/state'
import { cloneGrid } from './cloneArray'

export const drawBlockToGrid = ({
  grid,
  block: { x, y, blockCode, rotation },
  override = false,
}: {
  grid: Grid
  block: BlockState
  override?: boolean
}) => {
  const block = blocks[blockCode]
  const clonedGrid = cloneGrid(grid)
  const rotatedBlock = rotateMatrix(block, rotation)

  rotatedBlock.forEach((row, rowIdx) => {
    const targetY = y - rowIdx

    row.forEach((value, colIdx) => {
      if (!value) return
      const targetX = x - colIdx

      const hitLeft = targetX < 0
      const hitRight = targetX >= clonedGrid?.[targetY]?.length
      const hitBottom = targetY >= clonedGrid.length

      if (hitLeft || hitRight || hitBottom) {
        throw new Error('OUT_OF_BOUND')
      }

      if (clonedGrid?.[targetY]?.[targetX] && !override) {
        throw new Error('OVERLAP_VALUE')
      }

      if (targetY >= 0) {
        clonedGrid[targetY][targetX] = blockCode
      }
    })
  })
  return clonedGrid
}
