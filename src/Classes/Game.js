import TetrisLogic from './TetrisLogic'

class Game extends TetrisLogic {
  constructor(canvas) {
    super(canvas)
    
    this.start = this.start.bind(this)
    this.pause = this.pause.bind(this)
    this.finish = this.finish.bind(this)
  }

  start() {
    console.log('game start: arena', this.arena)
    // this._update()
    super.tetrisStart()
  }

  pause() {
    super.tetrisPause()
    console.log('game pause')
  }

  finish() {
    console.log('game finish')
    super.tetrisFinish()
  }
}

export default Game
