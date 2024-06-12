const catchAsync = require('../../utilities/catchAsync');
const AppError = require('../../utilities/appError');
const {
  http_400_exc_bad_email_request,
  http_400_exc_bad_username_request,
  http_exc_400_credentials_bad_signin_request,
  http_exc_400_credentials_bad_signup_request,
} = require('../../utilities/exceptions/http/exc_400');
const {
  http_exc_401_unauthorized_request,
  http_exc_401_user_not_found,
  http_exc_401_incorrect_user_password,
} = require('../../utilities/exceptions/http/exc_401');
const {
  http_500_exc_label_not_found_request,
} = require('../../utilities/exceptions/http/exc_500');
const { logger } = require('../../pkg/logger/logger');
const { tokenGenerator } = require('../../securities/authorizations/jwt');
const UserRepository = require('../../repository/crud/account');
/**
 * Returns JWT TOKEN USER INFORMATION
 * @param {string,number,res,secret}
 * @desc User information is entered and necessary login information, jwt and
 *       template configuration values are processed.
 * @return {string} Returns a user information, json web token and template configurasyon in
 *         string format.
 * @access PUBLIC
 */
const createSendToken = async (user, statusCode, res) => {
  try {
    const { token, cookieOptions } = await tokenGenerator.generateToken({
      id: user._id,
      username: user.username,
      email: user.email,
    });
    res.cookie('jwt', token, cookieOptions);

    res.status(statusCode).json({
      message: new AppError('Login success', statusCode),
      status: '200',
      token: token,
      username: user.username,
      email: user.email,
      response: 'ok',
    });

    logger.info('Login success');
  } catch (error) {
    logger.error(`Login failed: ${error.message}`);

    res.status(500).json({
      message: new AppError(http_500_exc_label_not_found_request(), 500),
      status: 'fail',
      response: 'error',
    });
  }
};

/**
 * Returns status
 * @route /api/v1/auth/register
 * @desc It is a necessary function for users to register to the system.
 * @return {string} lots of user information
 * @access PUBLIC
 */
exports.register = catchAsync(async (req, res, next) => {
  const registerUser = req.body;

  logger.info('Register request received');

  if (!registerUser) {
    logger.error('Register request failed: No user data provided');

    return res.status(400).json({
      message: new AppError(await http_400_exc(), 400),
      status: 'fail',
      data: req.body,
    });
  }

  if (await UserRepository.findByUsername(registerUser.username)) {
    logger.error(
      `Register request failed: Username '${registerUser.username}' is already taken`
    );

    return res.status(400).json({
      message: new AppError(
        http_400_exc_bad_username_request(registerUser.username),
        400
      ),
      status: 'fail',
      body: req.body,
    });
  }

  if (await UserRepository.findByEmail(registerUser.email)) {
    logger.error(
      `Register request failed: Email '${registerUser.email}' is already registered`
    );

    return res.status(400).json({
      message: new AppError(
        await http_400_email_details(registerUser.email),
        400
      ),
      status: 'fail',
      body: req.body,
      statusCode: 400,
    });
  }

  // Kullanıcı oluşturma
  await UserRepository.createAccount(registerUser);

  logger.info('User registered successfully');

  res.status(201).json({
    status: 'success',
    message: 'Register success.',
    body: req.body,
    statusCode: 201,
  });
});

/**
 * @route /api/v1/users/login
 * @param {json} data email password
 * @desc It is the function where a registered user performs the login process after the
 *       necessary information is checked.
 * @return {string} Returns a string value
 * @access PUBLIC
 */
exports.login = catchAsync(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Kullanıcı bilgilerini kontrol etme
    if (!email || !password) {
      logger.error('Login request failed: Email or password missing');
      return res.status(401).json({
        message: new AppError(http_exc_401_unauthorized_request(), 401),
        status: 'fail',
        body: req.body,
        statusCode: 401,
      });
    }

    // Kullanıcıyı veritabanında bulma
    const user = await UserRepository.findUserAndCheckPasswordByEmail(email);
    if (!user) {
      logger.error(
        `Login request failed: User with email '${email}' not found`
      );

      return res.status(401).json({
        message: new AppError(http_exc_401_user_not_found(email), 401),
        status: 'fail',
        body: req.body,
        statusCode: 401,
      });
    }
    // Parolanın doğruluğunu kontrol etme
    if (!(await user.correctPassword(password, user.password))) {
      logger.error(
        `Login request failed: Incorrect password for user with email '${email}'`
      );

      return res.status(401).json({
        message: new AppError(http_exc_401_incorrect_user_password(email), 401),
        status: 'fail',
        body: req.body,
        statusCode: 401,
      });
    }

    logger.info(`User with email '${email}' logged in successfully`);

    // Token oluştur ve gönder
    createSendToken(user, 200, res);
  } catch (error) {
    logger.error(`Login request failed: ${error.message}`);

    res.status(500).json({
      message: new AppError(http_500_exc_label_not_found_request(), 500),
      status: 'fail',
      response: 'error',
    });
  }
});

/**
 * @route /api/v1/auth/login
 * @return {string} Returns a string value
 * @access PUBLIC
 */
exports.status = catchAsync(async (req, res, next) => {
  return res.status(200).json({
    status: 'success'
  });
});
