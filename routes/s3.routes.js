// s3.routes.js
const express = require('express');
const router = express.Router();
const s3Controller = require('../controllers/s3.controller');
const multer = require('multer');
const path = require('path');
var normalizeName = require('normalize-name')
const generateRandomString = require('../utils/randomString');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const fileName = file.originalname.replace(ext, '');
        cb(null, normalizeName(fileName) + '_' + generateRandomString(10) + ext);
    }
});

const upload = multer({ storage: storage });

router.post('/s3/upload', upload.single('file'), s3Controller.uploadFile);

module.exports = router;