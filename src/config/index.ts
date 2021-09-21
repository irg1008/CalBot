import env from "dotenv";
import { Config } from "types/Discord.types";

const path = ".env";
env.config({ path });

const config: Config = {
	token: process.env.TOKEN,
	clientId: process.env.CLIENT_ID,
	testGuildId: process.env.TEST_GUILD_ID,
	prefix: "#",
};

const googleAPIKey = process.env.GOOGLE_API_KEY;

export { googleAPIKey };
export default config;
