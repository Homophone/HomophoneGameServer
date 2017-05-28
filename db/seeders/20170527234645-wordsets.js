'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('word_sets', [{
      words: JSON.stringify([{
        "word": "Bear",
        "image": "https://s-media-cache-ak0.pinimg.com/736x/4f/de/00/4fde00b6e6bcbda75a35f1b234b7a38f.jpg"
      }, {
        "word": "Bare",
        "image": "https://thepeoplespharmacy-graedonenterpris.netdna-ssl.com/wp-content/uploads/Bare-Feet.jpg"
      }, {
        "word": "Bair"
      }]),
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('word_sets', null, {});
  }
};
