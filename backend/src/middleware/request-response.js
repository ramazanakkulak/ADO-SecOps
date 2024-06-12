const { v4: uuidv4 } = require('uuid');
const catchAsync = require('../utilities/catchAsync');
const net = require('net');
const config = require('../config/config');
const { logger } = require('../pkg/logger/logger');

const sendLogToLogstash = (log) => {
  const client = new net.Socket();
  
  client.connect(config.LOGSTASH_PORT, config.LOGSTASH_HOST, () => {
    client.write(JSON.stringify(log) + '\n');
    client.end();
  });

  client.on('error', (err) => {
    console.log(log);
    console.error('Failed to send log to Logstash:', err);
  });
};

const requestResponseMiddleware = catchAsync(async (req, res, next) => {
  const guid = uuidv4(); // unique GUID
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // Get the client IP address
  const start = Date.now(); 

  const logDetails = () => {
    const duration = Date.now() - start; // Calculate the duration
    const log = {
      guid: guid,
      ip: ip,
      method: req.method,
      url: req.url,
      headers: req.headers,
      queryParams: req.query,
      body: req.body,
      responseTime: `${duration}ms`,
      timestamp: new Date().toISOString() // Add timestamp
    };
    if (config.LOGSTASH_STATUS === true){
      sendLogToLogstash(log);
    }
    console.log(log)
  };

  res.on('finish', logDetails);

  next();
});

module.exports = requestResponseMiddleware;
