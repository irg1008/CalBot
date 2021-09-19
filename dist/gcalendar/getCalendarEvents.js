"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.example = void 0;
const axios_1 = __importDefault(require("axios"));
async function getCalendarEvents(key, calId, query, minDate, maxDate) {
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
        const res = await axios_1.default.get(url, {
            params,
        });
        const data = res.data;
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
    }
    catch (err) {
        const e = err;
        console.log(e?.response);
    }
}
const example = () => getCalendarEvents("AIzaSyB6Nvvdr7EJLNo-1-LVI0gE3mX7QJMv5HY", "rcc5p5lpprm58409k39j6an06s%40group.calendar.google.com", "[NEURONAL]");
exports.example = example;
//# sourceMappingURL=getCalendarEvents.js.map