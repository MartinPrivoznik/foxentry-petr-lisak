import { defaultPageSize } from './constants/productConstants';
import { PagedList } from '../utils/dataStructures/PagedList';
import Product, { IProduct } from '../models/Product';
import logger from '../utils/logger';
import NotFoundError from '../utils/exceptions/NotFoundError';
import { validateObjectId } from '../utils/validators/mongoValidator';

/**
 * Returns an array of all products included in the database
 * @returns Array of all products
 */
export const getAllProducts = async (): Promise<IProduct[]> => {
  return Product.find().exec();
};

/**
 * Returns a paged list of products based on page and page size. See {@link PagedList} for more details.
 * @param page page to be used in output. Default value is 1
 * @param pageSize count of items per page. Default value is 10
 * @returns Paginated list of products
 */
export const getProductsPaged = async (
  page?: number,
  pageSize?: number
): Promise<PagedList<IProduct>> => {
  const p = page || 1;
  const size = pageSize || defaultPageSize;
  const offset = (p - 1) * size;

  const totalRecords = await Product.countDocuments().exec();
  const products = await Product.find().skip(offset).limit(size).exec();

  return {
    items: products,
    totalRecords: totalRecords,
    currentPage: p,
    offset: offset,
  };
};

/**
 * Performs a fulltext search on the products collection based on the query parameter
 * @param query string query to be used in the search
 * @returns array of products that match the query
 */
export const fulltextSearchProducts = (query?: string): Promise<IProduct[]> => {
  const regex = new RegExp(query ?? '', 'i');

  return Product.find({ name: { $regex: regex } }).exec();
};

/**
 * Returns a list of products that have a stock quantity between min and max
 * @param min minimum stock quantity
 * @param max maximum stock quantity
 * @returns
 */
export const searchProductsByStockQuantity = (
  min: number,
  max: number
): Promise<IProduct[]> => {
  return Product.find().where('stock').gte(min).lte(max).exec();
};

/**
 * Creates a new product in the database
 * @param product Product to be added
 * @returns Product that was added with its id assigned
 */
export const addProduct = (product: IProduct): Promise<IProduct> => {
  return Product.create(product);
};

/**
 * Updates a product in the database. Returns true if the product was updated, false otherwise.
 * @param product Updated product
 * @returns true if the product was updated, false otherwise
 */
export const updateProduct = async (product: IProduct): Promise<void> => {
  const res = await Product.updateOne({ _id: product._id }, product);

  if (res.modifiedCount === 0) {
    logger.warn(`[updateProduct]: Product with id ${product._id} not found`);
    throw new NotFoundError(`Product with id ${product._id} not found`);
  }
};

/**
 * Finds a product by its id and tries to delete it. If the product is not found, a NotFoundError is thrown.
 * @param id id of the product to be deleted
 * @throws The {@link NotFoundError} if the product is not found
 */
export const deleteProduct = async (id: string): Promise<void> => {
  validateObjectId(id);

  const res = await Product.findByIdAndDelete(id).exec();

  if (!res) {
    logger.warn(`[deleteProduct]: Product with id ${id} not found`);
    throw new NotFoundError(`Product with id ${id} not found`);
  }
};
