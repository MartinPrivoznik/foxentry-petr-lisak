import { defaultPageSize } from './constants/productConstants';
import { PagedList } from '../utils/dataStructures/PagedList';
import Product, { IProduct } from '../models/Product';
import logger from '../utils/logger';
import NotFoundError from '../utils/exceptions/NotFoundError';

/**
 * Returns an array of all products included in the database
 * @returns Array of all products
 */
export const getAllProducts = async (): Promise<IProduct[]> => {
  return await Product.find().exec();
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
 * Finds a product by its id and tries to delete it. If the product is not found, a NotFoundError is thrown.
 * @param id id of the product to be deleted
 * @throws The {@link NotFoundError} if the product is not found
 */
export const deleteProduct = async (id: string): Promise<void> => {
  const res = await Product.findByIdAndDelete(id).exec();

  if (!res) {
    logger.error(`[deleteProduct]: Product with id ${id} not found`);
    throw new NotFoundError(`Product with id ${id} not found`);
  }
};
