import { createElement } from '../jsxRuntime/jsxRuntime'
/** @jsx createElement */
import { Component } from './Component'

const style = `
  .row {
    line-height: 25px;
    display: flex;
  }
`

export class TetrisRow extends Component<{}, { last: string }> {
  render() {
    const { last } = this.props

    return (
      <div>
        <style>{style}</style>
        <div class='row'>
          [{this.children}] {last === 'true' ? ']' : ','}
        </div>
      </div>
    )
  }
}

customElements.define('tetris-row', TetrisRow)
