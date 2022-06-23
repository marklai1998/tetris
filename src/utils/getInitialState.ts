import { config } from '../constants/config'
import { drawBlockToGrid } from './drawBlockToGrid'
import { getBlock } from './getBlock'
import { getGrid } from './getGrid'

export const getInitialState = () => {
  const block = getBlock()
  const grid = getGrid(config.gridSize)
  return {
    block,
    solidGrid: grid,
    displayGrid: drawBlockToGrid({ block, grid }),
    stopped: true,
    score: 0,
  }
}
