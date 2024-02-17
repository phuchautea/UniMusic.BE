const Artist = require("../models/artist.model");

class ArtistRepository {
    async getAll() {
        return Artist.find();
    }

    async getArtistList(page, perPage) {
        const pageNum = parseInt(page, 10);
        const perPageNum = parseInt(perPage, 10);
        const skip = (pageNum - 1) * perPageNum;

        const artists = await Artist.find({}).skip(skip).limit(perPageNum);
        const totalCount = await Artist.countDocuments();
        const totalPages = Math.ceil(totalCount / perPageNum);
        const isLastPage = pageNum >= totalPages;

        return {
            artists,
            totalCount,
            totalPages,
            isLastPage,
        };
    }

    async getById(artistId) {
        return Artist.findById(artistId);
    }

    async findBySlug(slug) {
        return Artist.findOne({ slug: slug });
    }

    async search(query) {
        return Artist.find({ name: { $regex: query, $options: 'i' } });
    }

    async create(data) {
        return Artist.create(data);
    }

    async update(artistId, data) {
        return Artist.findByIdAndUpdate(artistId, data, { new: true });
    }

    async delete(artistId) {
        return Artist.findByIdAndDelete(artistId);
    }
}

module.exports = new ArtistRepository();