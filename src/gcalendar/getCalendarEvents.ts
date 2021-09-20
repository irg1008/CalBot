import axios from "axios";
import { CalendarEventsRes } from "types/GCalendar.types";

async function getCalendarEvents(
	key: string,
	calId: string,
	query?: string,
	minDate?: Date,
	maxDate?: Date
) {
	/*
		Nota: En js "" es falsy.
			if (!key) throw "Invalid Api Key";
			if (!calId) throw "Invalid Calendar Id";
	*/
	if (!key || key.length == 0) {
		throw "Invalid Api Key";
	}

	if (!calId || calId.length == 0) {
		throw "Invalid Calendar Id";
	}

	const url = `https://www.googleapis.com/calendar/v3/calendars/${calId}/events`;

	const params = {
		key: key,
		q: query,
		timeMax: maxDate?.toISOString(),
		timeMin: minDate?.toISOString(),
	};

	try {
		/*
			Nota del tonto de Iván: Puedes pasarle el tipo de la respuesta entre <type>.
				const res = await axios.get<CalendarEventsRes>(url, { params });
				const { data } = res;
 		*/

		const res = await axios.get(url, {
			params,
		});
		const data: CalendarEventsRes = res.data;

		data.updated = new Date(data.updated);

		for (const item of data.items) {
			item.created = new Date(item.created);
			item.updated = new Date(item.updated);
			item.start = {
				date: new Date(item.start.date),
				dateTime: item.start.dateTime,
				timeZone: item.start.timeZone,
			};

			item.end = {
				date: new Date(item.end.date),
				dateTime: item.end.dateTime,
				timeZone: item.end.timeZone,
			};
		}

		console.log(data);

		return data;
	} catch (err) {
		const e = err as any;
		console.log(e?.response);
	}
}

const example = () =>
	getCalendarEvents(
		"AIzaSyB6Nvvdr7EJLNo-1-LVI0gE3mX7QJMv5HY",
		"rcc5p5lpprm58409k39j6an06s%40group.calendar.google.com",
		"[NEURONAL]"
	);

export { example };
