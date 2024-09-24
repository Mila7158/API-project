// backend/routes/api/users.js
const express = require('express')
const bcrypt = require('bcryptjs');

// const { Op } = require('sequelize');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

const router = express.Router();

//-------------------------------------------------------------------
// Sign up
//-------------------------------------------------------------------

router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName  } = req.body;
    const hashedPassword = bcrypt.hashSync(password);

    const newEmail = req.body.email
    const newPassword = req.body.password
    const newUsername = req.body.username


    const user = await User.create({ email, username, hashedPassword, firstName, lastName  });



    const safeUser = {
      id: user.id,
      firstName: firstName,
      lastName: lastName,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);












// router.post(
//   '/',
//    validateSignup, 
//   async (req, res) => {
//     const { email, password, username, firstName, lastName } = req.body;
//     const hashedPassword = bcrypt.hashSync(password);

//     // const newEmail = req.body.email
//     // const newPassword = req.body.password
//     // const newUsername = req.body.username

//     console.log('************', newEmail, newPassword, newUsername)

//     // const existingUser = await User.findOne({
//     //   where: {
//     //       [Op.or]: [
//     //         { username: newUsername },
//     //         { email: newEmail }
//     //       ]
//     //   }
      
//     // });

//     // if (existingUser) {
//     //   console.log('we found one')
//     //   const err = new Error("User already exists")
//     //   err.status = 501
//     //   return err
//       // next(err)

//       //This code is not working
//       // const passwordMatch = bcrypt.compareSync(newPassword, existingUser.hashedPassword);
     
//     // } else {
//       const user = await User.create({ email, username, hashedPassword, firstName, lastName });
//       const safeUser = {
//         id: user.id,
//         firstName: firstName,
//         lastName: lastName,
//         email: user.email,
//         username: user.username
//       };
    

    

    

//     await setTokenCookie(res, safeUser);

//     return res.status(201).json({
//       user: safeUser
//     });
//   }
// );

// router.post(
//   '/', 
//   validateSignup, 
//   async (req, res) => {
//       const { email, password, username, firstName, lastName } = req.body;
//       // const hashedPassword = bcrypt.hashSync(password);
//       try {
//         const user = await User.signup({ email, username, password, firstName, lastName });

//         const safeUser = {
//         id: user.id,
//         firstName: firstName,
//         lastName: lastName,
//         email: user.email,
//         username: user.username,
//       };

//       await setTokenCookie(res, safeUser);

//       return res.status(201).json({
//         user: safeUser
//       });

//       } catch (err) {
//         if (err.name === 'SequelizeUniqueConstraintError') {
//           const errors = {};

//           for (const error of err.errors) {

//             if (error.path === 'email') {
//               errors.email = "User with that email already exists";
//             }

//             if (error.path === "username") {
//               errors.username = "User with that username already exists";
//             }

//           }
//           return res.status(400).json({
//             message: "User already exists",
//             errors
//           });


//         }
//       }

//     }
//   );



module.exports = router;