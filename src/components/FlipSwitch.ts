import { Component } from './Component'
import classnames from 'classnames'

export class FlipSwitch extends Component<{ isActive: boolean }> {
  state = {
    isActive: this.props.active === 'true',
  }

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

  onPropsChange(name: string, oldValue: unknown, newValue: unknown) {
    if (name === 'active') {
      this.setState({ isActive: newValue === 'true' })
    }
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === this.props.key?.toLowerCase()) {
      const newState = !this.state.isActive
      this.setState({ isActive: newState })
      this.dispatchEvent(new CustomEvent('change', { detail: newState }))
    }
  }

  render() {
    const { isActive } = this.state
    const { key } = this.props
    return `
        <style>
            .active {
                color: #f44336;
            }
        </style>
        <div class="${classnames({ active: isActive })}">
            [${key?.toUpperCase()}] <slot />
        </div>
    `
  }
}

customElements.define('flip-switch', FlipSwitch)
