import { config } from '../constants/config'
import { getBlock } from './getBlock'
import { getGrid } from './getGrid'

export const getInitialState = () => ({
  block: getBlock(),
  grid: getGrid(config.gridSize),
  stopped: true,
  score: 0,
})
