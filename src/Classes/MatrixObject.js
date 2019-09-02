class MatrixObject {
  constructor(matrix) {
    if (matrix) {
      this.matrix = matrix
    }

    this._rotate = this._rotate.bind(this)
  }
  // PRIVATE METHODS
  _createMatrix(width, height) {
    const matrix = []
    while (height--) {
      matrix.push(new Array(width).fill(0))
    }
    return matrix
  }

  _rotate(dir) {
    let rotated = this._createMatrix(matrix[0].length, matrix.length);
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
    return rotated;
  }
}

export default MatrixObject
