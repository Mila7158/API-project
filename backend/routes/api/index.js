// backend/routes/api/index.js

// const router = require('express').Router();

const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);//should be before all routs

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

// router.use('/spots', spotsRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});


// router.post('/test', function(req, res) {
//   res.json({ requestBody: req.body });
// });

// GET /api/set-token-cookie
//  http://localhost:8000/api/set-token-cookie

const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

// GET /api/restore-user

//  http://localhost:8000/api/restore-user

// const { restoreUser } = require('../../utils/auth.js');

// router.use(restoreUser);

// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// GET /api/require-auth

// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

//Connect all the routers exported from these two files in the `index.js` file


// router.use('/spots', spotRouter);   I quessed this



module.exports = router;