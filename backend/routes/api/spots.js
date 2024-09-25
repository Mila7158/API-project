// backend/routes/api/session.js
const express = require('express')

const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');

const { User, Spot, SpotImage } = require('../../db/models');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();
//--------------------------------------------------------------
// //??????????????
// const validateLogin = [
//   check('credential')
//     .exists({ checkFalsy: true })
//     .notEmpty()
//     .withMessage('Please provide a valid email or username.'),
//   check('password')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide a password.'),
//   handleValidationErrors
// ];
//-----------------------------------------------------------------
//WORKING CODE FOR GET ALL SPOTS

// router.get('/', (req, res) => {



//     Spot.findAll()

//     .then(spots => {
//         res.json({
//             Spots: spots
//         });
//     })
//     .catch(error => {
//         res.status(500).json({ error: "Error message as needed"});
//     });
// })
     
//---------------------------------------------------
   
router.get('/', async (req, res) => {
    try {
      const spots = await Spot.findAll({
        include: [
          {
            model: SpotImage,
            where: { preview: true },  
            attributes: ['url'],  
            required: false  
          }
        ]
      });

            // Format the response
    const formattedSpots = spots.map(spot => {
        return {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            previewImage: spot.SpotImages.length ? spot.SpotImages[0].url : null  // Get preview image URL
        };
      });

  
      res.json({ Spots: formattedSpots });
      
    } catch (error) {
      res.status(500).json({ error: "Error message as needed" });
    }
  });





















module.exports = router;