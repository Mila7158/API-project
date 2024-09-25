'use strict';

/** @type {import('sequelize-cli').Migration} */

const { User, Spot, SpotImage } = require('../models');

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "img1.png",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date(),       
      },
      {
        spotId: 1,
        url: "img2.png",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),       
      },
      {
        spotId: 1,
        url: "img3.png",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date(),       
      },
    ], options);
    
  },

  async down (queryInterface, Sequelize) {
    
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, null, {});  
  }
};
