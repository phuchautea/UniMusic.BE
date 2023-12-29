const adsModel = require("../models/ads.model");

class adsRepository {
	async getAll() {
		return adsModel.find();
	}

	async getAdsList(page, perPage) {
		const pageNum = parseInt(page, 10);
		const perPageNum = parseInt(perPage, 10);
		const skip = (pageNum - 1) * perPageNum;

		const ads = await adsModel.find({}).skip(skip).limit(perPageNum);
		const totalCount = await adsModel.countDocuments();
		const totalPages = Math.ceil(totalCount / perPageNum);
		const isLastPage = pageNum >= totalPages;

		return {
			ads,
			totalCount,
			totalPages,
			isLastPage,
		};
	}

	async getById(adId) {
		return adsModel.findById(adId);
	}

	async create(data) {
		return adsModel.create(data);
	}

	async update(adId, data) {
		return adsModel.findByIdAndUpdate(adId, data, { new: true });
	}

	async delete(adId) {
		return adsModel.findByIdAndDelete(adId);
	}
}

module.exports = new adsRepository();
