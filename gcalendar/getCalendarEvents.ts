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
    // Nota de iván:
    /*
    Creo que puedes hacer:
    
      const res = await axios.get(url, params);
      
    Ya que json está por defecto.
    */
    const res = await axios({
      url,
      method: "get",
      headers: { Accept: "application/json" },
      params,
    });
    console.log(res.data.items);
  } catch (err) {
    const e = err as any;
    console.log(e?.response);
  }
}

interface response {}

getCalendarEvents(
  "AIzaSyB6Nvvdr7EJLNo-1-LVI0gE3mX7QJMv5HY",
  "rcc5p5lpprm58409k39j6an06s%40group.calendar.google.com",
  "[NEURONAL]"
);
