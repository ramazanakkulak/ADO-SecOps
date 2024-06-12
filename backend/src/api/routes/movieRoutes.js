const express = require('express');
const cinema = require('../controllers/movieControllers');
const authJWT = require('../../middleware/middleware')
const router = express.Router();
router.post('/create',authJWT, cinema.movieCreate);
router.get('/', cinema.getMovie);
router.post('/buy-ticket',authJWT, cinema.getBuyMovieTicket);
module.exports = router;
