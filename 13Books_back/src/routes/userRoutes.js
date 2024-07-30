const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/register', userController.register);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);
router.get('/users', userController.showUsers);

module.exports = router;
