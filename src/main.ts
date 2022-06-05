import './index.css'
import { paint } from './utils/paint'
import { config } from './constants/config'

import { BlockState, State } from './types/state'
import { drawBlockToGrid } from './utils/drawBlockToGrid'
import { getGrid } from './utils/getGrid'
import { getRandomBlock } from './utils/getRandomBlock'

const getInitialBlock = (): BlockState => ({
  x: 6,
  y: 0,
  rotation: 0,
  blockCode: getRandomBlock(),
})

const getInitialState = (): State => ({
  grid: getGrid(config.gridSize),
  currentBlock: getInitialBlock(),

  clock: undefined,
  stopped: true,
  score: 0,
})

let currentState = getInitialState()

const updateBlock = (update: Partial<BlockState>) => {
  try {
    const newState = { ...currentState.currentBlock, ...update }
    drawBlockToGrid({
      grid: currentState.grid,
      block: newState,
    })
    currentState.currentBlock = newState
    updateGrid()
    return true
  } catch (e) {
    return false
  }
}

const updateGrid = () => {
  const playArea = document.querySelector('#grid')
  if (!playArea) return

  const displayGrid = drawBlockToGrid({
    grid: currentState.grid,
    block: currentState.currentBlock,
  })

  paint(playArea, displayGrid)
}

const tick = () => {
  const successfullyMoveDown = updateBlock({
    y: currentState.currentBlock.y + 1,
  })

  if (!successfullyMoveDown) {
    // Landed
    currentState.grid = drawBlockToGrid({
      grid: currentState.grid,
      block: currentState.currentBlock,
    })
    currentState.currentBlock = getInitialBlock()
    updateGrid()
  }
}

const updateStoppedState = () => {
  const stop = document.querySelector('#stop')?.classList
  if (!stop) return
  if (currentState.stopped) {
    clearInterval(currentState.clock)
    currentState.clock = undefined
    stop.add('active')
  } else {
    currentState.clock = setInterval(tick, config.speed)
    stop.remove('active')
  }
}

window.onload = () => {
  updateGrid()
  updateStoppedState()
}

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 's':
      currentState.stopped = !currentState.stopped
      updateStoppedState()
      break
    case 'ArrowUp': {
      if (currentState.stopped) return
      updateBlock({
        rotation: (currentState.currentBlock.rotation + 1 > 3
          ? 0
          : currentState.currentBlock.rotation + 1) as 0 | 1 | 2 | 3,
      })
      break
    }
    case 'ArrowLeft': {
      if (currentState.stopped) return
      updateBlock({
        x: currentState.currentBlock.x - 1,
      })
      break
    }
    case 'ArrowRight': {
      if (currentState.stopped) return
      updateBlock({
        x: currentState.currentBlock.x + 1,
      })
      break
    }
    case 'ArrowDown': {
      if (currentState.stopped) return
      updateBlock({
        y: currentState.currentBlock.y + 1,
      })
      break
    }
  }
})
