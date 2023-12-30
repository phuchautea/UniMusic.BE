const express = require('express');
const adsRoutes = require('./ads.routes');
const authRoutes = require('./auth.routes');



const router = express.Router();

router.use('/api', adsRoutes);
router.use('/api', authRoutes);

module.exports = router;
