import * as products from '#controllers/products';
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
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', products.getProductsPaged);

router.get('/all', products.getAllProducts);
router.get('/search', products.fulltextSearchProducts);
router.get('/stock', products.searchProductsByStockQuantity);

router.post('/addProduct', products.addProduct);

router.put('/updateProduct', products.updateProduct);

router.delete('/:id', products.deleteProduct);

export default router;
