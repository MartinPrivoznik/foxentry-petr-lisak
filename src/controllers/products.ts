import { Request, Response } from 'express';

export const getAllProducts = (req: Request, res: Response) => {
  res.status(200).json('Hello world!');
};

export const getProductsPaged = (req: Request, res: Response) => {
  throw Error('Pičo');
  res.status(200).json('Hello world!');
};

export const addProduct = (req: Request, res: Response) => {
  res.status(200).json('Hello world!');
};

export const updateProduct = (req: Request, res: Response) => {
  res.status(200).json('Hello world!');
};

export const deleteProduct = (req: Request, res: Response) => {
  res.status(200).json('Hello world!');
};

export const fulltextSearchProducts = (req: Request, res: Response) => {
  res.status(200).json('Hello world!');
};

export const searchProductsByStockQuantity = (req: Request, res: Response) => {
  res.status(200).json('Hello world!');
};
