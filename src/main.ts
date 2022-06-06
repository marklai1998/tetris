import './index.css'
import { paint } from './utils/paint'
import { config } from './constants/config'

import { BlockState, State } from './types/state'
import { drawBlockToGrid } from './utils/drawBlockToGrid'
import { getGrid } from './utils/getGrid'
import { getRandomBlock } from './utils/getRandomBlock'
import { removeCompleteLine } from './utils/removeCompleteLine'

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
  const newState = { ...currentState.currentBlock, ...update }
  drawBlockToGrid({
    grid: currentState.grid,
    block: newState,
  })
  currentState.currentBlock = newState
  updateGrid()
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

const updateScore = () => {
  const scoreEle = document.querySelector('#score') as HTMLElement
  if (!scoreEle) return
  scoreEle.innerText = currentState.score.toString()
}

const initGame = () => {
  clearInterval(currentState.clock)
  currentState = getInitialState()
  updateGrid()
  updateScore()
  updateStoppedState()
}

const tick = () => {
  try {
    currentState.score += 1
    updateBlock({
      y: currentState.currentBlock.y + 1,
    })
  } catch (e) {
    // Landed
    const newGrid = drawBlockToGrid({
      grid: currentState.grid,
      block: currentState.currentBlock,
    })

    const { grid, removedLine } = removeCompleteLine(newGrid)
    currentState.score += removedLine * 100
    currentState.grid = grid

    try {
      updateBlock(getInitialBlock())
    } catch (e) {
      // End Game
      initGame()
    }
  } finally {
    updateScore()
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
  initGame()
}

document.addEventListener('keydown', (e) => {
  try {
    switch (e.key) {
      case 's':
        currentState.stopped = !currentState.stopped
        updateStoppedState()
        break
      case 'r':
        initGame()
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
      case ' ': {
        if (currentState.stopped) return

        while (true) {
          updateBlock({
            y: currentState.currentBlock.y + 1,
          })
        }

        break
      }
    }
  } catch (e) {
    // Do nothing
  }
})
