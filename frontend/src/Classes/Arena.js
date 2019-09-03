import MatrixObject from './MatrixObject'

class Arena extends MatrixObject {
  constructor(width, height) {
    const matrix = []
    while (height--) {
      matrix.push(new Array(width).fill(0))
    }
    super(matrix)
  }

  merge(player) {
    player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.matrix[y + player.pos.y][x + player.pos.x] = value
        }
      })
    })
  }
  sweep() {
    let rowCount = 1
    outer: for (let y = this.matrix.length - 1; y > 0; --y) {
      for (let x = 0; x < this.matrix[y].length; ++x) {
        if (this.matrix[y][x] === 0) {
          continue outer
        }
      }
      const row = this.matrix.splice(y,1)[0].fill(0)
      this.matrix.unshift(row)
      ++y
    }
  }
}

export default Arena
