import express from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
} from '../controllers/categoryController';
import { authMiddleware } from '../middlewares/authMiddlewares';
import { sellerMiddleware } from '../middlewares/sellerMiddilewares';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', authMiddleware, sellerMiddleware, getCategoryById);
router.post('/', authMiddleware, sellerMiddleware, createCategory);
router.patch('/:id', authMiddleware, sellerMiddleware, updateCategoryById);
router.delete('/:id', authMiddleware, sellerMiddleware, deleteCategoryById);

export default router;
