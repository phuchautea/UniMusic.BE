const express = require('express');
const authenticateJWT = require('../middleware/jwt.middleware');
const adsController = require('../controllers/ads.controller');

const router = express.Router();

router.get('/ads', authenticateJWT(), adsController.getAll);
router.get('/ads/:id', authenticateJWT(), adsController.getById);
router.post('/ads', authenticateJWT({ requiredRole: 'admin' }), adsController.create);
router.put('/ads/:id', authenticateJWT({ requiredRole: 'admin' }), adsController.update);
router.delete('/ads/:id', authenticateJWT({ requiredRole: 'admin' }), adsController.delete);

module.exports = router;
