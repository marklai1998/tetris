import { createElement } from './jsxRuntime/jsxRuntime'
/** @jsx createElement */
import { Action } from './constants/action'
import { Tetris } from './Tetris'
import './index.css'
import './components'
import { Component } from './jsxRuntime/Component'
import { State } from './types/state'
import { getInitialState } from './utils/getInitialState'

const css = `
  h1 {
    display: inline-block;
  }

  h4 {
    display: inline-block;
  }

  .row {
    display: flex;
    justify-content: center;
  }

  .header {
    margin: 50px 0;
  }

  .control {
    margin-left: 16px;
  }
`

class App extends Component<{}, {}> {
  handleStateChange = (newState: State) => {
    this.setState({ tetrisState: newState })
  }

  initialState = getInitialState()
  state = {
    tetris: new Tetris({
      onSateChange: this.handleStateChange,
      initialState: this.initialState,
    }),
    tetrisState: this.initialState,
  }

  onMount() {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          return this.state.tetris.move(Action.LEFT)
        case 'ArrowRight':
          return this.state.tetris.move(Action.RIGHT)
        case 'ArrowDown':
          return this.state.tetris.move(Action.DOWN)
        case 'ArrowUp':
          return this.state.tetris.move(Action.ROTATE)
        case ' ':
          return this.state.tetris.move(Action.DROP)
      }
    })
  }

  handleRestart = () => {
    console.log('hi')
    this.state.tetris.reset()
  }

  handleStartStop = () => {
    this.state.tetrisState.stopped
      ? this.state.tetris.start()
      : this.state.tetris.stop()
  }

  render() {
    const { tetrisState } = this.state
    return (
      <div id='app'>
        <style>{css}</style>
        <div class='row'>
          <h1>Tetris</h1>
        </div>
        <div class='row'>
          <div>
            <tetris-grid
              grid={JSON.stringify(this.state.tetrisState.displayGrid)}
            ></tetris-grid>
          </div>
          <div class='control'>
            <h3>Score</h3>
            <div id='score'>{tetrisState.score}</div>
            <h3>Help</h3>
            <flip-switch
              id='stop'
              key='S'
              active={tetrisState.stopped ? 'true' : 'false'}
              onChange={this.handleStartStop}
            >
              Start/Stop
            </flip-switch>
            <flip-switch id='restart' key='R' onChange={this.handleRestart}>
              Restart
            </flip-switch>
          </div>
        </div>
      </div>
    )
  }
}

customElements.define('main-app', App)
