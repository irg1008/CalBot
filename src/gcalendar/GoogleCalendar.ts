class GoogleCalendar {
  _calId: string;
  _apiKey: string;

  constructor(calendarId: string, apiKey: string) {
    if (!calendarId || calendarId.length == 0) {
      throw "Invalid Calendar Id";
    }

    if (!apiKey || apiKey.length == 0) {
      throw "Invalid Api Key";
    }

    this._apiKey = apiKey;
    this._calId = calendarId;
  }

  getEvents(query?: string, minDate?: Date, maxDate?: Date) {}
}
