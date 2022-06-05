import { Grid } from '../types/grid'

export const paint = (container: Element, grid: Grid) => {
  container.innerHTML = ''

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

    container.appendChild(rowEle)
  })
}
