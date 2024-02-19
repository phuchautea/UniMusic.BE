const express = require('express');
const genreController = require('../controllers/genre.controller');

const router = express.Router();

router.get('/genres', genreController.getGenres);
router.get('/genres/:id', genreController.getGenre);
router.post('/genres', genreController.createGenre);
router.put('/genres/:id', genreController.updateGenre);
router.delete('/genres/:id', genreController.deleteGenre);

module.exports = router;