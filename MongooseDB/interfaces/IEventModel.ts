import Mongoose = require("mongoose");

interface IEventModel extends Mongoose.Document
{
    eventId: number,
    title: string,
    category: string,
    description: string,
    startDate: any,
    endDate: any,
    startTime: string,
    endTime: string
}
export {IEventModel};
