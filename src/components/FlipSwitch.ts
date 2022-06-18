import { Component } from './Component'
import classnames from 'classnames'

export class FlipSwitch extends Component<{}> {
  constructor() {
    super()
  }

  static get observedAttributes() {
    return ['active', 'key', 'activeColor']
  }

  onMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  onUmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === this.props.key?.toLowerCase()) {
      const newState = !(this.props.active === 'true')
      this.setState({ isActive: newState })
      this.dispatchEvent(new CustomEvent('change', { detail: newState }))
    }
  }

  render() {
    const { key, active } = this.props
    return `
      <style>
        .active {
          color: #f44336;
        }
      </style>
      <div class="${classnames({
        active: active === 'true',
      })}">[${key?.toUpperCase()}] <slot></slot></div>
    `
  }
}

customElements.define('flip-switch', FlipSwitch)
