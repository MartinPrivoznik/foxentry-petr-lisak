import mongoose from 'mongoose';

beforeEach(async () => {
  await mongoose.connect(
    process.env.DATABASE_URL ||
      (() => {
        throw new Error('MongoDB URI is not provided');
      })()
  );
});

afterEach(async () => {
  await mongoose.connection.close();
});
