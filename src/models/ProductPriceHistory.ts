import { Document, model, Schema, Types } from 'mongoose';

const DOCUMENT_NAME = 'ProductPriceHistory';

export interface IProductPriceHistory extends Document {
  _id: Types.ObjectId;
  oldPrice: number;
  newPrice: number;
  productId: Types.ObjectId;
}

const productPriceHistorySchema = new Schema<IProductPriceHistory>({
  oldPrice: { type: Number, required: true },
  newPrice: { type: Number, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
});

const ProductPriceHistory = model<IProductPriceHistory>(
  DOCUMENT_NAME,
  productPriceHistorySchema
);

export default ProductPriceHistory;
