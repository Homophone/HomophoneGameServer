const sequelize = require('sequelize')
const {
  GraphQLID,
  GraphQLNonNull
} = require('graphql')

const round = require('../../db/models').round
const wordSet = require('../../db/models').word_set
const roundType = require('../types/round')

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
  type: roundType,
  description: 'Start a new round for an existing game',
  args: {
    gameId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'id for the game'
    }
  },
  resolve(value, { gameId }) {
    // generate a random word set
    return getRandomWordSet()
    .then((randomWordSet) => {
      // create a correct answer
      const correctAnswer = getCorrectAnswer(randomWordSet.words)

      // get the giphy for the correct answer
      return getGiphy(correctAnswer)
      .then((correctGiphy) => (
        // create first round
         round.create({
           correctAnswer: correctAnswer,
           gameId: gameId,
           wordSetId: randomWordSet.id,
           giphyUrl: correctGiphy.images.downsized_medium.url,
           giphyToken: correctGiphy.id
         }))
      )
    })
  }
}
