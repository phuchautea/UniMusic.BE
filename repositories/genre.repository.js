const Genre = require("../models/genre.model");

class GenreRepository {
    async getAll() {
        return Genre.find();
    }

    async getGenreList(page, perPage) {
        const pageNum = parseInt(page, 10);
        const perPageNum = parseInt(perPage, 10);
        const skip = (pageNum - 1) * perPageNum;

        const genres = await Genre.find({}).skip(skip).limit(perPageNum);
        const totalCount = await Genre.countDocuments();
        const totalPages = Math.ceil(totalCount / perPageNum);
        const isLastPage = pageNum >= totalPages;

        return {
            genres,
            totalCount,
            totalPages,
            isLastPage,
        };
    }

    async getById(genreId) {
        return Genre.findById(genreId);
    }

    async findBySlug(slug) {
        return Genre.findOne({ slug: slug });
    }

    async create(data) {
        return Genre.create(data);
    }

    async update(genreId, data) {
        return Genre.findByIdAndUpdate(genreId, data, { new: true });
    }

    async delete(genreId) {
        return Genre.findByIdAndDelete(genreId);
    }
}

module.exports = new GenreRepository();