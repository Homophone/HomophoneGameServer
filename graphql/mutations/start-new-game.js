const game = require('../../db/models').game
const round = require('../../db/models').round
const wordSet = require('../../db/models').word_set
const gameType = require('../types/game')

const getRandomWordSet = () => (
  wordSet.find({
    order: [
      sequelize.fn('RANDOM')
    ],
    limit: 1
  })
)

const getCorrectAnswer = (words) => (
  words[Math.floor(Math.random() * words.length)].word
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
        // create a correct answer
        const correctAnswer = getCorrectAnswer(randomWordSet)

        // create first round
        return round.create({
          correctAnswer: correctAnswer,
          gameId: newGame.id,
          wordSetId: randomWordSet.id
        })

        // send the created game
        .then(() => newGame)
      })
    })
  }
}
