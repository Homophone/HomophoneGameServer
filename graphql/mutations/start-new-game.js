const game = require('../../db/models').game
const round = require('../../db/models').round
const gameType = require('../types/game')

module.exports = {
  type: gameType,
  description: 'Start a new game',
  resolve(value) {
    return game.create()
    .then((newGame) => round.create({
      gameId: newGame.id
    })
      .then(() => newGame))
  }
}
