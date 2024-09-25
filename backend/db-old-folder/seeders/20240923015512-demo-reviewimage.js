'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Review, ReviewImage } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: "r-img1.png",
        createdAt: new Date(),
        updatedAt: new Date(),       
      },
      {
        reviewId: 2,
        url: "r-img2.png",
        createdAt: new Date(),
        updatedAt: new Date(),       
      },
      {
        reviewId: 3,
        url: "r-img3.png",
        createdAt: new Date(),
        updatedAt: new Date(),       
      },
    ], options);
    

  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'ReviewImages';
    return queryInterface.bulkDelete(options, null, {}); 
  }
};
