import { blocks } from './constants/blockMap'
import './index.css'
import { drawBlockToGrid } from './utils/drawBlockToGrid'
import { getGrid } from './utils/getGrid'
import { getRandomBlock } from './utils/getRandomBlock'
import { mergeGrid } from './utils/mergeGrid'

const config = { gridSize: { row: 20, col: 10 }, speed: 1000 }

const getInitialBlock = () => ({
  x: 6,
  y: 0,
  blockCode: getRandomBlock(),
})

const getInitialState = () => ({
  solidGrid: getGrid(config.gridSize),
  currentGrid: getGrid(config.gridSize),
  clock: undefined as number | undefined,
  stopped: true,
  score: 0,
  currentBlock: getInitialBlock(),
})

let state = getInitialState()

const paint = (grid: (string | number)[][]) => {
  const playArea = document.querySelector('#grid')
  if (!playArea) return
  playArea.innerHTML = ''

  grid.forEach((row, rowIdx) => {
    const rowEle = document.createElement('div')
    rowEle.className = 'grid-row'
    rowEle.id = 'R' + rowIdx

    row.forEach((cell, cellIdx) => {
      const cellEle = document.createElement('cell')
      cellEle.textContent = String(cell)
      cellEle.id = 'R' + rowIdx + 'C' + cellIdx
      cellEle.className = `grid-cell ${cell ? `gc-${cell}` : ''}`

      rowEle.appendChild(cellEle)
    })

    playArea.appendChild(rowEle)
  })
}

const updateGrid = () => {
  const newCurrentGrid = drawBlockToGrid({
    blockCode: state.currentBlock.blockCode,
    grid: getGrid(config.gridSize),
    x: state.currentBlock.x,
    y: state.currentBlock.y,
  })

  const displayGrid = getGrid(config.gridSize).map((row, rowIdx) =>
    row.map(
      (col, colIdx) =>
        newCurrentGrid[rowIdx][colIdx] || state.solidGrid[rowIdx][colIdx]
    )
  )

  state.currentGrid = newCurrentGrid

  paint(displayGrid)
}

const tick = () => {
  try {
    const newY = state.currentBlock.y + 1

    drawBlockToGrid({
      blockCode: state.currentBlock.blockCode,
      grid: state.solidGrid,
      x: state.currentBlock.x,
      y: newY,
      dryRun: true,
    })

    state.currentBlock.y = newY
  } catch (e) {
    // Landed
    state.solidGrid = mergeGrid(state.currentGrid, state.solidGrid)
    state.currentBlock = getInitialBlock()
  } finally {
    state.score = state.score + 1
    updateGrid()
  }
}

const updateStoppedState = () => {
  const stop = document.querySelector('#stop')?.classList
  if (!stop) return
  if (state.stopped) {
    clearInterval(state.clock)
    state.clock = undefined
    stop.add('active')
  } else {
    state.clock = setInterval(tick, config.speed)
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
      state.stopped = !state.stopped
      updateStoppedState()
      break
    case 'ArrowLeft': {
      if (state.stopped) return
      try {
        const newX = state.currentBlock.x - 1
        drawBlockToGrid({
          blockCode: state.currentBlock.blockCode,
          grid: state.solidGrid,
          x: newX,
          y: state.currentBlock.y,
          dryRun: true,
        })
        state.currentBlock.x = newX
      } catch (e) {
        //Do nothing
      } finally {
        updateGrid()
      }
      break
    }
    case 'ArrowRight': {
      if (state.stopped) return
      try {
        const newX = state.currentBlock.x + 1
        drawBlockToGrid({
          blockCode: state.currentBlock.blockCode,
          grid: state.solidGrid,
          x: newX,
          y: state.currentBlock.y,
          dryRun: true,
        })
        state.currentBlock.x = newX
      } catch (e) {
        //Do nothing
      } finally {
        updateGrid()
      }

      break
    }
  }
})
