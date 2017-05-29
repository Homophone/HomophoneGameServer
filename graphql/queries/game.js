const {
  GraphQLID,
  GraphQLNonNull
} = require('graphql')

const {
  game
} = require('../../db/models')

const gameType = require('../types/game')

module.exports = {
  type: gameType,
  args: {
    id: {
      description: 'id of the game',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(obj, { id }) {
    return game.findById(id)
  }
}
