import { Query } from 'mongoose';
import { IProduct } from '../../models/Product';
import ProductPriceHistory from '../../models/ProductPriceHistory';

/**
 * Handler for cascade delete of price history. This function is used as a mongoose middleware.
 * Deletes all price history records related to the product being deleted.
 * @param this Mongoose query object {@link Query}
 */
export const handleCascadeDeletePriceHistory = async function (
  this: Query<unknown, IProduct>
) {
  if (!this) return;

  const removedProductId = this.getQuery()._id;
  ProductPriceHistory.deleteMany({ productId: removedProductId }).exec();
};

export const handleAddProductPriceUpdate = async function (
  this: Query<unknown, IProduct>
) {
  if (!this) return;
};
