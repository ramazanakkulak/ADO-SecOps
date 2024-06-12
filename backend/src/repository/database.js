const mongoose = require('mongoose');
const config = require('../config/config');
mongoose.Promise = global.Promise;
const connect = mongoose.connection;
const { logger } = require('../pkg/logger/logger');

mongoose.set('strictQuery', true);

const connectToMongoDB = async () => {
  const url = config.MONGO_HOST;
  connect.on('connected', async () => {
    logger.info('MongoDb Connection Established');
  });
  connect.on('reconnected', async () => {
    logger.warn('MongoDB Connection Reestablished');
  });
  connect.on('disconnected', () => {
    logger.error('MongoDB Connection Disconnected');
    logger.info('Trying to reconnect to Mongo...');
    setTimeout(() => {
      mongoose.connect(url, {
        // useNewurlParser: true,
        // useUnifiedTopology: true,
        keepAlive: true,
        socketTimeourMS: 3000,
        connectTimeoutMS: 3000,
      });
    }, 3000);
  });
  connect.on('close', () => {
    logger.info('Mongo Connection Closed');
  });
  connect.on('error', (error) => {
    logger.error('Mongo Connection Error: ' + error);
  });
  await mongoose
    .connect(url, {
      // useNewurlParser: true,
      // useUnifiedTopology: true
    })
    .catch((error) => console.log(error));
};

module.exports = { connectToMongoDB };
