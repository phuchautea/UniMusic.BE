const express = require('express');
const adsRoutes = require('./ads.routes');
const authRoutes = require('./auth.routes');
const songRoutes = require('./song.routes');
const artistRoutes = require('./artist.routes');
const albumRoutes = require('./album.routes');
const genreRoutes = require('./genre.routes');
const s3Routes = require('./s3.routes');


const router = express.Router();

router.use('/api', adsRoutes);
router.use('/api', authRoutes);
router.use('/api', songRoutes);
router.use('/api', artistRoutes);
router.use('/api', albumRoutes);
router.use('/api', genreRoutes);
router.use('/api', s3Routes);


module.exports = router;
