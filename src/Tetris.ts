import { Action } from './constants/action'
import { config } from './constants/config'
import { getGrid } from './utils/getGrid'

import { getBlock } from './utils/getBlock'
import { BlockState, State } from './types/state'
import { drawBlockToGrid } from './utils/drawBlockToGrid'
import { removeCompleteLine } from './utils/removeCompleteLine'

const getInitialState = () => {
  const block = getBlock()
  const grid = getGrid(config.gridSize)
  return {
    block,
    solidGrid: grid,
    displayGrid: drawBlockToGrid({ block, grid }),
    stopped: true,
    score: 0,
  }
}

export class Tetris {
  clock: NodeJS.Timer | undefined
  _state = getInitialState()
  onSateChangeCb: (newState: State) => void = () => {}

  get state() {
    return this._state
  }

  set state(v) {
    const newState = {
      ...v,
      displayGrid: drawBlockToGrid({
        grid: v.solidGrid,
        block: v.block,
      }),
    }
    this._state = newState
    this.onSateChangeCb(newState)
  }

  constructor({ onSateChange }: { onSateChange: (newState: State) => void }) {
    this.onSateChangeCb = onSateChange
    onSateChange(this._state)
  }

  updateBlock = (update: Partial<BlockState>) => {
    try {
      const newState = { ...this.state.block, ...update }
      drawBlockToGrid({ grid: this.state.solidGrid, block: newState })
      this.state = { ...this.state, block: newState }
      return true
    } catch (e) {
      return false
    }
  }

  tick = () => {
    this.state = { ...this.state, score: this.state.score + 1 }
    if (this.updateBlock({ y: this.state.block.y + 1 })) return

    // Landed
    const { solidGrid, block } = this.state
    const { grid: newGrid, removedLine } = removeCompleteLine(
      drawBlockToGrid({ grid: solidGrid, block })
    )

    if (this.updateBlock(getBlock())) {
      this.state = {
        ...this.state,
        score: this.state.score + removedLine * 100,
        solidGrid: newGrid,
      }
    } else {
      // End Game
      this.state = getInitialState()
    }
  }

  resetClockTick = () => {
    clearInterval(this.clock)
    this.clock = undefined
    this.clock = setInterval(this.tick, config.speed)
  }

  move = (action: Action) => {
    if (this.state.stopped) return
    const {
      block: { rotation, x, y },
    } = this.state

    switch (action) {
      case Action.LEFT:
        return this.updateBlock({ x: x - 1 })
      case Action.RIGHT:
        return this.updateBlock({ x: x + 1 })
      case Action.DOWN:
        return this.updateBlock({ y: y + 1 })
      case Action.ROTATE:
        return this.updateBlock({
          rotation: (rotation >= 3
            ? 0
            : rotation + 1) as BlockState['rotation'],
        })
      case Action.DROP: {
        let success = true
        let clonedY = y
        do {
          success = this.updateBlock({ y: (clonedY += 1) })
        } while (success)

        this.resetClockTick()
        this.tick()
        break
      }
    }
  }

  start = () => {
    this.clock = setInterval(this.tick, config.speed)
    this.state = { ...this.state, stopped: false }
  }

  stop = () => {
    clearInterval(this.clock)
    this.clock = undefined
    this.state = { ...this.state, stopped: true }
  }

  reset = () => {
    this.state = getInitialState()
  }
}
