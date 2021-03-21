import { check } from 'express-validator';
import { USER_ROLE_ADMIN, USER_ROLE_USER } from '../constants';

const validationRules = [
  check('email')
    .notEmpty()
    .withMessage('Email field is required.').bail()
    .isEmail()
    .withMessage('A valid email is required.')
    .bail(),
  check('password').optional(),
  check('role').notEmpty().isIn([USER_ROLE_ADMIN, USER_ROLE_USER]),
  check('password_confirmation')
    .custom((value, { req }) => {
      if (req.body.password && value !== req.body.password) {
        throw new Error('Password confirmation field does not match password');
      }
      return true;
    }),
];

export default validationRules;
