const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth-controller');

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignUp);

router.post('/signup', authController.signup);

module.exports = router;