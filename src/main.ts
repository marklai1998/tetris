import './index.css'
import { getGrid } from './utils/getGrid'

const config = { gridSize: { row: 20, col: 10 }, speed: 1000 }

let solidGrid = getGrid(config.gridSize)
let currentGrid = getGrid(config.gridSize)
let displayGrid = getGrid(config.gridSize)
let clock: number
let stopped = true

const tick = () => {
  console.log('tick')
}

const updateStoppedState = () => {
  const stop = document.querySelector('#stop')?.classList
  if (!stop) return
  if (stopped) {
    clearInterval(clock)
    stop.add('active')
  } else {
    clock = setInterval(tick, config.speed)
    stop.remove('active')
  }
}

window.onload = () => {
  const playArea = document.querySelector('#grid')
  if (!playArea) return

  displayGrid.forEach((row, rowIdx) => {
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

  updateStoppedState()
}

document.addEventListener('keyup', (e) => {
  switch (e.key.toUpperCase()) {
    case 'S':
      stopped = !stopped
      updateStoppedState()
      break
  }
})
