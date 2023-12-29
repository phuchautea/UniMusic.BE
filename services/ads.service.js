const adsRepository = require("../repositories/ads.repository");

class adsService {
	async getAll() {
		return adsRepository.getAdsList(1, 10);
	}

	async getById(adId) {
		return adsRepository.getById(adId);
	}

	async create(data) {
		return adsRepository.create(data);
	}

	async update(adId, data) {
		return adsRepository.update(adId, data);
	}

	async delete(adId) {
		return adsRepository.delete(adId);
	}
}

module.exports = new adsService();
