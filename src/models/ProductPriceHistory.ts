import { model, Schema, Types } from 'mongoose';

const DOCUMENT_NAME = 'ProductPriceHistory';

export interface IProductPriceHistory {
  _id: string;
  oldPrice: number;
  newPrice: number;
  updatedDate: Date;
  productId: Types.ObjectId;
}

const productPriceHistorySchema = new Schema<IProductPriceHistory>({
  oldPrice: { type: Number, required: true },
  newPrice: { type: Number, required: true },
  updatedDate: { type: Date, default: Date.now, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
});

const ProductPriceHistory = model<IProductPriceHistory>(
  DOCUMENT_NAME,
  productPriceHistorySchema
);

export default ProductPriceHistory;
