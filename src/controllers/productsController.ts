import { Request, Response } from 'express';
import { getAllProducts, getProductsPaged } from '../services/productsService';

export const getAllProductsHandler = async (req: Request, res: Response) => {
  const products = await getAllProducts();
  res.status(200).json(products);
};

export const getProductsPagedHandler = async (req: Request, res: Response) => {
  const products = await getProductsPaged()
  res.status(200).json(products);
};

export const addProductHandler = (req: Request, res: Response) => {
  res.status(200).json('Hello world!');
};

export const updateProductHandler = (req: Request, res: Response) => {
  res.status(200).json('Hello world!');
};

export const deleteProductHandler = (req: Request, res: Response) => {
  res.status(200).json('Hello world!');
};

export const fulltextSearchProductsHandler = (req: Request, res: Response) => {
  res.status(200).json('Hello world!');
};

export const searchProductsByStockQuantityHandler = (req: Request, res: Response) => {
  res.status(200).json('Hello world!');
};
