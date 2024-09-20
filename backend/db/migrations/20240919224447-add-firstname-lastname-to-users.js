'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define schema for production
}

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn(
      { tableName: 'Users', ...options },
      "firstName", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    });

    await queryInterface.addColumn(
      { tableName: 'Users', ...options },
      "lastName", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    });

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn(
      { tableName: 'Users', ...options },
      'firstName'
    );
    await queryInterface.removeColumn(
      { tableName: 'Users', ...options }, 
      'lastName'
    );
  }
};


// async down(queryInterface, Sequelize) {
//   options.tableName = "Users";
//   return queryInterface.dropTable(options);
// }