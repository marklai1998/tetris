import { createElement } from './jsxRuntime/jsxRuntime'
/** @jsx createElement */
import { Action } from './constants/action'
import { Tetris } from './Tetris'
import './index.css'
import './components'

const tetris = new Tetris({
  onSateChange: ({ displayGrid, score, stopped }) => {
    const playArea = document.querySelector('#grid')
    if (!playArea) return

    playArea.innerHTML = ''
    const gridEle = (
      <tetris-grid grid={JSON.stringify(displayGrid)}></tetris-grid>
    )
    playArea.appendChild(gridEle)

    const scoreEle = document.querySelector('#score') as HTMLElement
    if (!scoreEle) return
    scoreEle.innerText = score.toString()

    document
      .querySelector('#stop')
      ?.setAttribute('active', stopped ? 'true' : 'false')
  },
})

window.onload = () => {
  document.querySelector('#restart')?.addEventListener('change', (e) => {
    if (e instanceof CustomEvent) tetris.reset()
  })

  document.querySelector('#stop')?.addEventListener('change', (e) => {
    if (e instanceof CustomEvent)
      tetris.state.stopped ? tetris.start() : tetris.stop()
  })
}

document.addEventListener('keydown', (e) => {
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
