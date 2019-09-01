export default class GameBoardCanvas {
  constructor(context) {
    console.log('new gameboard object!', context)
    this.context = context
  }

  gameStart() {
    console.log('game start')
  }

  gamePause() {
    console.log('game pause')
  }

  gameFinish() {
    console.log('game finish')
  }
}