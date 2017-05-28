const graphql = require('graphql')
const GraphQLSchema = graphql.GraphQLSchema
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString = graphql.GraphQLString
const GraphQLList = graphql.GraphQLList

const wordSetType = require('./types/wordset')
const gameType = require('./types/game')

const wordSet = require('../db/models').word_set
const game = require('../db/models').game

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      },
      wordSets: {
        type: new GraphQLList(wordSetType),
        resolve() {
          return wordSet.findAll()
        }
      },
      games: {
        type: new GraphQLList(gameType),
        resolve() {
          return game.findAll()
        }
      }
    }
  })
});

module.exports = schema;
