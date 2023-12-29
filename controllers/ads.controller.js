const adsService = require("../services/ads.service");

class adsController {
	async getAll(req, res) {
		const ads = await adsService.getAll();
		res.json(ads);
	}

	async getById(req, res) {
		const { id } = req.params;
		const ad = await adsService.getById(id);
		res.json(ad);
	}

	async create(req, res) {
		const adData = req.body;
		const newAd = await adsService.create(adData);
		res.json(newAd);
	}

	async update(req, res) {
		const { id } = req.params;
		const adData = req.body;
		const updatedAd = await adsService.update(id, adData);
		res.json(updatedAd);
	}

	async delete(req, res) {
		const { id } = req.params;
		await adsService.delete(id);
		res.json({ message: "Ad deleted successfully" });
	}
}

module.exports = new adsController();
