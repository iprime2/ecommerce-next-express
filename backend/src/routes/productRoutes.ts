import { Router } from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
    searchProduct,
  } from '../controllers/productController';
import { authMiddleware } from '../middlewares/authMiddlewares';
import { sellerMiddleware } from '../middlewares/sellerMiddilewares';

const router = Router();

router.get('/search', searchProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authMiddleware, sellerMiddleware, createProduct);
router.patch('/:id', authMiddleware, sellerMiddleware, updateProductById);
router.delete('/:id', authMiddleware, sellerMiddleware, deleteProductById);


export default router;
