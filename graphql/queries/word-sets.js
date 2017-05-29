module.exports = {
  type: new GraphQLList(wordSetType),
  resolve() {
    return wordSet.findAll()
  }
}
