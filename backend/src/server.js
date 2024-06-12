const app = require('./app');
const config = require('./config/config');
const connection = require('./repository/database');

(async () => {
  try {
    // Load environment variables
    console.log(`THE PROJECT IS RUNNING on ${config.NODE_ENV} ENVIRONMENT\n`);
    // Connect to MongoDB
    await connection.connectToMongoDB();
    console.log('DB connection successful!');

    // Start the server
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });

    // Graceful shutdown için SIGINT sinyalini dinleme
    process.on('SIGINT', gracefulShutdown);
    // Graceful shutdown için SIGTERM sinyalini dinleme
    process.on('SIGTERM', gracefulShutdown);
  } catch (err) {
    console.error('An error occurred during initialization:', err);
    process.exit(1);
  }
})();

const gracefulShutdown = () => {
  console.log('Starting graceful shutdown...');
  server.close(() => {
    console.log('Server closed');
    connection.disconnectFromMongoDB(() => {
      console.log('Disconnected from MongoDB');
      process.exit(0);
    });
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000); // 10 saniye
};

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err);
  gracefulShutdown();
});
