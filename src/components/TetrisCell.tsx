import { createElement } from '../jsxRuntime/jsxRuntime'
/** @jsx createElement */
import { Component } from '../jsxRuntime/Component'
import classnames from 'classnames'

const css = `
  .cell {
    text-align: center;
    height: 25px;
    width: 25px;
    line-height: 25px;
    display: inline-block;
    margin: 1px;
  }
  .I {
    box-shadow: 0 0 0 1px #00bcd4 inset;
    color: #00bcd4;
  }
  
  .J {
    box-shadow: 0 0 0 1px #3f51b5 inset;
    color: #3f51b5;
  }
  
  .L {
    box-shadow: 0 0 0 1px #ff9800 inset;
    color: #ff9800;
  }
  
  .O {
    box-shadow: 0 0 0 1px #ffeb3b inset;
    color: #ffeb3b;
  }
  
  .S {
    box-shadow: 0 0 0 1px #4caf50 inset;
    color: #4caf50;
  }
  
  .SR {
    box-shadow: 0 0 0 1px #f44336 inset;
    color: #f44336;
  }
  
  .T {
    box-shadow: 0 0 0 1px #9c27b0 inset;
    color: #9c27b0;
  }
`

export class TetrisCell extends Component<{}, { val: string }> {
  render() {
    const { val } = this.props

    return (
      <div>
        <style>{css}</style>
        <div class={classnames('cell', val?.toUpperCase())}>
          {val?.toUpperCase() || 0},
        </div>
      </div>
    )
  }
}

customElements.define('tetris-cell', TetrisCell)
