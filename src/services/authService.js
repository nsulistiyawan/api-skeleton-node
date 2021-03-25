/* eslint-disable import/prefer-default-export */
import { compareSync } from 'bcrypt';
import JWT from 'jsonwebtoken';
import User from '../models/user';

export async function authenticate(credentials) {
  const user = await User.query().where('email', credentials.email).first();
  if (user === undefined) {
    return false;
  }
  if (!compareSync(credentials.password, user.password)) {
    return false;
  }

  // expire after 1 hour
  const accessToken = JWT.sign({
    id: user.id,
    email: user.email,
  }, process.env.JWT_SECRET, { expiresIn: '3600s' });

  return {
    user,
    accessToken,
  };
}
