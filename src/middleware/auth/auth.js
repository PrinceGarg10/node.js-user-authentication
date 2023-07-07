const jwt = require('jsonwebtoken');
const userService = require('../../services/user')

function authMiddleware(req, res, next) {
  // Check if the request has the Authorization header
  const token = req.headers.authorization
      .replace('Bearer ', '')
      .trim()

  if (token) {
    // Verify and decode the token
    jwt.verify(token, process.env.JWT_SECERT, async (err, decoded) => {
      if (err) {
        // Invalid token
        return res.status(401).json({ message: 'Invalid token' });
      }
      // Valid token
      const userId = decoded.id
      req.user = await userService.findOneUserByQuery({
        _id: userId
      });
      next();
    });
  } else {
    // No token provided
    return res.status(401).json({ message: 'No token provided' });
  }
}

module.exports = authMiddleware;
