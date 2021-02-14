import { Router } from 'express';

import * as authController from '../controllers/authController';
import authUserValidator from '../validators/authUserValidator';
import formValidation from '../middlewares/formValidation';

const router = Router();

router.post('/auth/login', [authUserValidator, formValidation], authController.login);

export default router;
