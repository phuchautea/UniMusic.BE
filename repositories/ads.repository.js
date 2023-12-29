const adsModel = require("../models/ads.model");

class adsRepository {
	async getAll() {
		return adsModel.find();
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
