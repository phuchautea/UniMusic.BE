require('dotenv').config();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const cluster = process.env.MONGODB_CLUSTER;
const databaseName = process.env.MONGODB_DATABASE_NAME;

if (!username || !password || !cluster || !databaseName) {
    console.error('Missing MongoDB connection information in environment variables.');
    process.exit(1);
}

module.exports = {
	url: `mongodb+srv://${username}:${password}@${cluster}/${databaseName}`,
	options: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
};
