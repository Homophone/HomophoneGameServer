const graphql = require('graphql')
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString = graphql.GraphQLString
const GraphQLID = graphql.GraphQLID
const GraphQLList = graphql.GraphQLList
const _ = require('lodash')

const wordSetType = new GraphQLObjectType({
  name: 'wordSet',
  description: 'A word set',
  fields: {
    id: {
      type: GraphQLID,
      description: 'Primary Key'
    },
    words: {
      type: new GraphQLList(GraphQLString),
      description: 'A string of words',
      resolve(obj, args, context) {
        return _.map(obj.words, (word) => (
          word.word
        ))
      }
    }
  }
})

module.exports = wordSetType
