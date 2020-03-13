'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Companies',
      'code',
      Sequelize.STRING
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Companies',
      'code',
    )
  }
};
