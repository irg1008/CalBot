const env = require("dotenv");

env.config();

module.exports = {
	token: process.env.TOKEN,
	clientId: process.env.CLIENT_ID,
};
