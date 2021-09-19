class GoogleCalendar {
    _calId;
    _apiKey;
    constructor(calendarId, apiKey) {
        if (!calendarId || calendarId.length == 0) {
            throw "Invalid Calendar Id";
        }
        if (!apiKey || apiKey.length == 0) {
            throw "Invalid Api Key";
        }
        this._apiKey = apiKey;
        this._calId = calendarId;
    }
    getEvents(query, minDate, maxDate) { }
}
//# sourceMappingURL=GoogleCalendar.js.map