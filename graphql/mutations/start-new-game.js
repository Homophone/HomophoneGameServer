const sequelize = require('sequelize')

const game = require('../../db/models').game
const round = require('../../db/models').round
const wordSet = require('../../db/models').word_set
const gameType = require('../types/game')

const giphy = require('giphy')('dc6zaTOxFJmzC') // TODO get production key

const getRandomWordSet = () => (
  wordSet.find({
    order: [
      sequelize.fn('RANDOM')
    ],
    limit: 1
  })
)

const getCorrectAnswer = (words) => words[Math.floor(Math.random() * words.length)].word

const getGiphy = (word) => (
  new Promise((resolve, reject) => {
    giphy.search({
      q: word,
      limit: 1,
      rating: 'pg',
      sort: 'relevant'
    }, (err, result) => (
      err ? reject(err) : resolve(result.data[0])
    ))
  })
)

module.exports = {
  type: gameType,
  description: 'Start a new game',
  resolve(value) {
    // create a game
    return game.create()
    .then((newGame) =>

      // generate a random word set
       getRandomWordSet()
      .then((randomWordSet) => {
        // create a correct answer
        const correctAnswer = getCorrectAnswer(randomWordSet.words)

        // get the giphy for the correct answer
        return getGiphy(correctAnswer)
        .then((correctGiphy) =>
          // create first round
           round.create({
             correctAnswer: correctAnswer,
             gameId: newGame.id,
             wordSetId: randomWordSet.id,
             giphyUrl: correctGiphy.url,
             giphyToken: correctGiphy.id
           })

          // send the created game
          .then(() => newGame))
      }))
  }
}
