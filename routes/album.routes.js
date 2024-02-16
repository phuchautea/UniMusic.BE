const express = require('express');
const albumController = require('../controllers/album.controller');

const router = express.Router();

router.get('/albums', albumController.getAlbums);
router.get('/albums/:id', albumController.getAlbum);
router.get('/albums/slug/:slug', albumController.getAlbumBySlug);
router.get('/albums/artist/:artistId', albumController.getAlbumsByArtist);
router.post('/albums', albumController.createAlbum);
router.put('/albums/:id', albumController.updateAlbum);
router.delete('/albums/:id', albumController.deleteAlbum);

module.exports = router;