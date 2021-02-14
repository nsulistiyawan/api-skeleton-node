import * as UserService from '../services/userService';

/**
 * List of existing users.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function listUser(req, res) {
  try {
    const users = await UserService.findAll();
    return res.status(200).json({
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'errors',
      errors: error,
    });
  }
}

/**
 * Create a new user.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function createUser(req, res) {
  try {
    const user = await UserService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'errors',
      errors: error,
    });
  }
}

/**
 * Find user data by their id.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function detailUser(req, res) {
  try {
    const user = await UserService.findById(req.params.id);
    if (user === undefined) {
      return res.status(404).json({
        status: 'not_found',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'errors',
      errors: error,
    });
  }
}

/**
 * Update user data by their id.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function updateUser(req, res) {
  try {
    const userData = {
      email: req.body.email,
    };
    if (req.body.password) {
      userData.password = req.body.password;
    }

    const user = await UserService.update(req.params.id, userData);

    return res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'errors',
      errors: error,
    });
  }
}

/**
 * Delete user by their id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function deleteUser(req, res) {
  try {
    const user = await UserService.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: 'success',
      });
    }

    await UserService.deleteById(req.params.id);
    return res.status(204).json({
      status: 'success',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'errors',
      errors: error,
    });
  }
}
