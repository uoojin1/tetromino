import Piece from './Piece'
import MatrixObject from './MatrixObject'
import AvailablePieces from '../Constants/AvailablePieces'

export default class Player extends MatrixObject {
  constructor() {
    super(new Piece(AvailablePieces[AvailablePieces.length * Math.random() | 0]).matrix)
    this.pos = {
      x: 0,
      y: 0
    }
    this.score = 0

    this._rotate = this._rotate.bind(this)
    this._collide = this._collide.bind(this)

    this.reset = this.reset.bind(this)
    this.move = this.move.bind(this)
    this.rotate = this.rotate.bind(this)
    this.freeFall = this.freeFall.bind(this)
    this.drop = this.drop.bind(this)
  }

  _collide(arena) {
    const [matrix, offset] = [this.matrix, this.pos];
    for( let y = 0; y < matrix.length; ++y ){
      for( let x = 0; x < matrix[y].length; ++x ){
        if (matrix[y][x] !== 0
            && (arena[y + offset.y] && arena[y+offset.y][x+offset.x]) !== 0) {
          return true;
        }
      }
    }
    return false;
  }
  _rotate(dir) {
    let rotated = this._createMatrix(this.matrix[0].length, this.matrix.length);
    let maxRow = this.matrix.length - 1;
    let maxCol = this.matrix[0].length - 1;
    for (let y = 0; y < this.matrix.length; ++y){
      for( let x = 0; x < this.matrix[y].length; ++x){
        if(dir === -1) {
          rotated[y][x] = this.matrix[x][maxRow-y];
        } else if (dir === 1) {
          rotated[y][x] = this.matrix[maxCol-x][y];
        }
      }
    }
    this.matrix = rotated;
  }

  reset() {
    this.matrix = new Piece(AvailablePieces[AvailablePieces.length * Math.random() | 0]).matrix
    this.pos.y = 0
    this.pos.x = 5
  }
  move(dir, arena) {
    this.pos.x += dir
    if (this._collide(arena.matrix)) {
      this.pos.x -= dir
    }
  }
  rotate(dir, arena) {
    const pos = this.pos.x
    let offset = 1
    this._rotate(dir);
    while (this._collide(arena.matrix)) {
      this.pos.x += offset
      offset = - (offset + (offset > 0 ? 1: -1));
      if (offset > this.matrix[0].length) {
        this.rotate(this.matrix, -dir);
        this.pos.x = pos;
        return;
      }
    }
  }
  freeFall(arena) {
    while (!this._collide(arena.matrix)) {
      this.pos.y++
    }
    this.pos.y--
    arena.merge(this)
    arena.sweep()
    this.reset()
  }
  drop(arena) {
    this.pos.y++;
    this.dropCounter = 0;
    if (this._collide(arena.matrix)) {
      this.pos.y--
      arena.merge(this)
      this.reset()
      arena.sweep()
    }
  }
}

