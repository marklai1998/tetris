import { createElement } from './jsxRuntime/jsxRuntime'
/** @jsx createElement */
import { Action } from './constants/action'
import { Tetris } from './Tetris'
import { Component } from './jsxRuntime/Component'
import { State as TetrisState } from './types/state'
import { getInitialState } from './utils/getInitialState'
import './index.css'
import './components'

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

  .score{
    margin-bottom: 16px;
  }

  .header {
    margin: 50px 0;
  }

  .control {
    margin-left: 16px;
  }
`

type State = { tetris: Tetris | null; tetrisState: TetrisState }

class App extends Component<State, {}> {
  state: State = {
    tetris: null,
    tetrisState: getInitialState(),
  }

  onMount() {
    const initialState = getInitialState()
    this.setState({
      tetris: new Tetris({
        onSateChange: (newState) => {
          this.setState({ tetrisState: newState })
        },
        initialState: initialState,
      }),
      tetrisState: initialState,
    })

    document.addEventListener('keydown', (e) => {
      const { tetris } = this.state
      if (!tetris) return
      switch (e.key) {
        case 'ArrowLeft':
          return tetris.move(Action.LEFT)
        case 'ArrowRight':
          return tetris.move(Action.RIGHT)
        case 'ArrowDown':
          return tetris.move(Action.DOWN)
        case 'ArrowUp':
          return tetris.move(Action.ROTATE)
        case ' ':
          return tetris.move(Action.DROP)
      }
    })
  }

  handleRestart = () => {
    this.state.tetris?.reset()
  }

  handleStartStop = () => {
    this.state.tetrisState.stopped
      ? this.state.tetris?.start()
      : this.state.tetris?.stop()
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
            <div class='score'>{tetrisState.score}</div>
            <flip-switch
              key='S'
              active={tetrisState.stopped ? 'true' : 'false'}
              onChange={this.handleStartStop}
            >
              Start/Stop
            </flip-switch>
            <flip-switch key='R' onChange={this.handleRestart}>
              Restart
            </flip-switch>
            <h3>Help</h3>
            <flip-switch key='←' disabled='true'>
              Left
            </flip-switch>
            <flip-switch key='↑' disabled='true'>
              Rotate
            </flip-switch>
            <flip-switch key='→' disabled='true'>
              Right
            </flip-switch>
            <flip-switch key='↓' disabled='true'>
              Down
            </flip-switch>
            <flip-switch key='space' disabled='true'>
              Drop to bottom
            </flip-switch>
          </div>
        </div>
      </div>
    )
  }
}

customElements.define('main-app', App)
