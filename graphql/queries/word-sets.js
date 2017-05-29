const graphql = require('graphql')
const GraphQLList = graphql.GraphQLList

const wordSet = require('../../db/models').word_set
const wordSetType = require('../types/wordset')

module.exports = {
  type: new GraphQLList(wordSetType),
  resolve() {
    return wordSet.findAll()
  }
}
