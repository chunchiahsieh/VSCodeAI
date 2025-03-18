const jwt = require('jsonwebtoken');

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// RBAC middleware
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
};

// ABAC middleware
const checkAttribute = (attribute, value) => {
  return (req, res, next) => {
    if (req.user[attribute] !== value) {
      return res.status(403).json({ message: 'Access denied. Attribute condition not met.' });
    }
    next();
  };
};

// PBAC middleware
const checkPolicy = (policyFn) => {
  return (req, res, next) => {
    if (!policyFn(req.user, req)) {
      return res.status(403).json({ message: 'Access denied. Policy condition not met.' });
    }
    next();
  };
};

module.exports = {
  authenticate,
  checkRole,
  checkAttribute,
  checkPolicy
};
