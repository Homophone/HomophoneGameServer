const game = require('../../db/models').game
const gameType = require('../types/game')

module.exports = {
  type: gameType,
  description: 'Start a new game',
  resolve(value) {
    return game.create({
      livesRemaining: 3
    })
  }
}
