import { Request, Response } from 'express';
import {
  deleteProduct,
  getAllProducts,
  getProductsPaged,
} from '../services/productsService';
import { DeleteProductRequestParams } from './dto/deleteProductRequestParams';
import { ApiResponse, BaseApiResponse } from './dto/ApiResponse';
import { PagedList } from '../utils/dataStructures/PagedList';
import { IProduct } from '../models/Product';

export const getProductsPagedHandler = async (
  req: Request,
  res: Response<ApiResponse<PagedList<IProduct>>>
) => {
  const products = await getProductsPaged();
  res.status(200).json({ success: true, data: products });
};

export const getAllProductsHandler = async (
  req: Request,
  res: Response<ApiResponse<IProduct[]>>
) => {
  const products = await getAllProducts();
  res.status(200).json({ success: true, data: products });
};

export const fulltextSearchProductsHandler = (req: Request, res: Response) => {
  res.status(200).json('Hello world!');
};

export const searchProductsByStockQuantityHandler = (
  req: Request,
  res: Response
) => {
  res.status(200).json('Hello world!');
};

export const addProductHandler = (req: Request, res: Response) => {
  res.status(200).json('Hello world!');
};

export const updateProductHandler = (req: Request, res: Response) => {
  res.status(200).json('Hello world!');
};

export const deleteProductHandler = async (
  req: Request<DeleteProductRequestParams>,
  res: Response<BaseApiResponse>
) => {
  await deleteProduct(req.params.id);
  res.status(200).json({ success: true, message: 'Product deleted' });
};
