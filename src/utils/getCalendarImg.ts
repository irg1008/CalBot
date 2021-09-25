import moment from "moment";
import { Calendar, CalendarData } from "node-calendar-js";
import htmlToImg from "node-html-to-image";

const convertSundayToMondayFormat = (calendar: Calendar) => {
	const json = calendar.toJSON();

	let { days } = json;

	const emptyDay = {
		row: 0,
		day: null,
		name: null,
		holiday: false,
	};

	// If shift removes the day. Add empty week.
	if (days[0].day !== null) {
		const emptyWeek = Array(7).fill(emptyDay);
		days = [...emptyWeek, ...days];
	}

	days.shift();
	days.push(emptyDay);
	json.days = days;
	return json;
};

const stripInWeeks = (calendarData: CalendarData) => {
	let { days } = calendarData;

	const chunkedArray: typeof days[] = [];

	for (let i = 0; i < days.length; i += 7) {
		const chunk = days.slice(i, i + 7);
		chunkedArray.push(chunk);
	}

	return chunkedArray;
};

const addEventsToCalendar = (
	calendarData: CalendarData,
	eventDays: number[]
) => {
	calendarData.days.forEach((day) => {
		if (eventDays.includes(day.day)) day.holiday = true;
	});
	return calendarData;
};

const getCalendarImgWithEvents = async (
	month: number,
	year: number,
	eventDays: number[]
) => {
	const calendar = new Calendar({
		year,
		month,
	});

	calendar.holidays = [];
	calendar.days = ["L", "M", "X", "J", "V", "S", "D"];
	calendar.months = [
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre",
	];

	const cal = convertSundayToMondayFormat(calendar);
	const calWithEvents = addEventsToCalendar(cal, eventDays);
	const weeks = stripInWeeks(calWithEvents);

	const style = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

    body {
      height: ${weeks.length === 5 ? "380" : "440"}px;
      width: 400px;
    }

    th,
    td {
      width: 40px;
      height: 40px;
      line-height: 40px;
      border-radius: 5rem;
      margin: 5px;
    }

    .day {
      background-color: #2e2e2e;
      text-align: center;
    }

    .empty {
      background-color: #575757;
    }

    .event {
      color: #1a1a1a;
      background-color: #1AA9E8;
    }

    table,
    caption {
      color: #f5f5f5;
      background-color: #1a1a1a;
      font-family: "Roboto", sans-serif;
    }

    caption {
      height: 50px;
      line-height: 50px;
      width: 100% !important;
      trasnform: uppercase;
      font-size: 2rem;
    }

    table {
      width: 100%;
      height: 100%;
    }

    tr {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  </style>  
`;

	const table = `
    <table>
      <caption>${calendar.months[cal.month]}${" "}${cal.year}</caption>
      <thead>
        <tr>
          ${calendar.days.map((day) => `<th>${day}</th>`).join("\n")}
        </tr>
      </thead>
      <tbody>
      ${weeks
				.map(
					(week) => `
          <tr>
            ${week
							.map(
								(day) =>
									`<td class="${day.holiday ? "event" : ""} day ${
										!day.day ? "empty" : ""
									}">
                    ${day.day || ""}
                  </td>`
							)
							.join("\n")}
          </tr>
        `
				)
				.join("\n")}
      </tbody>
    </table>
  `;

	const html = `
    <html>
      <head>
        ${style}
      </head>
      <body>
        ${table}
      </body>
    </html>
  `;

	const imgBuffer = await htmlToImg({
		html,
		encoding: "base64",
	});

	return imgBuffer as string;
};

export default getCalendarImgWithEvents;
