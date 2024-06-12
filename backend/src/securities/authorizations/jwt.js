const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const { logger } = require('../../pkg/logger/logger');

class JWTokenGenerator {
  constructor(secretKey, algorithm, subject, expirationMinutes) {
    this.secretKey = secretKey;
    this.algorithm = algorithm;
    this.subject = subject;
    this.expirationMinutes = expirationMinutes;
  }

  async generateToken(jwtData, expiresDelta = null) {
    return new Promise((resolve, reject) => {
      let expire;
      if (expiresDelta) {
        expire = new Date(Date.now() + expiresDelta);
      } else {
        expire = new Date(Date.now() + this.expirationMinutes * 60000);
      }

      jwt.sign(
        {
          ...jwtData,
          exp: Math.floor(expire.getTime() / 1000)
        },
        this.secretKey,
        {
          algorithm: this.algorithm,
          subject: this.subject
        },
        (err, token) => {
          if (err) {
            logger.error('Error creating token:', err);
            reject(err);
          } else {
            logger.info('Token created successfully');
            const cookieOptions = {
              expires: new Date(
                Date.now() + this.expirationMinutes * 24 * 60 * 60 * 1000
              ),
              httpOnly: false,
              secure: false,
              withCredentials: true
            };

            logger.info('Cookie option created successfully');
            resolve({ token, cookieOptions });
          }
        }
      );
    });
  }
}

const tokenGenerator = new JWTokenGenerator(
  config.JWT_SECRET_KEY,
  config.JWT_ALGORITHM,
  config.JWT_SUBJECT,
  config.JWT_MIN
);

module.exports = { tokenGenerator };
