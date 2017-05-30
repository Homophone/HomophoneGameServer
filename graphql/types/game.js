const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt
} = require('graphql')

const roundType = require('./round')

const gameType = new GraphQLObjectType({
  name: 'game',
  description: 'A game',
  fields: {
    id: {
      type: GraphQLID,
      description: 'Primary Key'
    },
    isActive: {
      type: GraphQLBoolean,
      description: 'If game is active'
    },
    rounds: {
      type: new GraphQLList(roundType),
      description: 'A list of rounds',
      resolve(obj, args, context) {
        return obj.getRounds()
      }
    },
    livesRemaining: {
      type: GraphQLInt,
      description: 'Lives remaining for this game'
    }
  }
})

module.exports = gameType
