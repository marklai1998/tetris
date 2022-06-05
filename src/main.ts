import { blocks } from './constants/blockMap'
import './index.css'
import { getGrid } from './utils/getGrid'
import { getRandomBlock } from './utils/getRandomBlock'

const config = { gridSize: { row: 20, col: 10 }, speed: 1000 }
const getInitialState = () => ({
  solidGrid: getGrid(config.gridSize),
  currentGrid: getGrid(config.gridSize),
  displayGrid: getGrid(config.gridSize),
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

const draw = (grid: (string | number)[][]) => {
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
      cellEle.className = 'grid-cell'

      rowEle.appendChild(cellEle)
    })

    playArea.appendChild(rowEle)
  })
}

const updateGrid = () => {
  const newCurrentGrid = getGrid(config.gridSize)
  const block = blocks[state.currentBlock.blockCode]

  block.forEach((row, rowIdx) => {
    if (state.currentBlock.y - rowIdx >= 0) {
      row.forEach((value, colIdx) => {
        if (value) {
          newCurrentGrid[state.currentBlock.y - rowIdx][
            state.currentBlock.x - colIdx
          ] = state.currentBlock.blockCode
        }
      })
    }
  })

  const newDisplayGrid = getGrid(config.gridSize).map((row, rowIdx) =>
    row.map(
      (col, colIdx) =>
        state.currentGrid[rowIdx][colIdx] || state.solidGrid[rowIdx][colIdx]
    )
  )

  state.currentGrid = newCurrentGrid
  state.displayGrid = newDisplayGrid

  draw(newDisplayGrid)
}

const tick = () => {
  console.log('tick')
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

document.addEventListener('keyup', (e) => {
  switch (e.key.toUpperCase()) {
    case 'S':
      state.stopped = !state.stopped
      updateStoppedState()
      break
  }
})
