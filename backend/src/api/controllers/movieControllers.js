const catchAsync = require('../../utilities/catchAsync');
const AppError = require('../../utilities/appError');
const fs = require('fs');
const { logger } = require('../../pkg/logger/logger');
const {
  http_exc_401_cinema_file_fail_added,
  http_exc_401_cinema_ticket_not_found,
} = require('../../utilities/exceptions/http/exc_401');
const MovieRepository = require('../../repository/crud/movie');
const {
  http_500_exc_label_not_found_request,
} = require('../../utilities/exceptions/http/exc_500');

///   ~ MOVIE CONTROLLER ~  ///\ \
/**
 * @route /api/v1/movie/create
 * @param {json} json file
 * @desc It is the function of writing the database of the movies in the vision.
 * @return {json}
 * @access PUBLIC
 */
exports.movieCreate = catchAsync(async (req, res, next) => {
  console.log('ramazan');
  const data = await JSON.parse(
    fs.readFileSync('./seeds/movies.json', 'utf-8')
  );
  try {
    await MovieRepository.createMovie(data);
    logger.info('Data succesfull imported.');
    // to exit the process
  } catch (error) {
    logger.error('error', error);
    return res.status(401).json({
      message: new AppError(http_exc_401_cinema_file_fail_added(), 401),
      status: 'fail',
      body: data,
    });
  }
  return res.status(200).json({
    message: new AppError(
      'The Cinema file has been successfully added to the database.',
      200
    ),
    status: 'success',
    body: data,
  });
});

/**
 * @route /api/v1/movie/data
 * @desc Lists all movies written to the database.
 * @return {string}
 * @access PUBLIC
 */
exports.getMovie = catchAsync(async (req, res, next) => {
  const data = await MovieRepository.findAll();
  return res.status(200).json(data);
});

/**
 * @route GET /api/v1/movie/data
 * @desc Lists all movies written to the database.
 * @access PUBLIC
 */
exports.getBuyMovieTicket = catchAsync(async (req, res, next) => {
  const movieTitle = req.body.title;
  console.log(movieTitle)
  try {
    const movie = await MovieRepository.findByTitle(movieTitle);

    if (movie) {
      return res.status(200).json({
        message:
          `You have successfully purchased the ticket to the movie ${movieTitle}. Have fun :)`,
        status: 'success',
        body: movie,
      });
    } else {
      return res.status(401).json({
        message: new AppError(http_exc_401_cinema_ticket_not_found(), 401),
        status: 'fail',
        body: movie,
      });
    }
  } catch (error) {
    logger.error(`Login failed: ${error.message}`);
    res.status(500).json({
      message: new AppError(http_500_exc_label_not_found_request(), 500),
      status: 'fail',
      response: 'error',
    });
  }
});
