import './index.css'
import { getGrid } from './utils/getGrid'

const gridSize = { row: 20, col: 10 }

let solidGrid = getGrid(gridSize)
let currentGrid = getGrid(gridSize)
let displayGrid = getGrid(gridSize)
let stopped = true

window.onload = () => {
  const playArea = document.getElementById('grid')
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
}

document.addEventListener('keyup', (e) => {
  switch (e.key.toUpperCase()) {
    case 'S':
      const newState = !stopped
      const stop = document.getElementById('stop')?.classList
      if (!stop) return

      if (newState) {
        stop.remove('active')
      } else {
        stop.add('active')
      }
      stopped = newState
      break
  }
})
