import { CronJob } from "cron";

import { Timezone } from "google-calendar-node-api/dist/types/Timezone.types";
const timezone: Timezone = "Europe/Madrid";

const createJob = (fn: () => void, cronString: string) =>
	new CronJob(cronString, fn, null, null, timezone);

export default createJob;
