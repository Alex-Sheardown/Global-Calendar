export interface Calendar {
  calendarId: number,
  events: [{
    eventId: number
  }],
  name: string,
  userId: number,
  description:string
}
