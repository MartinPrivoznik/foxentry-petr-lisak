import { Document, model, Schema, Types } from 'mongoose';
import { handleAddProductPriceUpdate, handleCascadeDeletePriceHistory } from '../database/mongoMiddleware/productMiddleware';

const DOCUMENT_NAME = 'Product';

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

// Cascade delete price history
productSchema.pre('findOneAndDelete', handleCascadeDeletePriceHistory);

// Add product price update to price history is price has changed on update
productSchema.post('updateOne', handleAddProductPriceUpdate);

const Product = model<IProduct>(DOCUMENT_NAME, productSchema);
export default Product;
