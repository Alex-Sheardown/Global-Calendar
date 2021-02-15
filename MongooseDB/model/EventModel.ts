import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {IEventModel} from '../interfaces/IEventModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class EventModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                eventId: Number,
                title: String,
                category: String,
                description: String,
                startDate: Date,
                endDate: Date,
                startTime: String,
                endTime: String
            }, {collection: 'events'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IEventModel>("Events", this.schema);
    }

    public retrieveAllEvents(response:any): any {
        let query = this.model.find({});
        query.exec( (err, eventArray) => {
            response.json(eventArray) ;
        });
    }

    public retrieveEventById(response: any, filter: Object) {
        console.log('Filter passed through is:')
        console.log(filter)
        let query = this.model.findOne(filter);
        query.exec((err, eventResult) => {
            response.json(eventResult);
        });
    }

}
export {EventModel};
