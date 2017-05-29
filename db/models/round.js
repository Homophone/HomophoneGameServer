'use strict'
module.exports = function(sequelize, DataTypes) {
  const round = sequelize.define('round', {
    roundNumber: DataTypes.INTEGER,
    isCorrect: DataTypes.BOOLEAN,
    correctAnswer: DataTypes.STRING,
    selectedAnswer: DataTypes.STRING,
    giphyUrl: DataTypes.STRING,
    giphyToken: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        round.belongsTo(models.word_set)
        round.belongsTo(models.game)
      }
    }
  })
  return round
}
