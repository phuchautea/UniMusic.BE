const express = require('express');
const authenticateJWT = require('../middleware/jwt.middleware');
const songController = require('../controllers/song.controller');

const router = express.Router();

router.get('/songs', songController.getSongs);
router.get('/songs/:id', songController.getSong);
router.get('/songs/slug/:slug', songController.getSongBySlug);
router.get('/songs/artist/:artistId', songController.getSongsByArtist);
router.get('/songs/album/:albumId', songController.getSongsByAlbum);
router.post('/songs', songController.createSong);
router.put('/songs/:id', songController.updateSong);
// router.put('/songs/:id', authenticateJWT({ requiredRole: 'admin' }), songController.updateSong);
// router.delete('/songs/:id', authenticateJWT({ requiredRole: 'admin' }), songController.deleteSong);

module.exports = router;