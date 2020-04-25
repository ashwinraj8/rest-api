const express = require("express");
const router = express.Router();

let UserController = require('../controllers/user')
let checkAuth = require('../middleware/check-auth');


router.post('/signup', UserController.user_signup);

router.post('/login',UserController.user_login);

router.delete('/:userId',checkAuth, UserController.user_delete);







module.exports = router;