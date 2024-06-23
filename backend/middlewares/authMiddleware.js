const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ result: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, 'jwtsecret1');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ result: 'Token is not valid' });
  }
};
