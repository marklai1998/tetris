import { blocks } from '../constants/blockMap'

export const getRandomBlock = () => {
  const keys = Object.keys(blocks) as (keyof typeof blocks)[]
  const ran_key = keys[Math.floor(Math.random() * keys.length)]
  return ran_key
}
