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
  
  .row-wrapper {
    display: flex;
    line-height: 25px;
    flex-shrink: 0;
  }

  .suffix {
    margin-left: 4px
  }
`

export class TetrisGrid extends Component<{}, { grid: string; name: string }> {
  render() {
    const { grid, name } = this.props
    const parsedGrid = JSON.parse(grid) as Grid
    return (
      <div>
        <style>{css}</style>
        <div class='container'>
          <div class='grid-start'>var {name} = [&nbsp;</div>
          <div>
            {parsedGrid.map((row, rowIdx) => (
              <div class='row-wrapper'>
                {row.length ? (
                  <tetris-row>
                    {row.map((cell) => (
                      <tetris-cell val={String(cell)} />
                    ))}
                  </tetris-row>
                ) : (
                  <div />
                )}
                <span class='suffix'>
                  {rowIdx === parsedGrid.length - 1 ? ']' : ','}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

customElements.define('tetris-grid', TetrisGrid)
