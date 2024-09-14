import ProductPriceHistory, {
  IProductPriceHistory,
} from '../models/ProductPriceHistory';

/**
 * Returns an array of all price change records in the database.
 * @returns Array of price change records
 */
export const getAllPriceChangeRecords = async (): Promise<
  IProductPriceHistory[]
> => {
  return ProductPriceHistory.find().exec();
};
