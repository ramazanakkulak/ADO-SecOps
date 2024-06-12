const express = require('express');
const account = require('../controllers/accountControllers');
const authProtect = require('../../middleware/middleware');
const router = express.Router();

router.post('/register', account.register);
router.post('/login', account.login);
router.post('/status', authProtect,account.status);
module.exports = router;
