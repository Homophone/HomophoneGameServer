'use strict'
module.exports = function(sequelize, DataTypes) {
  var word_sets = sequelize.define('word_sets', {
    words: DataTypes.JSONB
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        word_sets.hasMany(models.rounds)
      }
    }
  })
  return word_sets
}
