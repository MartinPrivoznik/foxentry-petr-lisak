import mongoose from 'mongoose';
import * as products from './mocks/productMocks';
import { IProduct } from '../src/models/Product';

beforeEach(async () => {
  await mongoose.connect(
    process.env.DATABASE_URL ||
      (() => {
        throw new Error('MongoDB URI is not provided');
      })()
  );
  //Force wait for connection to be established
  await mongoose.connection.db?.listCollections().toArray();
  await mockDatabaseData();
});

afterEach(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

const mockDatabaseData = async () => {
  mongoose.connection
    .collection<IProduct>('products')
    .insertMany([
      products.product1,
      products.product2,
      products.product3,
      products.product4,
      products.product5,
      products.product6,
    ]);
};
