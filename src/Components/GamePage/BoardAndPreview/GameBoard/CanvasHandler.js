export default class CanvasHandler {
  constructor(canvas) {
    this.context = canvas.getContext("2d")
    this.canvas = canvas
    this.context.scale(5, 5) // scale all by 20 times
    this.arena = this._createMatrix(12, 20)
    this.player = {
      pos: {
        x: 0,
        y: 0
      },
      matrix: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
      ],
      score: 0
    }

    this.addListener()
    
    this.lastTime = 0;
    this.dropCounter = 0; // count ticking for the element to drop
    this.dropInterval = 1000; // 1 ms

    this._update = this._update.bind(this)
    this._clearCanvas = this._clearCanvas.bind(this)
    this.gameStart = this.gameStart.bind(this)
    this.gamePause = this.gamePause.bind(this)
    this.gameFinish = this.gameFinish.bind(this)
    this._reqAniID = null
  }

  playerReset() {
    this.player.pos.y = 0
    this.player.pos.x = 5
  }

  collide(arena, player) {
    const [matrix, offset] = [this.player.matrix, this.player.pos];
    for( let y = 0; y < matrix.length; ++y ){ // matrix rows
      for( let x = 0; x < matrix[y].length; ++x ){ // matrix row[y]'s column length
        if( matrix[y][x] !== 0 && 
          (this.arena[y + offset.y] && this.arena[y+offset.y][x+offset.x]) !== 0){
          return true;
        }
      }
    }
    return false;
  }

  addListener() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        this.playerMove(-1);
      } else if (event.key === 'ArrowRight'){
        this.playerMove(1);
      } else if (event.key === 'ArrowDown'){
        this._playerDrop();
      } else if (event.key === 'ArrowUp'){
        this.playerRotate(1);
      } else if (event.key === 'z'){
        this.playerRotate(-1);
      }
    })
  }

  _drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.context.fillStyle = '#353535'//colors[value];
          this.context.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  }

  playerMove(dir) {
    this.player.pos.x += dir;
  }

  rotate(matrix, dir) {
    let rotated = this._createMatrix(matrix[0].length, matrix.length);
    let maxRow = matrix.length - 1;
    let maxCol = matrix[0].length - 1;
    for (let y = 0; y < matrix.length; ++y){
      for( let x = 0; x < matrix[y].length; ++x){
        if(dir === -1) { // clockwise
          rotated[y][x] = matrix[x][maxRow-y];
        } else if (dir === 1) { // counter clockwise
          rotated[y][x] = matrix[maxCol-x][y];
        }
      }
    }
    this.player.matrix = rotated;
  }

  playerRotate(dir) {
    this.rotate(this.player.matrix, dir);
  }

  _playerDrop() {
    this.player.pos.y++;
    this.dropCounter = 0;
    if (this.collide(this.arena, this.player)) {
      this.player.pos.y--;
      this.merge(this.arena, this.player);
      this.playerReset()
    }
  }

  _createMatrix(width, height) {
    const matrix = []
    while (height--) {
      matrix.push(new Array(width).fill(0))
    }
    return matrix
  }

  merge(arena, player) {
    player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          arena[y + player.pos.y][x + player.pos.x] = value
        }
      })
    })
  }

  _clearCanvas() {
    this.context.fillStyle = '#f4f4f4'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  _draw() {
    this._clearCanvas()
    this._drawMatrix(this.arena, {x:0, y:0})
    this._drawMatrix(this.player.matrix, this.player.pos)
  }

  _update(time = 0) {
    const deltaTime = time - this.lastTime
    this.lastTime = time

    this.dropCounter += deltaTime

    if (this.dropCounter > this.dropInterval) {
      this._playerDrop()
    }

    this._draw()

    this._reqAniID = requestAnimationFrame(this._update)
  }

  gameStart() {
    console.log('game start: arena', this.arena)
    this._update()
  }

  gamePause() {
    console.log('game pause')
  }

  gameFinish() {
    console.log('game finish')
    cancelAnimationFrame(this._reqAniID)
  }

  printContext() {
    console.log('my context', this.context)
  }
}