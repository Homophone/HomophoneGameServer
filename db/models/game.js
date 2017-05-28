'use strict';
module.exports = function(sequelize, DataTypes) {
  var game = sequelize.define('game', {
    livesRemaining: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        game.hasMany(models.rounds)
      }
    }
  });
  return game;
};
