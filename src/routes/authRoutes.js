const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authorization');

const router = express.Router();

// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Authorization routes
router.get('/roles', authMiddleware.authenticate, authController.getRoles);
router.post('/roles', authMiddleware.authenticate, authController.createRole);
router.put('/roles/:id', authMiddleware.authenticate, authController.updateRole);

module.exports = router;
