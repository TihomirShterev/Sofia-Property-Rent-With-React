const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');
const { auth } = require('../utils');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/verify', userController.verifyLogin);
router.post('/logout', userController.logout);

router.get('/profile', userController.getProfile);
// router.get('/profile', auth(), userController.getProfile); // requires jwt
// router.put('/profile', auth(),userController.editProfileInfo);


module.exports = router;