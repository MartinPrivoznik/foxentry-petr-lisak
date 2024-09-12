import * as products from '../controllers/productsController';
import { Router } from 'express';

const router = Router();

/**
 * @openapi
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all products paged
 *     responses:
 *       200:
 *         description: Paginated ist of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', products.getProductsPagedHandler);

router.get('/all', products.getAllProductsHandler);
router.get('/search', products.fulltextSearchProductsHandler);
router.get('/stock', products.searchProductsByStockQuantityHandler);

router.post('/addProduct', products.addProductHandler);

router.put('/updateProduct', products.updateProductHandler);

router.delete('/:id', products.deleteProductHandler);

export default router;
