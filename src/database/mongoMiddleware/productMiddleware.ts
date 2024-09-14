import { Query } from 'mongoose';
import Product, { IProduct } from '../../models/Product';
import ProductPriceHistory from '../../models/ProductPriceHistory';

/**
 * Handler for cascade delete of price change history. Function is used as a mongoose middleware.
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

/**
 * Handler for adding a new price change record. Function is used as a mongoose middleware.
 * Adds a new price change record to the price history collection if price has changed.
 * @param this Mongoose query object {@link Query}
 */
export const handleAddProductPriceUpdate = async function (
  this: Query<unknown, IProduct>
) {
  if (!this) return;

  const newProduct = this.getUpdate() as IProduct;
  const oldProduct = await Product.findOne(this.getQuery()).exec();

  if (!oldProduct || !newProduct) return;
  if (oldProduct?.price === newProduct.price) return;

  await ProductPriceHistory.create({
    productId: oldProduct._id,
    oldPrice: oldProduct.price,
    newPrice: newProduct.price,
    updatedDate: new Date(),
  });
};
