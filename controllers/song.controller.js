const songService = require('../services/song.service');

class SongController {
    async getSongs(req, res) {
        const songs = await songService.getAll(req.query.page, req.query.limit);
        res.json(songs);
    }

    async getSong(req, res) {
        const song = await songService.getById(req.params.id);
        res.json(song);
    }

    // async getSongBySlug(req, res) {
    //     const song = await songService.getBySlug(req.params.slug);
    //     res.json(song);
    // }

    async getSongBySlug(req, res) {
        const song = await songService.getBySlug(req.params.slug);
        let lyrics = null;
        if (song && song.lyrics) {
            lyrics = await songService.parseLyrics(song.lyrics);
            // song.lyrics = lyrics;
        }
        res.json({data: song, rawLyrics: lyrics});
    }

    async getSongsByArtist(req, res) {
        const songs = await songService.getByArtist(req.params.artistId, req.query.page, req.query.limit);
        res.json(songs);
    }
    
    async getSongsByAlbum(req, res) {
        const songs = await songService.getByAlbum(req.params.albumId, req.query.page, req.query.limit);
        songs.songs.forEach((song) => {
            console.log(song);
        });
        res.json(songs);
    }

    async createSong(req, res) {
        const song = await songService.create(req.body);
        res.json(song);
    }

    async updateSong(req, res) {
        const song = await songService.update(req.params.id, req.body);
        res.json(song);
    }

    async deleteSong(req, res) {
        await songService.delete(req.params.id);
        res.json({ message: 'Song deleted' });
    }
}

module.exports = new SongController();