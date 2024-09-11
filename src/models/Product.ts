import { Document, model, Schema, Types } from 'mongoose';

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

const Product = model<IProduct>(DOCUMENT_NAME, productSchema);
export default Product;
