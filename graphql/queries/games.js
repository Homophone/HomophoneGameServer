const graphql = require('graphql')
const GraphQLList = graphql.GraphQLList

const game = require('../../db/models').game
const gameType = require('../types/game')

module.exports = {
  type: new GraphQLList(gameType),
  resolve() {
    return game.findAll()
  }
}
