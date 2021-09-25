import { table } from "console";
import moment from "moment";
import { Calendar, CalendarData } from "node-calendar-js";
import htmlToImg from "node-html-to-image";

const weekDays = ["L", "M", "X", "J", "V", "S", "D"];
const months = [
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
		// I chunk is not empty.
		if (chunk.find((day) => day.day)) {
			chunkedArray.push(chunk);
		}
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

const getHtmlWithEvents = async (
	month: number,
	year: number,
	eventDays: number[]
) => {
	const calendar = new Calendar({
		year,
		month,
	});

	calendar.holidays = [];
	calendar.days = weekDays;
	calendar.months = months;

	const cal = convertSundayToMondayFormat(calendar);
	const calWithEvents = addEventsToCalendar(cal, eventDays);
	const weeks = stripInWeeks(calWithEvents);

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

	return table;
};

const getCalendarImgWithEvents = async (months: moment.Moment[][]) => {
	let tables = "";

	for (const monthData of months) {
		const days = monthData.map((date) => date.date());
		const month = monthData[0].month();
		const year = monthData[0].year();

		tables += await getHtmlWithEvents(month, year, days);
	}

	const style = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap');

      body {
        height: auto;
				background-color: #1a1a1a;
        display: flex;
        flex-direction:row;
				flex-wrap:wrap;
        width: ${months.length === 1 ? 500 : 1000}px;
        justify-content: center;
        align-items: start;
      }

      th,
      td {
        width: 50px;
        height: 50px;
        line-height: 50px;
        border-radius: 5rem;
        margin: 8px;
      }
      
      .day {
        background-color: #2e2e2e;
        text-align: center;
      }

      .empty {
        background-color: #575757;
      }

      .event {
        background-color: #5A55F8;
        font-weight: 400;
      }

      table,
      caption {
        color: #f5f5f5;
        background-color: inherit;
        font-family: "Roboto", sans-serif;
        font-weight: 400;
      }

      table {
        padding: 10px;
        border-radious: 10px;
      }

      caption {
        height: 30px;
        line-height: 30px;
        width: 100% !important;
        font-size: 2rem;
        padding-top: 30px;
      }


      tr {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    </style> 
  `;

	const html = `
    <html>
      <head>
        ${style}
      </head>
      <body>
        ${tables}
      </body>
    </html>
  `;

	const imgBuffer = await htmlToImg({
		html,
		encoding: "base64",
		puppeteerArgs: {
			headless: true,
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		},
	});

	return imgBuffer as string;
};

export default getCalendarImgWithEvents;
