/* eslint-disable @typescript-eslint/no-non-null-assertion */
import './database.setup';
import * as productsService from '../src/services/productsService';
import * as priceChangesService from '../src/services/priceChangesService';
import { unexistingObjectId } from './mocks/mongooseMocks';
import NotFoundError from '../src/utils/exceptions/NotFoundError';

describe('getAllProducts', () => {
  it('Should return all products from database', async () => {
    const products = await productsService.getAllProducts();

    expect(products).toHaveLength(6);
  });
});

describe('getProductById', () => {
  it('Should return product by id', async () => {
    const products = await productsService.getAllProducts();
    const product = await productsService.getProductById(products[0]._id!);

    expect(products[0]._id).toEqual(product._id);
    expect(products[0].name).toEqual(product.name);
  });

  it('Should return null if product is not found', async () => {
    const product = await productsService.getProductById(unexistingObjectId);

    expect(product).toBeNull();
  });
});

describe('getProductsPaged', () => {
  it('Should return paged list of products', async () => {
    const products = await productsService.getProductsPaged(1, 3);

    expect(products.items).toHaveLength(3);
    expect(products.totalRecords).toBe(6);
  });

  it('Should return paged list of products with default values', async () => {
    const products = await productsService.getProductsPaged();

    expect(products.items).toHaveLength(6);
    expect(products.totalRecords).toBe(6);
  });
});

describe('fulltextSearchProducts', () => {
  it('Should return products that match the query', async () => {
    const products = await productsService.fulltextSearchProducts('wild');

    expect(products).toHaveLength(2);
  });

  it('Should return all products if query is empty', async () => {
    const products = await productsService.fulltextSearchProducts();

    expect(products).toHaveLength(6);
  });
});

describe('searchProductsByStockQuantity', () => {
  it('Should return products with stock quantity between min and max', async () => {
    const products = await productsService.searchProductsByStockQuantity(5, 10);

    expect(products).toHaveLength(2);
  });

  it('Should return products if min and max are same', async () => {
    const products = await productsService.searchProductsByStockQuantity(
      15,
      15
    );

    expect(products).toHaveLength(1);
  });

  it('Should throw an error if min is greater than max', async () => {
    try {
      await productsService.searchProductsByStockQuantity(10, 5);
    } catch (error) {
      expect(error).toEqual(
        new Error(
          'Minimum stock quantity cannot be greater than maximum stock quantity'
        )
      );
    }
  });
});

describe('addProduct', () => {
  it('Should add a new product to the database and assign id', async () => {
    const product = await productsService.addProduct({
      name: 'Test Product',
      price: 10,
      stock: 10,
    });

    if (!product._id) {
      fail('Product id should be defined');
    }

    const foundProduct = await productsService.getProductById(product._id);

    expect(foundProduct._id).toEqual(product._id);
    expect(foundProduct.name).toEqual(product.name);
  });
});

describe('updateProduct', () => {
  it('Should update a product in the database', async () => {
    const product = await productsService.getAllProducts();
    product[0].name = 'Updated product';
    product[0].price = 100;
    product[0].stock = 100;

    await productsService.updateProduct(product[0]);

    const updatedProduct = await productsService.getProductById(
      product[0]._id!
    );

    expect(updatedProduct.name).toEqual('Updated product');
    expect(updatedProduct.price).toEqual(100);
    expect(updatedProduct.stock).toEqual(100);
  });

  it('Should throw an error if product is not found', async () => {
    const product = await productsService.getAllProducts();
    product[0]._id = unexistingObjectId;

    try {
      await productsService.updateProduct(product[0]);
    } catch (error) {
      expect(error).toEqual(
        new NotFoundError(`Product with id ${unexistingObjectId} not found`)
      );
    }
  });

  it('Should create a price change record if price has changed', async () => {
    const product = await productsService.getAllProducts();
    product[0].price = 69;

    await productsService.updateProduct(product[0]);

    const priceHistory = await priceChangesService.getAllPriceChangeRecords();

    expect(priceHistory).toHaveLength(1);
    expect(priceHistory[0].oldPrice).toEqual(420.69);
    expect(priceHistory[0].newPrice).toEqual(69);
  });
});

describe('deleteProduct', () => {
  it('Should delete a product from the database', async () => {
    const product = await productsService.getAllProducts();
    await productsService.deleteProduct(product[0]._id!);

    const deletedProduct = await productsService.getProductById(
      product[0]._id!
    );

    expect(deletedProduct).toBeNull();
  });

  it('Should throw an error if product is not found', async () => {
    try {
      await productsService.deleteProduct(unexistingObjectId);
    } catch (error) {
      expect(error).toEqual(
        new NotFoundError(`Product with id ${unexistingObjectId} not found`)
      );
    }
  });
});
