const graphql = require('graphql')
const GraphQLSchema = graphql.GraphQLSchema
const GraphQLObjectType = graphql.GraphQLObjectType

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
