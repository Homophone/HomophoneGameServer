'use strict'
module.exports = function(sequelize, DataTypes) {
  const word_set = sequelize.define('word_set', {
    words: DataTypes.JSONB
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        word_set.hasMany(models.round)
      }
    }
  })
  return word_set
}
