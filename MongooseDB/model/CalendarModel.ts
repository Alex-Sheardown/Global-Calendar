import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {ICalendarModel} from '../interfaces/ICalendarModel';
import {STATUS_CODES} from "http";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class CalendarModel {
    public schema: any;
    public model: any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                calendarId: Number,
                events: [
                    {
                        eventId: Number
                    }
                ],
                name: String,
                userId: Number,
                description: String
            }, {collection: 'calendars'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<ICalendarModel>("Calendar", this.schema);
    }

    public updateCalendar(response: any, filter: Object, document: Object): any {
        let query = this.model.updateOne(filter, document)
        query.exec((err, calendarResult) => {
            response.json(calendarResult)
        })
    }

    public deleteCalendar(response: any, filter: Object): any {
        let query = this.model.deleteOne(filter)
        query.exec((err, calendarResult) => {
            response.json(calendarResult)
        });
    }

    public retrieveAllCalendars(response: any): any {
        let query = this.model.find({});
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }

    public retrieveCalendarById(response: any, filter: Object) {
        console.log('Filter passed through is:')
        console.log(filter)
        let query = this.model.findOne(filter);
        query.exec((err, userResult) => {
            response.json(userResult);
        });
    }
}

export {CalendarModel};
