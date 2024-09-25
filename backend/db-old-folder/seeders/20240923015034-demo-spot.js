'use strict';

/** @type {import('sequelize-cli').Migration} */

const {Spot, User, SpotImage, Review } = require('../models');

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "123 Acdkjf st",
        city: 'Los Angeles',
        state: 'California',
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Spot A",
        description: "Nice spot 1",
        price: 123,
        // previewImage: "image1.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        
        
      },
    ], options);
    
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, null, {}); 
  }
};
