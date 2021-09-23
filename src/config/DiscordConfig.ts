import { Config } from "types/Discord.types";
import env from "dotenv";

const path = ".env";
env.config({ path });

const defaultPrefix = "!";

const config: Config = {
	token: process.env.TOKEN,
	clientId: process.env.CLIENT_ID,
	testGuildId: process.env.TEST_GUILD_ID,
	prefix: defaultPrefix,
};

export default config;
