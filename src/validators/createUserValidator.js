import { check } from 'express-validator';
import { USER_ROLE_ADMIN, USER_ROLE_USER } from '../constants';
import * as UserService from '../services/userService';

const validationRules = [
  check('email')
    .notEmpty()
    .withMessage('Email field is required.').bail()
    .isEmail()
    .withMessage('A valid email is required.')
    .bail()
    .custom(async (value) => {
      const response = await UserService.findOne({
        email: value,
      });
      if (response) {
        throw new Error('Email already exists.');
      }
      return true;
    }),
  check('role').notEmpty().isIn([USER_ROLE_ADMIN, USER_ROLE_USER]),
  check('password').notEmpty().withMessage('Password field is required.'),
  check('password_confirmation')
    .notEmpty().withMessage('Password confirmation field is required.').bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation field does not match password');
      }
      return true;
    }),
];

export default validationRules;
