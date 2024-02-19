const genreRepository = require('../repositories/genre.repository');
const slugify = require('slugify');

class GenreService {
    async getAll(page = 1, limit = 10) {
        return genreRepository.getGenreList(page, limit);
    }

    async getById(genreId) {
        return genreRepository.getById(genreId);
    }

    async create(genreData) {
        let slug = slugify(genreData.name, { lower: true });
        let isUnique = false;
        let counter = 1;

        while (!isUnique) {
            const existingGenre = await genreRepository.findBySlug(slug);
            if (!existingGenre) {
                isUnique = true;
            } else {
                slug = `${slug}-${counter}`;
                counter++;
            }
        }

        genreData.slug = slug;
        return genreRepository.create(genreData);
    }

    async update(genreId, genreData) {
        return genreRepository.update(genreId, genreData);
    }

    async delete(genreId) {
        return genreRepository.delete(genreId);
    }
}

module.exports = new GenreService();