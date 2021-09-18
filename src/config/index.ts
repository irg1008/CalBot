import env from "dotenv";
import { Config } from "../types/Discord.types";

const path = "src/config/.env";
env.config({ path });

const config: Config = {
	token: process.env.TOKEN || "",
	clientId: process.env.CLIENT_ID || "",
	guildId: process.env.TEST_GUILD_ID || "",
	prefix: "#",
};

export default config;
