const artistService = require('../services/artist.service');

module.exports = {
    createArtist: async (req, res) => {
        const artist = await artistService.create(req.body);
        res.status(201).send(artist);
    },
    getArtistById: async (req, res) => {
        const artist = await artistService.getById(req.params.id);
        res.send(artist);
    },
    getArtistBySlug: async (req, res) => {
        const artist = await artistService.getBySlug(req.params.slug);
        res.send(artist);
    },
    searchArtists: async (req, res) => {
        const artists = await artistService.search(req.query.q);
        res.send(artists);
    },
    getArtists: async (req, res) => {
        const artists = await artistService.getAll(req.query.page, req.query.limit);
        res.send(artists);
    },
    updateArtist: async (req, res) => {
        const artist = await artistService.update(req.params.id, req.body);
        res.send(artist);
    },
    deleteArtist: async (req, res) => {
        await artistService.delete(req.params.id);
        res.status(204).send();
    },
};