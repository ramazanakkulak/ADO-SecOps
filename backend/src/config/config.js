const dotenv = require('dotenv');

const envPath = process.env.NODE_ENV

if (envPath === 'production') {
  dotenv.config({ path: './configProd.env' });
} else {
  dotenv.config({ path: './configDev.env' });
}

const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_HOST: process.env.MONGO_HOST,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'key',
  JWT_ALGORITHM: process.env.JWT_ALGORITHM || 'HS256',
  JWT_SUBJECT: process.env.JWT_SUBJECT || 'example_subject',
  JWT_COOKIE_EXPIRES_IN : process.env.JWT_SUBJECT || '20d',
  JWT_EXPIRES_IN : process.env.JWT_EXPIRES_IN || '20d',
  JWT_MIN: process.env.JWT_MIN || 1440,
  UI: process.env.UI || 'http://localhost:3000',
  LOGSTASH_HOST: process.env.LOGSTASH_HOST,
  LOGSTASH_PORT: process.env.LOGSTASH_PORT,
  LOGSTASH_STATUS: process.env.LOGSTASH_STATUS,
};
module.exports = config;
