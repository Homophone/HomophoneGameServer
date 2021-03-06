const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = require('graphql')

const _ = require('lodash')

const wordSetType = new GraphQLObjectType({
  name: 'wordSet',
  description: 'A word set',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'Primary Key'
    },
    words: {
      type: new GraphQLList(GraphQLString),
      description: 'A list of words',
      resolve(obj, args, context) {
        return _.map(obj.words, (word) => (
          word.word
        ))
      }
    }
  })
})

module.exports = wordSetType
