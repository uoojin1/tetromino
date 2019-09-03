import Player from '../Classes/Player'
import Arena from '../Classes/Arena'
import CanvasHandler from './CanvasHandler'
import WebSocketConnection from './WebSocketConnection';

class Tetris extends CanvasHandler {
  constructor(canvas) {
    super(canvas)
    this.player = new Player()
    this.arena = new Arena(12, 20)
    this.score = 0
    this.ws = new WebSocketConnection()

    this._addListener()
  }

  _addListener() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        this.player.move(-1, this.arena);
        this.ws.sendMessage("left")
      } else if (event.key === 'ArrowRight'){
        this.player.move(1, this.arena);
        this.ws.sendMessage("right")
      } else if (event.key === 'ArrowDown'){
        this.player.drop(this.arena);
        this.ws.sendMessage("down")
      } else if (event.key === 'ArrowUp'){
        this.player.rotate(1, this.arena);
        this.ws.sendMessage("up")
      } else if (event.key === 'z'){
        this.player.rotate(-1, this.arena);
        this.ws.sendMessage("z")
      } else if (event.keyCode === 32){
        this.player.freeFall(this.arena);
        this.ws.sendMessage("32")
      }
    })
  }

  start() {
    super.start(this.arena, this.player)
  }
  pause() {
    super.finish()
  }
  finish() {
    super.finish()
  }
}

export default Tetris