'use strict'
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('rounds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      wordSetId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'word_sets',
          key: 'id'
        }
      },
      gameId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'games',
          key: 'id'
        }
      },
      roundNumber: {
        type: Sequelize.INTEGER
      },
      isCorrect: {
        type: Sequelize.BOOLEAN
      },
      correctAnswer: {
        type: Sequelize.STRING
      },
      selectedAnswer: {
        type: Sequelize.STRING
      },
      giphyUrl: {
        type: Sequelize.STRING
      },
      giphyToken: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('rounds')
  }
}
