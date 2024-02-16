const albumRepository = require('../repositories/album.repository');
const slugify = require('slugify');

class AlbumService {
    async getAll(page = 1, limit = 10) {
        return albumRepository.getAlbumList(page, limit);
    }

    async getById(albumId) {
        return albumRepository.getById(albumId);
    }

    async getBySlug(albumSlug) {
        return albumRepository.getBySlug(albumSlug);
    }

    async getByArtist(artistId, page = 1, limit = 10) {
        return albumRepository.getFilteredAlbums(page, limit, { artists: artistId }, { releaseDate: -1 });
        // return songRepository.getByArtist(artistId, page, limit);
    }

    async create(albumData) {
        let slug = slugify(albumData.title, { lower: true });
        let isUnique = false;
        let counter = 1;

        while (!isUnique) {
            const existingAlbum = await albumRepository.findBySlug(slug);
            if (!existingAlbum) {
                isUnique = true;
            } else {
                slug = `${slug}-${counter}`;
                counter++;
            }
        }

        albumData.slug = slug;
        return albumRepository.create(albumData);
    }

    async update(albumId, albumData) {
        return albumRepository.update(albumId, albumData);
    }

    async delete(albumId) {
        return albumRepository.delete(albumId);
    }
}

module.exports = new AlbumService();