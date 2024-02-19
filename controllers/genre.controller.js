const genreService = require('../services/genre.service');

class GenreController {
    async getGenres(req, res) {
        const genres = await genreService.getAll(req.query.page, req.query.limit);
        res.json(genres);
    }

    async getGenre(req, res) {
        const genre = await genreService.getById(req.params.id);
        res.json(genre);
    }

    async createGenre(req, res) {
        const genre = await genreService.create(req.body);
        res.json(genre);
    }

    async updateGenre(req, res) {
        const genre = await genreService.update(req.params.id, req.body);
        res.json(genre);
    }

    async deleteGenre(req, res) {
        await genreService.delete(req.params.id);
        res.json({ message: 'Genre deleted' });
    }
}

module.exports = new GenreController();