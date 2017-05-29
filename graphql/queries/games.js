const {
  GraphQLList
} = require('graphql')

const {
  game
} = require('../../db/models')

const gameType = require('../types/game')

module.exports = {
  type: new GraphQLList(gameType),
  resolve() {
    return game.findAll()
  }
}
