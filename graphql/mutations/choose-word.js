const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} = require('graphql')

const round = require('../../db/models').round
const roundType = require('../types/round')
const ValidationError = require('../errors/validation-error')

module.exports = {
  type: roundType,
  description: 'Start a new round for an existing game',
  args: {
    roundId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'id of the round for which to choose a word'
    },
    word: {
      type: GraphQLString,
      description: 'the word chosen by the player'
    }
  },
  resolve(value, { roundId, word }) {
    return round.findById(roundId)
    .then((roundFound) => {
      if (roundFound.selectedAnswer) {
        throw new ValidationError('Can\'t chooseWord on a round that already has a selectedAnswer.')
      }

      const isCorrect = word === roundFound.correctAnswer
      const updateAttributes = {
        isCorrect,
        selectedAnswer: word
        // TODO: Increment roundsCount
      }

      return Promise.all([
        roundFound.update(updateAttributes),
        roundFound.getGame()
        .then((gameFound) => {
          const livesLost = isCorrect ? 0 : 1
          const livesRemaining = gameFound.livesRemaining - livesLost
          const isActive = livesRemaining > 0

          return gameFound.update({
            livesRemaining,
            isActive
          })
        })
      ])
      .then(() => roundFound)
    })
  }
}
