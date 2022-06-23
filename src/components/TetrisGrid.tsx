import { createElement } from '../jsxRuntime/jsxRuntime'
/** @jsx createElement */
import { Grid } from '../types/grid'
import { Component } from '../jsxRuntime/Component'

const css = `
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
`

export class TetrisGrid extends Component<{}, { grid: string; name: string }> {
  render() {
    const { grid, name } = this.props

    return (
      <div id='test'>
        <style>{css}</style>
        <div class='container'>
          <div class='grid-start'>var {name} = [&nbsp;</div>
          <div>
            {(JSON.parse(grid) as Grid).map((row, rowIdx) => (
              <tetris-row>
                {row.map((cell) => (
                  <tetris-cell val={String(cell)} />
                ))}
              </tetris-row>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

customElements.define('tetris-grid', TetrisGrid)
