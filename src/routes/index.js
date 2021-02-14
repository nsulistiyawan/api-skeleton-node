import { Router } from 'express';

import apiRoutes from './api';
import userRoutes from './users';
import authRoutes from './auth';

const router = Router();

router.use('/', apiRoutes);
router.use('/api', userRoutes);
router.use('/api', authRoutes);

export default router;
