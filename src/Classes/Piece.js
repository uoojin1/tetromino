export default class Piece {
  constructor(type) {
    if (type === 'T'){
      this.matrix = [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
      ];
    } else if (type === 'O'){
      this.matrix = [
        [2, 2],
        [2, 2]
      ];
    } else if (type === 'L'){
      this.matrix =  [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3]
      ];
    } else if (type === 'J'){
      this.matrix =  [
        [0, 4, 0],
        [0, 4, 0],
        [4, 4, 0]
      ];
    } else if (type === 'I'){
      this.matrix =  [
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0]
      ];
    } else if (type === 'S'){
      this.matrix =  [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0]
      ];
    } else if (type === 'Z'){
      this.matrix =  [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0]
      ];
    }
  }
}