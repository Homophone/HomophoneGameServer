'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query('TRUNCATE rounds, games')
    .then(() => queryInterface.changeColumn('games', 'livesRemaining', {
      type: Sequelize.INTEGER,
      allowNull: false
    }))
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('games', 'livesRemaining', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
  }
}
