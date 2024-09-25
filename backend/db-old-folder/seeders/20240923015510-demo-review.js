'use strict';

/** @type {import('sequelize-cli').Migration} */

const { User, Spot, ReviewImage, Review } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        review: "I like that spot",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date(),       
      },
    ], options);
    
  },

  async down (queryInterface, Sequelize) {
    
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, null, {});
  }
};
