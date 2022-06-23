import { shallowCompare } from '../utils/shallowCompare'

export class Component<
  S extends Record<string, unknown>,
  P extends Record<string, unknown>
> extends HTMLElement {
  shadow = this.attachShadow({ mode: 'open' })
  state: S = {} as S
  savedProps = { ...this.props }

  get props(): P {
    const nameList = this.getAttributeNames()
    return Object.fromEntries(
      nameList.map((key) => [key, this.getAttribute(key)])
    ) as P
  }

  attributeChangedCallback(name: string, oldValue: unknown, newValue: unknown) {
    this.onPropsChange(name, oldValue, newValue)
    this.rerender()
  }

  connectedCallback() {
    this.onMount()
    this.rerender()

    var observer = new MutationObserver((mutations) => {
      const attributeChanges = mutations.some(
        ({ type }) => type === 'attributes'
      )
      if (attributeChanges) {
        const currentProps = this.props
        if (!shallowCompare(currentProps, this.props)) {
          this.rerender()
        }
        this.savedProps = { ...currentProps }
      }
    })

    observer.observe(this, {
      attributes: true, //configure it to listen to attribute changes
    })
  }

  disconnectedCallback() {
    this.onUnmount()
  }

  rerender() {
    const result = this.render()
    this.shadow.innerHTML = ''
    if (result) this.shadow.appendChild(result)
  }

  setState(newState: Partial<S>) {
    this.state = { ...this.state, ...newState }
    this.rerender()
  }

  onPropsChange(name: string, oldValue: unknown, newValue: unknown) {}
  onMount() {}
  onUnmount() {}
  render(): HTMLElement | null {
    return null
  }
}
