const sequelize = require('sequelize')
const {
  sample
} = require('lodash')

const {
  GraphQLID,
  GraphQLNonNull
} = require('graphql')

const round = require('../../db/models').round
const wordSet = require('../../db/models').word_set
const roundType = require('../types/round')

const giphy = require('giphy')('dc6zaTOxFJmzC') // TODO get production key

class GiphyError extends Error {}

const getRandomWordSet = () => (
  wordSet.find({
    order: [
      sequelize.fn('RANDOM')
    ],
    limit: 1
  })
)

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

const getRandomWordSetAttributes = ({ attempts, triedWords = [] }) => {
  if (attempts === 0) {
    throw new GiphyError(`Too many attempts. Tried: ${triedWords.join(', ')}`)
  }

  return getRandomWordSet()
  .then((wordSet) => {
    const word = sample(wordSet.words).word
    return getGiphy(word).then((giphy) => {
      if (giphy && giphy.id && giphy.images && giphy.images.downsized_medium && giphy.images.downsized_medium.url) {
        return {
          correctAnswer: word,
          wordSetId: wordSet.id,
          giphyUrl: giphy.images.downsized_medium.url,
          giphyToken: giphy.id
        }
      } else {
        return getRandomWordSetAttributes({
          attempts: attempts - 1,
          triedWords: [...triedWords, word]
        })
      }
    })
  })
}

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
    return getRandomWordSetAttributes({ attempts: 5 })
    .then((wordSetAttributes) => (
      round.create(Object.assign({}, wordSetAttributes, { gameId }))
    ))
  }
}
