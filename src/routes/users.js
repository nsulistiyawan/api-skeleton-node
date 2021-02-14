import { Router } from 'express';

import * as userController from '../controllers/userController';
import createUserValidator from '../validators/createUserValidator';
import updateUserValidator from '../validators/updateUserValidator';

import formValidation from '../middlewares/formValidation';
import jwtAuth from '../middlewares/jwtAuth';

const router = Router();

router.get('/users', [jwtAuth], userController.listUser);

router.post('/users', [jwtAuth, createUserValidator, formValidation], userController.createUser);

router.get('/users/:id', [jwtAuth], userController.detailUser);

router.put('/users/:id', [jwtAuth, updateUserValidator, formValidation], userController.updateUser);

router.delete('/users/:id', [jwtAuth], userController.deleteUser);

export default router;
