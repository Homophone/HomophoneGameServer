const graphql = require('graphql')
const GraphQLSchema = graphql.GraphQLSchema
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString = graphql.GraphQLString
const GraphQLList = graphql.GraphQLList

const wordSetType = require('./types/wordset')

const wordSet = require('../db/models').word_set

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
      }
    }
  })
});

module.exports = schema;
