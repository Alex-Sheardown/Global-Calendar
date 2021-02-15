import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IUserModel} from '../interfaces/IUserModel';
import {STATUS_CODES} from "http";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class UserModel {
    public schema: any;
    public model: any;

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

    public deleteUser(response: any, filter: Object): any {
        let query = this.model.deleteOne(filter)
        query.exec((err, userResult) => {
            response.json(userResult)
        });
    }

    public updateUser(response: any, filter: Object, document: Object): any {
        let query = this.model.updateOne(filter, document)
        query.exec((err, userResult) => {
            response.json(userResult)
        })
    }

    public retrieveAllUsers(response: any): any {
        let query = this.model.find({isActive: true});
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }

    public retrieveUserById(response: any, filter: Object) {
        console.log('Filter passed through is:')
        console.log(filter)
        let query = this.model.findOne(filter);
        query.exec((err, userResult) => {
            response.json(userResult);
        });
    }
}

export {UserModel};
