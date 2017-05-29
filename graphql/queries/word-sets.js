const {
  GraphQLList
} = require('graphql')

const {
  word_set: wordSet
} = require('../../db/models')

const wordSetType = require('../types/wordset')

module.exports = {
  type: new GraphQLList(wordSetType),
  resolve() {
    return wordSet.findAll()
  }
}
