const jwt = require('jsonwebtoken');
const AppError = require('../utilities/appError');
const { promisify } = require('util');
const catchAsync = require('../utilities/catchAsync');
const User = require('../models/accountModel');
const config = require('../config/config');
const {
  http_exc_401_unauthorized_request,
} = require('../utilities/exceptions/http/exc_401');
/**
 * ~~ MIDDLEWARE ~~
 * @param {header} Authorization Bearer "token"
 * @desc The middleware function should be used when a jwt control is required.
 *       Required to protect important user routes.
 *       Jwt is an open standard for sharing security information between server and client.
 *       Each jwt contains a json object, and these json objects also have some claims.
 *       It is encrypted with a cryptographic algorithm to ensure that the requests cannot be changed.
 * @next
 * @access PRIVATE
 */
module.exports = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError(http_exc_401_unauthorized_request(), 401));
  }

  try {
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, config.JWT_SECRET_KEY);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError(http_exc_401_unauthorized_request(), 401));
    }

    req.user = currentUser;
    next();
  } catch (error) {
    // Hata durumunda AppError nesnesi oluşturup hatayı 401 Unauthorized koduyla birlikte next'e iletiyoruz.
    return next(new AppError(http_exc_401_unauthorized_request(), 401));
  }
});
