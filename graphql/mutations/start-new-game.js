module.exports = {
  type: gameType,
  description: 'Start a new game',
  resolve(value) {
    return game.create()
    .then((newGame) => {
      return round.create({
        gameId: newGame.id
      })
      .then(() => newGame)
    })
  }
}
