const router = require('express').Router();
const passport = require('passport');

const UserController = require('../../app/controllers/auth/UserController');

require('../../config/passport');


// Login with email
router.post('/login', 
    UserController.redirectIfAuth,
    UserController.emailLogin
);

// Login with email
router.post('/join', 
    UserController.redirectIfAuth,
    UserController.store
);

// Login/Register with google
router.post('/oauth/facebook',
    UserController.redirectIfAuth, 
    passport.authenticate('facebook-token', {session: false}),
    UserController.facebookAuthCallback
);

// Logout enpoint
router.post('/logout', UserController.mustBeAuth ,UserController.logout);

// get user status (authenticated or not)
router.get('/isauth', UserController.mustBeAuth, UserController.getUser);


module.exports = router;