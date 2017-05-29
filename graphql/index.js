const {
  GraphQLSchema,
  GraphQLObjectType
} = require('graphql')

const game = require('./queries/game')
const games = require('./queries/games')
const wordSets = require('./queries/word-sets')

const startNewGame = require('./mutations/start-new-game')

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      game,
      games,
      wordSets
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      startNewGame
    }
  })
})

module.exports = schema
