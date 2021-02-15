import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {ILoginModel} from '../interfaces/ILoginModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class LoginModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                username: String,
                userID: Number
            }, {collection: 'logins'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<ILoginModel>("Logins", this.schema);
    }

    public deleteLogin(response: any, filter: Object): any {
        let query = this.model.deleteOne(filter)
        query.exec((err, loginResult) => {
            response.json(loginResult)
        });
    }
}
export {LoginModel};
