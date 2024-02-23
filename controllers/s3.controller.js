// s3.controller.js
const s3Service = require('../services/s3.service');

class S3Controller {
    async uploadFile(req, res) {
        const filePath = req.file.path;
        const fileUrl = await s3Service.uploadFile(filePath);
        res.json({ url: fileUrl });
    }
}

module.exports = new S3Controller();