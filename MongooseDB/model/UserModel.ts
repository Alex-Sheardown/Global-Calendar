import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {IUserModel} from '../interfaces/IUserModel';
import { STATUS_CODES } from "http";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class UserModel {
    public schema:any;
    public innerSchema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                userID: Number,
                username: String,
                email: String,
                // encrypted password
                events:[]
            }, {collection: 'users'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IUserModel>("User", this.schema);
    }

    /*
    public retrieveTasksDetails(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }


    public retrieveTasksCount(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, innerTaskList) => {
            if (err) {
                console.log('error retrieving count');
            }
            else {
                if (innerTaskList == null) {
                    response.status(404);
                    response.json('{count: -1}');
                }
                else {
                    console.log('number of tasks: ' + innerTaskList.tasks.length);
                    response.json('{count:' + innerTaskList.tasks.length + '}');
                }
            }
        });
    }
    */
}
export {UserModel};