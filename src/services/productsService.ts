import { defaultPageSize } from "./constants/productConstants";
import { PagedList } from "../utils/dataStructures/PagedList";
import Product, { IProduct } from "../models/Product";

/**
 * Returns an array of all products included in the database
 * @returns Array of all products
 */
export const getAllProducts = async (): Promise<IProduct[]> => {
    return await Product.find().exec();
}

/**
 * Returns a paged list of products based on page and page size. See {@link PagedList} for more details.
 * @param page page to be used in output
 * @param pageSize count of items per page
 * @returns Paginated list of products
 */
export const getProductsPaged = async (page?: number, pageSize?: number): Promise<PagedList<IProduct>> => {
    const p = page || 1;
    const size = pageSize || defaultPageSize;
    const offset = (p - 1) * size;
    
    const totalRecords = await Product.countDocuments().exec();
    const products = await Product.find().skip(offset).limit(size).exec();

    return {
        items: products,
        totalRecords: totalRecords,
        currentPage: p,
        offset: offset
    };
};