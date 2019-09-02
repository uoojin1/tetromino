class CanvasHandler {
  constructor(canvas) {
    this.canvas = canvas
    this.context = canvas.getContext("2d")
    this.context.scale(20, 20)

    this.arena = null
    this.player = null

    this.lastTime = 0;
    this.dropCounter = 0; // count ticking for the element to drop
    this.dropInterval = 1000; // 1 ms

    this.colors = [
      null,
      '#4897D8',
      '#ffdb5c',
      '#fa6e59',
      '#ffb43b',
      '#89da59',
      '#ffc2c5',
      '#df8fff',
    ]

    // PRIVATE
    this._clearCanvas = this._clearCanvas.bind(this)
    this._drawMatrix = this._drawMatrix.bind(this)
    this._draw = this._draw.bind(this)
    this._update = this._update.bind(this)

    // PUBLIC
    this.start = this.start.bind(this)


    // this._addListener()
  }
  // PRIVATE METHODS
  _clearCanvas() {
    this.context.fillStyle = '#ffffff'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
  _drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.context.fillStyle = this.colors[value];
          this.context.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  }
  _draw() {
    this._clearCanvas()
    this._drawMatrix(this.arena.matrix, {x:0, y:0})
    this._drawMatrix(this.player.matrix, this.player.pos)
  }
  _update(time = 0) {
    const deltaTime = time - this.lastTime
    this.lastTime = time

    this.dropCounter += deltaTime

    if (this.dropCounter > this.dropInterval) {
      this.player.drop(this.arena)
      this.dropCounter = 0;
    }

    this._draw()
    this._reqAniID = requestAnimationFrame(this._update)
  }

  // PUBLIC METHODS
  start(arena, player) {
    console.log('[Canvas Handler]: game start')
    this.arena = arena
    this.player = player
    this._update()
  }
  pause() {
    console.log('[Canvas Handler]: game pause')
    cancelAnimationFrame(this._reqAniID)
  }
  finish() {
    console.log('[Canvas Handler]: game finish')
    cancelAnimationFrame(this._reqAniID)
  }
}

export default CanvasHandler
