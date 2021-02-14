import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {IUserModel} from '../interfaces/IUserModel';
import { STATUS_CODES } from "http";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class UserModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                name: String,
                userId: Number,
                timeZone: String,
                startDate: Date,
                endDate: Date,
                isActive: Boolean
            }, {collection: 'users'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IUserModel>("User", this.schema);
    }


    public retrieveAllUsers(response:any): any {
        let query = this.model.find({isActive: true});
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }

    public retrieveUserById(response:any, filter:Object) {
        console.log('Filter passed through is:')
        console.log(filter)
        let query = this.model.findOne(filter);
        query.exec( (err, userResult) => {
            console.log(userResult)
            if (err) {
                console.log('error retrieving user');
            }
            else {
                if (userResult == null) {
                    response.status(404);
                    response.json('{count: -1}');
                }
                else {
                    console.log('Successfully retrieved ' + userResult.name);
                    response.json(userResult);
                }
            }
        });
    }
}
export {UserModel};
