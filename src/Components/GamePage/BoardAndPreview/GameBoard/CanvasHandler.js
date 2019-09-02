export default class CanvasHandler {
  constructor(canvas) {
    this.context = canvas.getContext("2d")
    this.canvas = canvas
    this.context.scale(20, 20)
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

  createPiece(type) {
    if (type === 'T'){
      return [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
      ];
    } else if (type === 'O'){
      return [
        [2, 2],
        [2, 2]
      ];
    } else if (type === 'L'){
      return [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3]
      ];
    } else if (type === 'J'){
      return [
        [0, 4, 0],
        [0, 4, 0],
        [4, 4, 0]
      ];
    } else if (type === 'I'){
      return [
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0]
      ];
    } else if (type === 'S'){
      return [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0]
      ];
    } else if (type === 'Z'){
      return [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0]
      ];
    }
  }

  arenaSweep() {
    let rowCount = 1
    outer: for (let y = this.arena.length - 1; y > 0; --y) {
      for (let x = 0; x < this.arena.length; ++x) {
        if (this.arena[y][x] === 0) {
          continue outer
        }
      }
      const row = this.arena.splice(y,1)[0].fill(0)
      this.arena.unshift(row)
      ++y
    }
  }

  playerReset() {
    const pieces = 'ILJOTSZ';
    this.player.matrix = this.createPiece(pieces[pieces.length * Math.random() | 0]); // floored
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
      } else if (event.keyCode === 32){
        this.playerFreeFall();
      }
    })
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

  playerMove(dir) {
    this.player.pos.x += dir;
    if (this.collide(this.arena, this.player)){
      this.player.pos.x -= dir;
    }
  }

  rotate(matrix, dir) {
    let rotated = this._createMatrix(matrix[0].length, matrix.length);
    let maxRow = matrix.length - 1;
    let maxCol = matrix[0].length - 1;
    for (let y = 0; y < matrix.length; ++y){
      for( let x = 0; x < matrix[y].length; ++x){
        if(dir === -1) { // clockwise
          rotated[y][x] = matrix[x][maxRow-y];
        } else if (dir === 1) {
          rotated[y][x] = matrix[maxCol-x][y];
        }
      }
    }
    this.player.matrix = rotated;
  }

  playerRotate(dir) {
    const pos = this.player.pos.x
    let offset = 1
    this.rotate(this.player.matrix, dir);
    while (this.collide(this.arena, this.player)){
      this.player.pos.x += offset;
      offset = - (offset + (offset > 0 ? 1: -1));
      /**
       * if offset grows too large and it doesn't make sense to move the piece that far, just keep 
       * that position, and revert the rotation. player should be stuck here
       */
      if(offset > this.player.matrix[0].length) {
        this.rotate(player.matrix, -dir);
        this.player.pos.x = pos;
        return;
      }
  }
  }

  playerFreeFall() {
    while (!this.collide(this.arena, this.player)){
      this.player.pos.y++;
    }
    this.player.pos.y--;
    this.merge(this.arena, this.player);
    this.playerReset();
    this.arenaSweep()
  }

  _playerDrop() {
    this.player.pos.y++;
    this.dropCounter = 0;
    if (this.collide(this.arena, this.player)) {
      this.player.pos.y--;
      this.merge(this.arena, this.player);
      this.playerReset()
      this.arenaSweep()
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
    this.context.fillStyle = '#ffffff'
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