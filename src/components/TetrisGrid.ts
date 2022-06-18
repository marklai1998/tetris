import { Grid } from '../types/grid'
import { Component } from './Component'
import { TetrisCell } from './TetrisCell'
import { TetrisRow } from './TetrisRow'

export class TetrisGrid extends Component<{ grid: Grid }> {
  state = {
    grid: [] as Grid,
  }

  constructor(grid: Grid) {
    super()
    this.setState({ grid })
  }

  set grid(grid: Grid) {
    this.setState({ grid })
  }

  render() {
    const { grid } = this.state

    const content = document.createElement('div')
    grid.forEach((row, rowIdx) => {
      const rowEle = new TetrisRow()
      rowEle.setAttribute('last', rowIdx === grid.length - 1 ? 'true' : 'false')
      row.forEach((cell) => {
        const cellEle = new TetrisCell()
        cellEle.setAttribute('val', String(cell))
        rowEle.appendChild(cellEle)
      })
      content.appendChild(rowEle)
    })

    return `
      <style>
        .container {
          display: flex;
        }
        .grid-start {
          line-height: 25px;
        }
        
        .grid-end {
          display: flex;
          justify-content: flex-end;
          flex-direction: column;
        }
      </style>
      <div class='container'>
        <div class="grid-start">var grid = [&nbsp;</div>
        <div>
          ${content.innerHTML}
        </div>
      </div>
    `
  }
}

customElements.define('tetris-grid', TetrisGrid)
