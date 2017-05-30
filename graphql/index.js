const {
  GraphQLSchema,
  GraphQLObjectType
} = require('graphql')

const game = require('./queries/game')
const games = require('./queries/games')
const wordSets = require('./queries/word-sets')

const chooseWord = require('./mutations/choose-word')
const newRound = require('./mutations/new-round')
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
      chooseWord,
      newRound,
      startNewGame
    }
  })
})

module.exports = schema
