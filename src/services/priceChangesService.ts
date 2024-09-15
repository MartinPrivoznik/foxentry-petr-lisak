import ProductPriceHistory, {
  IProductPriceHistory,
} from '../models/ProductPriceHistory';
import { validateObjectId } from '../utils/validators/mongoValidator';

/**
 * Returns an array of all price change records in the database.
 * @returns Array of price change records
 */
export const getAllPriceChangeRecords = async (): Promise<
  IProductPriceHistory[]
> => {
  return ProductPriceHistory.find().exec();
};

/**
 * Returns an array of all price change records of one product in the database.
 * @param productId product id
 * @returns Array of price change records
 */
export const getAllPriceChangeRecordsForProduct = async (
  productId: string
): Promise<IProductPriceHistory[]> => {
  validateObjectId(productId);
  return ProductPriceHistory.find().where({ productId: productId }).exec();
};
