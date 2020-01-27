const router = require('express').Router();

// const UserController = require('../app/controllers/auth/UserController');
const HomeController = require('../app/controllers/HomeController');


router.get('/', HomeController.index);

module.exports = router;