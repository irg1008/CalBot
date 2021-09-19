declare class GoogleCalendar {
    _calId: string;
    _apiKey: string;
    constructor(calendarId: string, apiKey: string);
    getEvents(query?: string, minDate?: Date, maxDate?: Date): void;
}
