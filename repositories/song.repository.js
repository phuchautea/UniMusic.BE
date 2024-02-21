const Song = require("../models/song.model");

class SongRepository {
    async getAll() {
        return Song.find().populate('album artist');
    }
    // async getFilteredSong(filters = {}) {
    //     // Construct a query based on the filters object
    //     let query = {};
    //     for (let [key, value] of Object.entries(filters)) {
    //         if (value) {
    //             query[key] = value;
    //         }
    //     }

    //     // Since it's expected to return only one, use findOne
    //     return await Song.findOne(query).populate('album genre artist');
    // }
    async getFilteredSong(filters = {}, useOr = false) {
        // Construct a query based on the filters object
        let query = useOr ? { $or: [] } : { $and: [] };
        for (let [key, value] of Object.entries(filters)) {
            if (value) {
                let condition = {};
                condition[key] = value;
                if (useOr) {
                    query.$or.push(condition);
                } else {
                    query.$and.push(condition);
                }
            }
        }

        // If no filters are provided, remove $and or $or from the query
        if (useOr && query.$or.length === 0) {
            delete query.$or;
        } else if (!useOr && query.$and.length === 0) {
            delete query.$and;
        }

        // Since it's expected to return only one, use findOne
        return await Song.findOne(query).populate('album genre artist');
    }
    async getFilteredSongs(page, perPage, filters = {}, sortOptions = {}) {
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
    
        const songs = await Song.find(query).sort(sort).skip(skip).limit(perPageNum).populate('album genre artist');
        const totalCount = await Song.countDocuments(query);
        const totalPages = Math.ceil(totalCount / perPageNum);
        const isLastPage = pageNum >= totalPages;
    
        return {
            songs,
            totalCount,
            totalPages,
            isLastPage,
            currentPage: pageNum,
        };
    }    
    
    async getSongList(page, perPage) {
        const pageNum = parseInt(page, 10);
        const perPageNum = parseInt(perPage, 10);
        const skip = (pageNum - 1) * perPageNum;

        const songs = await Song.find({}).skip(skip).limit(perPageNum).populate('album genre artist');
        const totalCount = await Song.countDocuments();
        const totalPages = Math.ceil(totalCount / perPageNum);
        const isLastPage = pageNum >= totalPages;

        return {
            songs,
            totalCount,
            totalPages,
            isLastPage,
        };
    }

    async getById(songId) {
        return Song.findById(songId).populate('album artist');
    }

    async getBySlug(songSlug) {
        return Song.findOne({ slug: songSlug}).populate('album artist');
    }

    async getByArtist(artistId) {
        return Song.find({ artist: artistId });
    }

    async findBySlug(slug) {
        return Song.findOne({ slug: slug });
    }

    async create(data) {
        return Song.create(data);
    }

    async update(songId, data) {
        return Song.findByIdAndUpdate(songId, data, { new: true });
    }

    async delete(songId) {
        return Song.findByIdAndDelete(songId);
    }
}

module.exports = new SongRepository();