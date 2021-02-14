import { check } from 'express-validator';

const validationRules = [
  check('email')
    .notEmpty()
    .withMessage('Email field is required.').bail()
    .isEmail()
    .withMessage('A valid email is required.'),
  check('password')
    .notEmpty()
    .withMessage('Password field is required.'),
];

export default validationRules;
