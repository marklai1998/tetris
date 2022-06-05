import { blocks } from './constants/blockMap'
import './index.css'
import { getGrid } from './utils/getGrid'
import { getRandomBlock } from './utils/getRandomBlock'

const config = { gridSize: { row: 20, col: 10 }, speed: 1000 }
const getInitialState = () => ({
  solidGrid: getGrid(config.gridSize),
  currentGrid: getGrid(config.gridSize),
  clock: undefined as number | undefined,
  stopped: true,
  score: 0,
  currentBlock: {
    x: 6,
    y: 0,
    blockCode: getRandomBlock(),
  },
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
  const newCurrentGrid = getGrid(config.gridSize)
  const block = blocks[state.currentBlock.blockCode]

  block.forEach((row, rowIdx) => {
    const y = state.currentBlock.y - rowIdx
    if (y >= 0 && y < newCurrentGrid.length) {
      row.forEach((value, colIdx) => {
        if (value) {
          const x = state.currentBlock.x - colIdx
          newCurrentGrid[y][x] = state.currentBlock.blockCode
        }
      })
    }
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
  state.score = state.score + 1
  state.currentBlock.y += 1
  updateGrid()
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
      const newX = state.currentBlock.x - 1
      const block = blocks[state.currentBlock.blockCode]
      const outOfBound = block.some((row) =>
        row.some((value, colIdx) => value && newX - colIdx < 0)
      )

      if (!outOfBound) {
        state.currentBlock.x = newX
        updateGrid()
      }

      break
    }
    case 'ArrowRight': {
      const newX = state.currentBlock.x + 1
      const block = blocks[state.currentBlock.blockCode]
      const outOfBound = block.some((row) =>
        row.some(
          (value, colIdx) => value && newX - colIdx >= config.gridSize.col
        )
      )

      if (!outOfBound) {
        state.currentBlock.x = newX
        updateGrid()
      }

      break
    }
  }
})
