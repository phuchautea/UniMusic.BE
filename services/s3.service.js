const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');
const path = require('path');

// Configure AWS SDK
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

class S3Service {
    async uploadFile(filePath) {
        const fileName = path.basename(filePath);
        const fileContent = fs.readFileSync(filePath);

        const ext = path.extname(filePath);

        let folderType;
        let domainResult = process.env.CLOUDFRONT_DOMAIN;
        if (ext === '.mp3') {
            folderType = 'sounds';
        } else if (ext === '.lrc') {
            folderType = 'lyrics';
            domainResult = process.env.S3_DOMAIN;
        } else if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
            folderType = 'images';
        } else {
            folderType = 'undentified';
        }
        // const randomString = Math.random().toString(36).substring(7);
        // const newFileName = randomString + '_' + fileName;

        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `${process.env.AWS_FOLDER_PATH}/${folderType}/${fileName}`, // Add AWS_FOLDER_PATH
            Body: fileContent
        };

        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        // Delete file from /uploads folder
        fs.unlinkSync(filePath);
        return `https://${domainResult}/${process.env.AWS_FOLDER_PATH}/${folderType}/${encodeURIComponent(fileName)}`;
        // return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_FOLDER_PATH}/${encodeURIComponent(fileName)}`; // Fix AWS_FOLDER_PATH
    }
}

module.exports = new S3Service();