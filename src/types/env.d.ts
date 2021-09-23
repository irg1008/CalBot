declare namespace NodeJS {
	interface ProcessEnv {
		TOKEN: string;
		CLIENT_ID: string;
		TEST_GUILD_ID: string;
		SUPABASE_API_KEY: string;
		SUPABASE_ENDPOINT: string;
	}
}
