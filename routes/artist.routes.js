const express = require('express');
const artistController = require('../controllers/artist.controller');

const router = express.Router();

router.get('/artists', artistController.getArtists);
router.get('/artists/:id', artistController.getArtistById);
router.get('/artists/slug/:slug', artistController.getArtistBySlug);
router.get('/artists/search', artistController.searchArtists);
router.post('/artists', artistController.createArtist);
router.put('/artists/:id', artistController.updateArtist);
router.delete('/artists/:id', artistController.deleteArtist);

module.exports = router;