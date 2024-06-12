const express = require('express');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const requestResponseMiddleware = require('./middleware/request-response');

const AppError = require('./utilities/appError');
const endpoints = require('./api/endpoints')
const config = require('./config/config')
const app = express();

//
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: [config.UI], credentials: true }));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Data sanitization
app.use(mongoSanitize());
app.use(xss());

// Serving static files
const path = require('path');
const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(publicDirectoryPath));

app.use(requestResponseMiddleware);
// Routes
app.use('/api/v1', endpoints);

// Error handler for routes that do not exist
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!!!`, 404));
});

module.exports = app;
