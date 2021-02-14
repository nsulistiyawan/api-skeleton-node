import JWT from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  const accessToken = authHeaders && authHeaders.split(' ')[1];
  if (accessToken == null) {
    return res.status(401).json({
      status: 'Unauthorized',
    });
  }

  try {
    const userInfo = JWT.verify(accessToken, process.env.JWT_SECRET);
    req.userInfo = userInfo;
    return next();
  } catch (error) {
    return res.status(403).json({
      status: 'Forbidden',
    });
  }
};

export default jwtAuth;
