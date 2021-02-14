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
                eventID: Number,
            }, {collection: 'events'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IEventModel>("Events", this.schema);
    }

    /*
    public retrieveAllEvents(response:any): any {
        var query = this.model.find({});
        query.exec( (err, eventArray) => {
            response.json(eventArray) ;
        });
    }

    public retrieveEventCount(response:any): any {
        console.log("retrieve Event Count ...");
        var query = this.model.estimatedDocumentCount();
        query.exec( (err, numberOfEvents) => {
            console.log("numberOfEvents: " + numberOfEvents);
            response.json(numberOfEvents) ;
        });
    }
    */
}
export {EventModel};
