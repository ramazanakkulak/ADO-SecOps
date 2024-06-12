// endpoints.js

const express = require('express');
const movieRoutes = require('./routes/movieRoutes');
const accountRoutes = require('./routes/accountRoutes');

const router = express.Router();

router.use('/movies', movieRoutes);
router.use('/account', accountRoutes);

module.exports = router;
