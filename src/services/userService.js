import { hashSync } from 'bcrypt';
import User from '../models/user';

/**
 *
 * @param {*} userId
 */
export function findById(userId) {
  return User.query().findById(userId);
}

/**
 *
 * @param {*} params
 */
export function findAll(filterParam, orderParams) {
  const filters = filterParam || [];
  const orders = orderParams || [{ column: 'created_at', order: 'desc' }];
  return User.query().where(filters).orderBy(orders);
}

/**
 *
 * @param {*} params
 */
export function findOne(filterParam, orderParams) {
  const filters = filterParam || [];
  const orders = orderParams || [{ column: 'created_at', order: 'desc' }];
  return User.query().where(filters).orderBy(orders).first();
}

/**
 *
 * @param {*} userData
 */
export function create(userData) {
  const password = hashSync(userData.password, 5);
  return User.query().insert({
    email: userData.email,
    password,
    is_active: 1,
  });
}

export function update(userId, userData) {
  const patchedData = { ...userData };
  if ('password' in patchedData) {
    patchedData.password = hashSync(patchedData.password, 5);
  }

  return User.query().patchAndFetchById(userId, patchedData);
}

export function deleteById(userId) {
  return User.query().deleteById(userId);
}
