import express from 'express';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import { errorHandler, notFound } from './middleware/errors.js';

const app = express();
app.use(express.json({ limit: '8mb' }));
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
