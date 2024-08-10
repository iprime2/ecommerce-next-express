import express from 'express';
import {
  getAllSizes,
  getSizeById,
  createSize,
  updateSizeById,
  deleteSizeById,
} from '../controllers/sizeController';
import { authMiddleware } from '../middlewares/authMiddlewares';
import { sellerMiddleware } from '../middlewares/sellerMiddilewares';

const router = express.Router();

router.get('/', authMiddleware, sellerMiddleware, getAllSizes);
router.get('/:id', authMiddleware, sellerMiddleware, getSizeById);
router.post('/', authMiddleware, sellerMiddleware, createSize);
router.patch('/:id', authMiddleware, sellerMiddleware, updateSizeById);
router.delete('/:id', authMiddleware, sellerMiddleware, deleteSizeById);

export default router;
