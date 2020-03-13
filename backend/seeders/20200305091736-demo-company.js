'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    Example:
    return queryInterface.bulkInsert('Companies', [{
      name: 'John Doe',
      code: "455",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    Example:
    return queryInterface.bulkDelete('Companies', null, {});
  }
};
