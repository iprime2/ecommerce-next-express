import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import sessionMiddleware from './config/session';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import sizeRoutes from './routes/sizeRoutes';
import colorRoutes from './routes/colorRoutes';

dotenv.config();
const app = express();
const cors = require('cors');

app.use(morgan('combined'));

// Security: Helmet helps secure Express apps by setting various HTTP headers.
app.use(helmet());

const corsOptions = {
  origin: 'https://ecommerce-next-express.vercel.app/',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

app.use(sessionMiddleware);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
});

app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/sizes', sizeRoutes);
app.use('/api/colors', colorRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Up and Ruuning!!');
});

export default app;
