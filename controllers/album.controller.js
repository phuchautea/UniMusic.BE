const albumService = require('../services/album.service');

class AlbumController {
    async getAlbums(req, res) {
        const albums = await albumService.getAll(req.query.page, req.query.limit);
        res.json(albums);
    }

    async getAlbum(req, res) {
        const album = await albumService.getById(req.params.id);
        res.json(album);
    }

    async getAlbumBySlug(req, res) {
        const album = await albumService.getBySlug(req.params.slug);
        res.json(album);
    }

    async getAlbumsByArtist(req, res) {
        const albums = await albumService.getByArtist(req.params.artistId, req.query.page, req.query.limit);
        res.json(albums);
    }

    async createAlbum(req, res) {
        const album = await albumService.create(req.body);
        res.json(album);
    }

    async updateAlbum(req, res) {
        const album = await albumService.update(req.params.id, req.body);
        res.json(album);
    }

    async deleteAlbum(req, res) {
        await albumService.delete(req.params.id);
        res.json({ message: 'Album deleted' });
    }
}

module.exports = new AlbumController();