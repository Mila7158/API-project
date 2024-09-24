'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn(
      { tableName: 'Users', ...options },
      "firstName", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    }),

    await queryInterface.addColumn(
      { tableName: 'Users', ...options },
      "lastName", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    })

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn('Users', 'firstName');
    await queryInterface.removeColumn('Users', 'lastName');

  }
};


// async down(queryInterface, Sequelize) {
//   options.tableName = "Users";
//   return queryInterface.dropTable(options);
// }