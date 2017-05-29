const game = require('../../db/models').game
const round = require('../../db/models').round
const wordSet = require('../../db/models').word_set
const gameType = require('../types/game')

const getRandomWordSet = () => (
  return wordSet.find({
    order: [
      sequelize.fn('RANDOM')
    ],
    limit: 1
  })
)

module.exports = {
  type: gameType,
  description: 'Start a new game',
  resolve(value) {
    // create a game
    return game.create()
    .then((newGame) => {
      // generate a random word set
      return getRandomWordSet()
      .then((randomWordSet) => {
        // create first round
        return round.create({
          gameId: newGame.id
        })
        .then(() => newGame)
      })
    })
  }
}
