import logger from './src/utils/logger';
import app from './src';
import connectDatabase from './src/database/db';

const port = process.env.PORT || '3000';

async function main() {
  try {
    await connectDatabase();
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  } catch (error) {
    logger.error('Server failed to start:', error);
    process.exit(1);
  }
}

main();
