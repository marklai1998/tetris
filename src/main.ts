import { Grid } from './types/grid'
import { observe } from './utils/observe'
import './index.css'
import { config } from './constants/config'

import { BlockState, State } from './types/state'
import { drawBlockToGrid } from './utils/drawBlockToGrid'
import { getGrid } from './utils/getGrid'
import { getRandomBlock } from './utils/getRandomBlock'
import { removeCompleteLine } from './utils/removeCompleteLine'
import './components'
import { TetrisGrid } from './components/TetrisGrid'

const getInitialBlock = (): BlockState => ({
  x: 6,
  y: 0,
  rotation: 0,
  blockCode: getRandomBlock(),
})

let clock: number | undefined
const getObservedState = (): State =>
  observe(
    {
      grid: getGrid(config.gridSize),
      block: getInitialBlock(),
      clock: undefined,
      stopped: true,
      score: 0,
    },
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

let currentState = getObservedState()

const updateBlock = (update: Partial<BlockState>) => {
  const newState = { ...currentState.block, ...update }
  drawBlockToGrid({
    grid: currentState.grid,
    block: newState,
  })
  currentState.block = newState
}

const tick = () => {
  try {
    currentState.score += 1
    updateBlock({
      y: currentState.block.y + 1,
    })
  } catch (e) {
    try {
      // Landed
      const newGrid = drawBlockToGrid({
        grid: currentState.grid,
        block: currentState.block,
      })

      const { grid, removedLine } = removeCompleteLine(newGrid)
      currentState.score += removedLine * 100
      updateBlock(getInitialBlock())
      currentState.grid = grid
    } catch (e) {
      // End Game
      currentState = getObservedState()
    }
  }
}

window.onload = () => {
  currentState = getObservedState()

  document.querySelector('#restart')?.addEventListener('change', (e) => {
    if (e instanceof CustomEvent) currentState = getObservedState()
  })

  document.querySelector('#stop')?.addEventListener('change', (e) => {
    if (e instanceof CustomEvent) {
      const newState = e.detail
      currentState.stopped = newState
    }
  })
}

document.addEventListener('keydown', (e) => {
  try {
    switch (e.key) {
      case 'ArrowUp': {
        if (currentState.stopped) return
        updateBlock({
          rotation: (currentState.block.rotation + 1 > 3
            ? 0
            : currentState.block.rotation + 1) as 0 | 1 | 2 | 3,
        })
        break
      }
      case 'ArrowLeft': {
        if (currentState.stopped) return
        updateBlock({
          x: currentState.block.x - 1,
        })
        break
      }
      case 'ArrowRight': {
        if (currentState.stopped) return
        updateBlock({
          x: currentState.block.x + 1,
        })
        break
      }
      case 'ArrowDown': {
        if (currentState.stopped) return
        updateBlock({
          y: currentState.block.y + 1,
        })
        break
      }
      case ' ': {
        if (currentState.stopped) return

        while (true) {
          updateBlock({
            y: currentState.block.y + 1,
          })
        }

        break
      }
    }
  } catch (e) {
    // Do nothing
  }
})
