import { createElement } from '../jsxRuntime/jsxRuntime'
/** @jsx createElement */
import { Component } from '../jsxRuntime/Component'

const style = `
  .row {
    display: flex;
  }
`

export class TetrisRow extends Component<{}, {}> {
  render() {
    return (
      <div>
        <style>{style}</style>
        <div class='row'>[{this.children}]</div>
      </div>
    )
  }
}

customElements.define('tetris-row', TetrisRow)
