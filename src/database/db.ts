import logger from '#utils/logger';
import mongoose from 'mongoose';

/**
 * Connects to the MongoDB database. Exits the process if the connection fails.
 */
const connectDatabase = async (): Promise<void> => {
  try {
    logger.info('Connecting to the database...');
    const mongoURI =
      process.env.DATABASE_URL ||
      (() => {
        logger.error('MongoDB URI is not provided');
        throw new Error('MongoDB URI is not provided');
      })();
    await mongoose.connect(mongoURI);
  } catch (error) {
    logger.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Log a message when MongoDB connection is successful
mongoose.connection.on('connected', () => {
  logger.info('Database connected successfully');
});

// Try to reconnect when app is disconnected
mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected unexpectedly. Reconnecting...');
  connectDatabase();
});

// Log an error if MongoDB connection fails
mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err.message}`);
});

// Shutdown Mongo connection when app is terminated
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  logger.info('MongoDB connection closed due to app termination');
  process.exit(0);
});

export default connectDatabase;
