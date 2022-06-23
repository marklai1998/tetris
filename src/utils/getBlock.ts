import { blocks } from './../constants/blockMap'
import { BlockState } from '../types/state'

export const getBlock = (): BlockState => {
  const keys = Object.keys(blocks) as (keyof typeof blocks)[]
  const blockCode = keys[Math.floor(Math.random() * keys.length)]
  return { x: 6, y: 0, rotation: 0, blockCode }
}
