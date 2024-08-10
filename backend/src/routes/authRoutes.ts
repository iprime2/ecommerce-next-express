import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

router.post('/login', login);
router.post('/register', register); 
router.post('/logout', register); 

export default router;
