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
interface CalendarEventsRes {
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
export { CalendarEventsRes };
