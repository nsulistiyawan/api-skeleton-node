import * as authService from '../services/authService';

export async function refresh(req, res) {
  return res.json({
    status: 'success',
  });
}

export async function login(req, res) {
  try {
    const credentials = {
      email: req.body.email,
      password: req.body.password,
    };

    const loginResults = await authService.authenticate(credentials);
    if (loginResults === false) {
      return res.status(403).json({
        status: 'invalid_credentials',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: loginResults,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'errors',
      errors: error,
    });
  }
}
