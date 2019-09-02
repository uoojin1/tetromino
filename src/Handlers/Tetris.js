import Player from '../Classes/Player'
import Arena from '../Classes/Arena'
import CanvasHandler from './CanvasHandler'

class Tetris extends CanvasHandler {
  constructor(canvas) {
    super(canvas)
    // everything about tetris
    this.player = new Player()
    this.arena = new Arena(12, 20)
    this.score = 0
    this._addListener()
  }

  // PRIVATE METHODS
  _addListener() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        this.player.move(-1, this.arena);
      } else if (event.key === 'ArrowRight'){
        this.player.move(1, this.arena);
      } else if (event.key === 'ArrowDown'){
        this.player.drop(this.arena);
      } else if (event.key === 'ArrowUp'){
        this.player.rotate(1, this.arena);
      } else if (event.key === 'z'){
        this.player.rotate(-1, this.arena);
      } else if (event.keyCode === 32){
        this.player.freeFall(this.arena);
      }
    })
  }

  // PUBLIC METHODS  
  start() {
    super.start(this.arena, this.player)
  }
  pause() {
    super.finish() // todo
  }
  finish() {
    super.finish()
  }
}

export default Tetris