export class Component<S extends Record<string, unknown>> extends HTMLElement {
  shadow = this.attachShadow({ mode: 'open' })
  state = {} as S

  constructor() {
    super()
  }

  get props() {
    const nameList = this.getAttributeNames()
    return Object.fromEntries(
      nameList.map((key) => [key, this.getAttribute(key)])
    )
  }

  attributeChangedCallback(name: string, oldValue: unknown, newValue: unknown) {
    this.onPropsChange(name, oldValue, newValue)
    this.rerender()
  }

  connectedCallback() {
    this.onMount()
    this.rerender()
  }

  disconnectedCallback() {
    this.onUnmount()
  }

  rerender() {
    const result = this.render()
    this.shadow.innerHTML = result
  }

  setState(newState: Partial<S>) {
    this.state = { ...this.state, ...newState }
    this.rerender()
  }

  onPropsChange(name: string, oldValue: unknown, newValue: unknown) {}
  onMount() {}
  onUnmount() {}
  render(): string {
    return ''
  }
}
