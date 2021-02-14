import Mongoose = require("mongoose");

interface ICalendarModel extends Mongoose.Document
{
    calendarId: number,
    events: [{
        eventId: number
    }],
    name: string,
    userId: number,
    description:string
}
export {ICalendarModel};
