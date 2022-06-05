import { blocks } from '../constants/blockMap'
import { Grid } from './grid'

export type BlockState = {
  x: number
  y: number
  rotation: 0 | 1 | 2 | 3
  blockCode: keyof typeof blocks
}

export type State = {
  grid: Grid
  currentBlock: BlockState

  clock: number | undefined
  stopped: boolean
  score: number
}
