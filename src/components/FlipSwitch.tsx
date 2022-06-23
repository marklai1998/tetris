import { createElement } from '../jsxRuntime/jsxRuntime'
/** @jsx createElement */
import { Component } from '../jsxRuntime/Component'
import classnames from 'classnames'

const css = `
  .active {
    color: #f44336;
  }
`

export class FlipSwitch extends Component<{}, { key: string; active: string }> {
  handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === this.props.key?.toLowerCase()) {
      const newState = !(this.props.active === 'true')
      this.setState({ isActive: newState })
      this.dispatchEvent(new CustomEvent('change', { detail: newState }))
    }
  }

  onMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  onUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  render() {
    const { key, active } = this.props

    return (
      <div>
        <style>{css}</style>
        <div class={classnames({ active: active === 'true' })}>
          [{key?.toUpperCase()}] <slot></slot>
        </div>
      </div>
    )
  }
}

customElements.define('flip-switch', FlipSwitch)
