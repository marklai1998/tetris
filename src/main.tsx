/** @jsx createElement */
import { createElement } from './jsxRuntime/jsxRuntime'
import { Action } from './constants/action'
import { Tetris } from './Tetris'
import { Component } from './jsxRuntime/Component'
import { State as TetrisState } from './types/state'
import { getInitialState } from './utils/getInitialState'
import './index.css'
import './components'
import { drawBlockToGrid } from './utils/drawBlockToGrid'
import { blocks } from './constants/blockMap'
import { rotateMatrix } from './utils/rotateMatrix'

const css = `
  h1 {
    display: inline-block;
  }

  h4 {
    display: inline-block;
  }
  
  h3 {  
    margin: 16px 0 8px 0;
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
    min-width: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`

type State = { tetris: Tetris | null; tetrisState: TetrisState }

class App extends Component<State, {}> {
  override state: State = {
    tetris: null,
    tetrisState: getInitialState(),
  }

  override onMount() {
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
      return
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

  handleSave = () => {
    this.state.tetris?.move(Action.SAVE)
  }

  override render() {
    const { tetrisState } = this.state
    const displayGrid = drawBlockToGrid({
      grid: tetrisState.grid,
      block: tetrisState.block,
      override: true,
    })
    const nextBlockData = rotateMatrix(
      blocks[tetrisState.nextBlock.blockCode],
      2
    )
    const savedBlockData = tetrisState.savedBlock
      ? rotateMatrix(blocks[tetrisState.savedBlock], 2)
      : [[]]
    return (
      <div id='app'>
        <style>{css}</style>
        <div class='row'>
          <h1>Tetris</h1>
        </div>
        <div class='row'>
          <div>
            <tetris-grid
              grid={JSON.stringify(displayGrid)}
              name='grid'
            ></tetris-grid>
          </div>
          <div class='control'>
            <tetris-grid
              grid={JSON.stringify(nextBlockData)}
              name='next'
            ></tetris-grid>
            <tetris-grid
              grid={JSON.stringify(savedBlockData)}
              name='saved'
            ></tetris-grid>
            <div>
              <h3>Score</h3>
              <div class='score'>{tetrisState.score}</div>
              <h3>Help</h3>
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
              <flip-switch
                key='C'
                onChange={this.handleSave}
                active={tetrisState.alreadySaved ? 'true' : 'false'}
              >
                Save Block
              </flip-switch>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

customElements.define('main-app', App)
