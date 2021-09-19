import axios from "axios";

async function getCalendarEvents(
  key: string,
  calId: string,
  query?: string,
  minDate?: Date,
  maxDate?: Date
) {
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

interface Creator {
  email: string;
}

interface Organizer {
  email: string;
  displayName: string;
  self: boolean;
}

interface EventDate {
  date: Date;
  dateTime?: Date;
  timeZone: string;
}

interface OriginalStartTime {
  date: string;
}

interface Item {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: Date;
  updated: Date;
  summary: string;
  creator: Creator;
  organizer: Organizer;
  start: EventDate;
  end: EventDate;
  transparency: string;
  sequence: number;
  eventType: string;
  description: string;
  location: string;
  recurrence: string[];
  recurringEventId: string;
  originalStartTime: OriginalStartTime;
}

export interface CalendarEventsRes {
  kind: string;
  etag: string;
  summary: string;
  description: string;
  updated: Date;
  timeZone: string;
  accessRole: string;
  defaultReminders: any[];
  nextSyncToken: string;
  items: Item[];
}

getCalendarEvents(
  "AIzaSyB6Nvvdr7EJLNo-1-LVI0gE3mX7QJMv5HY",
  "rcc5p5lpprm58409k39j6an06s%40group.calendar.google.com",
  "[NEURONAL]"
);
