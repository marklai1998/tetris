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
  try {
    const newY = currentState.currentBlock.y + 1

    drawBlockToGrid({
      grid: currentState.grid,
      block: { ...currentState.currentBlock, y: newY },
    })

    currentState.currentBlock.y = newY
  } catch (e) {
    // Landed
    currentState.grid = drawBlockToGrid({
      grid: currentState.grid,
      block: currentState.currentBlock,
    })
    currentState.currentBlock = getInitialBlock()
  } finally {
    currentState.score = currentState.score + 1
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
      try {
        const newRotation = (
          currentState.currentBlock.rotation + 1 > 3
            ? 0
            : currentState.currentBlock.rotation + 1
        ) as 0 | 1 | 2 | 3
        drawBlockToGrid({
          grid: currentState.grid,
          block: { ...currentState.currentBlock, rotation: newRotation },
        })
        currentState.currentBlock.rotation = newRotation
      } catch (e) {
        //Do nothing
      } finally {
        updateGrid()
      }
      break
    }
    case 'ArrowLeft': {
      if (currentState.stopped) return
      try {
        const newX = currentState.currentBlock.x - 1
        drawBlockToGrid({
          grid: currentState.grid,
          block: { ...currentState.currentBlock, x: newX },
        })
        currentState.currentBlock.x = newX
      } catch (e) {
        //Do nothing
      } finally {
        updateGrid()
      }
      break
    }
    case 'ArrowRight': {
      if (currentState.stopped) return
      try {
        const newX = currentState.currentBlock.x + 1
        drawBlockToGrid({
          grid: currentState.grid,
          block: { ...currentState.currentBlock, x: newX },
        })
        currentState.currentBlock.x = newX
      } catch (e) {
        //Do nothing
      } finally {
        updateGrid()
      }

      break
    }
  }
})
