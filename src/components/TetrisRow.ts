import { Component } from './Component'

export class TetrisRow extends Component<{}> {
  constructor() {
    super()
  }

  static get observedAttributes() {
    return ['last']
  }

  render() {
    const { last } = this.props
    return `
      <style>
        .row {
          line-height: 25px;
          display: flex;
        }
      </style>
      <div class="row">[<slot></slot>] ${last === 'true' ? ']' : ','}</div>
    `
  }
}

customElements.define('tetris-row', TetrisRow)
