import { Router } from 'express';

import * as apiController from '../controllers/apiController';

const router = Router();

/**
 * GET /api
 */
router.get('/', apiController.info);

export default router;
