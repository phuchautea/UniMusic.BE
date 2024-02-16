const Album = require("../models/album.model");

class AlbumRepository {
    async getAll() {
        return Album.find();
    }

    async getAlbumList(page, perPage) {
        const pageNum = parseInt(page, 10);
        const perPageNum = parseInt(perPage, 10);
        const skip = (pageNum - 1) * perPageNum;

        const albums = await Album.find({}).skip(skip).limit(perPageNum);
        const totalCount = await Album.countDocuments();
        const totalPages = Math.ceil(totalCount / perPageNum);
        const isLastPage = pageNum >= totalPages;

        return {
            albums,
            totalCount,
            totalPages,
            isLastPage,
        };
    }

    async getFilteredAlbums(page, perPage, filters = {}, sortOptions = {}) {
        const pageNum = parseInt(page, 10) || 1;
        const perPageNum = parseInt(perPage, 10) || 10;
        const skip = (pageNum - 1) * perPageNum;
    
        // Construct a query based on the filters object
        let query = {};
        for (let [key, value] of Object.entries(filters)) {
            if (value) {
                query[key] = value;
            }
        }
    
        // Apply sorting if sortOptions is not empty
        let sort = {};
        if (Object.keys(sortOptions).length) {
            sort = sortOptions; // e.g., { createdAt: -1 }
        }
    
        const albums = await Album.find(query).sort(sort).skip(skip).limit(perPageNum);
        const totalCount = await Album.countDocuments(query);
        const totalPages = Math.ceil(totalCount / perPageNum);
        const isLastPage = pageNum >= totalPages;
    
        return {
            albums,
            totalCount,
            totalPages,
            isLastPage,
        };
    }    

    async getById(albumId) {
        return Album.findById(albumId);
    }

    async getBySlug(albumSlug) {
        return Album.findOne({ slug: albumSlug});
    }

    async getByArtist(artistId) {
        return Album.find({ _id: artistId});
    }

    async findBySlug(slug) {
        return Album.findOne({ slug: slug });
    }

    async create(data) {
        return Album.create(data);
    }

    async update(albumId, data) {
        return Album.findByIdAndUpdate(albumId, data, { new: true });
    }

    async delete(albumId) {
        return Album.findByIdAndDelete(albumId);
    }
}

module.exports = new AlbumRepository();