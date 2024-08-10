import express from 'express';
import {
  getAllColors,
  getColorById,
  createColor,
  updateColorById,
  deleteColorById,
} from '../controllers/colorController';
import { authMiddleware } from '../middlewares/authMiddlewares';
import { sellerMiddleware } from '../middlewares/sellerMiddilewares';

const router = express.Router();

router.get('/', authMiddleware, sellerMiddleware, getAllColors);
router.get('/:id', authMiddleware, sellerMiddleware,  getColorById);
router.post('/', authMiddleware, sellerMiddleware,  createColor);
router.patch('/:id', authMiddleware, sellerMiddleware,  updateColorById);
router.delete('/:id', authMiddleware, sellerMiddleware,  deleteColorById);

export default router;
