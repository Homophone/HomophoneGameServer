const graphql = require('graphql')
const GraphQLSchema = graphql.GraphQLSchema
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString = graphql.GraphQLString
const GraphQLList = graphql.GraphQLList

const wordSetType = require('./types/wordset')
const gameType = require('./types/game')

const wordSet = require('../db/models').word_set
const game = require('../db/models').game
const round = require('../db/models').round

const games = require('./queries/games')
const wordSets = require('./queries/word-sets')

const startNewGame = require('./mutations/start-new-game')

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
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
});

module.exports = schema;
