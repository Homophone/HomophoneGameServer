module.exports = {
  type: new GraphQLList(gameType),
  resolve() {
    return game.findAll()
  }
}
