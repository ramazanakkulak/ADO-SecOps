const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');

const MovieRepository = require('../repository/crud/movie');
const { logger } = require('../pkg/logger/logger');
dotenv.config({ path: '../configDev.env' });
mongoose
  .connect(process.env.MONGO_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    logger.info('MongoDb Connection Established');

    const data = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'));

    await MovieRepository.createMovie(data);

    logger.info('Data successfully imported.');
    mongoose.connection.close();
  })
  .catch((err) => {
    logger.error('MongoDB Connection Error');
  });
