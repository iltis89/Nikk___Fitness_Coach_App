import { Router, Request, Response } from 'express';
import authRoutes from './auth';
import clientRoutes from './clients';
import measurementRoutes from './measurements';
import { authenticate } from '../middlewares/auth';

const router = Router();

// Public routes
router.use('/auth', authRoutes);

// Protected routes
router.use('/clients', authenticate, clientRoutes);
router.use('/measurements', authenticate, measurementRoutes);

// API info
router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      name: 'NV Coaching API',
      version: '1.0.0',
      endpoints: {
        auth: '/api/v1/auth',
        clients: '/api/v1/clients',
        measurements: '/api/v1/measurements'
      }
    }
  });
});

export default router;