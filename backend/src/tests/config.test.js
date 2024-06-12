const config = require('../config/config');
const dotenv = require('dotenv');

describe('Configuration', () => {
  it('loads configuration for development environment', () => {
    process.env.NODE_ENV = 'development';
    const expectedConfig = {
      PORT: process.env.PORT || 3000,
      NODE_ENV: 'development',
      MONGO_HOST: process.env.MONGO_HOST,
      JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'key',
      JWT_ALGORITHM: process.env.JWT_ALGORITHM || 'HS256',
      JWT_SUBJECT: process.env.JWT_SUBJECT || 'example_subject',
      JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN || '20d',
      JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '20d',
      JWT_MIN: process.env.JWT_MIN || 1440,
      UI: process.env.UI || 'http://localhost:3000'
    };
    expect(config.JWT_ALGORITHM).toEqual(expectedConfig.JWT_ALGORITHM);
  });

  it('loads configuration for production environment', () => {
    process.env.NODE_ENV = 'production';
    const expectedConfig = {
      PORT: process.env.PORT || 3000,
      NODE_ENV: 'production',
      MONGO_HOST: process.env.MONGO_HOST,
      JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'key',
      JWT_ALGORITHM: process.env.JWT_ALGORITHM || 'HS256',
      JWT_SUBJECT: process.env.JWT_SUBJECT || 'example_subject',
      JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN || '20d',
      JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '20d',
      JWT_MIN: process.env.JWT_MIN || 1440,
      UI: process.env.UI || 'http://localhost:3000'
    };

    expect(config.JWT_ALGORITHM).toEqual(expectedConfig.JWT_ALGORITHM);
  });

});
