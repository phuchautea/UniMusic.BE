const artistRepository = require('../repositories/artist.repository');
const slugify = require('slugify');

class ArtistService {
    async getAll(page = 1, limit = 10) {
        return artistRepository.getArtistList(page, limit);
    }
    
    async getById(artistId) {
        return artistRepository.findById(artistId);
    }

    async getBySlug(artistSlug) {
        return artistRepository.findBySlug(artistSlug);
    }

    async search(query) {
        return artistRepository.search(query);
    }

    async create(artistData) {
        let slug = slugify(artistData.name, { lower: true });
        let isUnique = false;
        let counter = 1;

        while (!isUnique) {
            const existingArtist = await artistRepository.findBySlug(slug);
            if (!existingArtist) {
                isUnique = true;
            } else {
                slug = `${slug}-${counter}`;
                counter++;
            }
        }

        artistData.slug = slug;
        return artistRepository.create(artistData);
    }

    async update(artistId, artistData) {
        return artistRepository.update(artistId, artistData);
    }

    async delete(artistId) {
        return artistRepository.delete(artistId);
    }
}

module.exports = new ArtistService();