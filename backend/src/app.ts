import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
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
const port = process.env.PORT || 3000;

app.use(morgan('combined'));

// Security: Helmet helps secure Express apps by setting various HTTP headers.
app.use(helmet());

// CORS: Enables Cross-Origin Resource Sharing.
app.use(cors());

// Apply session management middleware
app.use(sessionMiddleware);

// Body Parser: Parses incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rate Limiting: Limits the number of requests per window of time to prevent abuse.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Use all routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/sizes', sizeRoutes);
app.use('/api/colors', colorRoutes);

// Basic Route Example
app.get('/', (req: Request, res: Response) => {
    res.send('Up and Ruuning!!');
});

export default app;