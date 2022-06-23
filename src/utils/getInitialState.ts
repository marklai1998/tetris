import { config } from '../constants/config'
import { State } from '../types/state'
import { getBlock } from './getBlock'
import { getGrid } from './getGrid'

export const getInitialState = (): State => ({
  block: getBlock(),
  nextBlock: getBlock(),
  grid: getGrid(config.gridSize),
  savedBlock: null,
  stopped: true,
  score: 0,
  alreadySaved: false,
})
