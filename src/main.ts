import { blocks } from './constants/blockMap'
import { observe } from './utils/observe'
import './index.css'
import { config } from './constants/config'

import { BlockState, State } from './types/state'
import { drawBlockToGrid } from './utils/drawBlockToGrid'
import { removeCompleteLine } from './utils/removeCompleteLine'
import './components'
import { TetrisGrid } from './components/TetrisGrid'
import { Grid } from './types/grid'

const getBlock = (): BlockState => {
  const keys = Object.keys(blocks) as (keyof typeof blocks)[]
  const blockCode = keys[Math.floor(Math.random() * keys.length)]
  return { x: 6, y: 0, rotation: 0, blockCode }
}

const getObservedState = (): State => {
  const grid: Grid = new Array(config.gridSize.row)
    .fill(0)
    .map(() => new Array(config.gridSize.col).fill(0))

  return observe(
    { block: getBlock(), grid, stopped: true, score: 0 },
    (prop, { grid, block, score, stopped }) => {
      switch (prop) {
        case 'grid':
        case 'block': {
          const playArea = document.querySelector('#grid')
          if (!playArea) return
          const gridEle = new TetrisGrid(grid)
          const displayGrid = drawBlockToGrid({ grid, block })

          playArea.innerHTML = ''
          gridEle.grid = displayGrid
          playArea.appendChild(gridEle)
          break
        }
        case 'score': {
          const scoreEle = document.querySelector('#score') as HTMLElement
          if (!scoreEle) return
          scoreEle.innerText = score.toString()
          break
        }
        case 'stopped': {
          if (stopped) {
            clearInterval(clock)
            clock = undefined
          } else {
            clock = setInterval(tick, config.speed)
          }
          document
            .querySelector('#stop')
            ?.setAttribute('active', stopped ? 'true' : 'false')
          break
        }
      }
    }
  )
}

let clock: number | undefined
let currentState = getObservedState()

const updateBlock = (update: Partial<BlockState>) => {
  try {
    const newState = { ...currentState.block, ...update }
    drawBlockToGrid({ grid: currentState.grid, block: newState })
    currentState.block = newState
    return true
  } catch (e) {
    return false
  }
}

const resetClockTick = () => {
  clearInterval(clock)
  clock = undefined
  clock = setInterval(tick, config.speed)
}

const tick = () => {
  currentState.score += 1
  if (updateBlock({ y: currentState.block.y + 1 })) return

  // Landed
  const { grid, block } = currentState
  const { grid: newGrid, removedLine } = removeCompleteLine(
    drawBlockToGrid({ grid, block })
  )

  if (updateBlock(getBlock())) {
    currentState.score += removedLine * 100
    currentState.grid = newGrid
  } else {
    // End Game
    currentState = getObservedState()
  }
}

window.onload = () => {
  currentState = getObservedState()

  document.querySelector('#restart')?.addEventListener('change', (e) => {
    if (e instanceof CustomEvent) currentState = getObservedState()
  })

  document.querySelector('#stop')?.addEventListener('change', (e) => {
    if (e instanceof CustomEvent) currentState.stopped = e.detail
  })
}

document.addEventListener('keydown', (e) => {
  if (currentState.stopped) return
  const {
    block: { rotation, x, y },
  } = currentState

  switch (e.key) {
    case 'ArrowLeft':
      return updateBlock({ x: x - 1 })
    case 'ArrowRight':
      return updateBlock({ x: x + 1 })
    case 'ArrowDown':
      return updateBlock({ y: y + 1 })
    case 'ArrowUp':
      return updateBlock({
        rotation: (rotation >= 3 ? 0 : rotation + 1) as BlockState['rotation'],
      })
    case ' ': {
      let success = true
      let clonedY = y
      do {
        success = updateBlock({ y: (clonedY += 1) })
      } while (success)

      resetClockTick()
      tick()
      break
    }
  }
})
