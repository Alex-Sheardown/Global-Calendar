import Mongoose = require("mongoose");

interface IEventModel extends Mongoose.Document
{
    eventID: number;
    title: string;
    category: string;
    //startDate: string; // ex: 01/12/21
    //endDate: string;   // ex: 01/14/21
    startTime: string;   // using 24hr time ex: 13:00
    endTime: string;     // using 12hr time ex: 01:00pm
    description: string;
}
export {IEventModel};