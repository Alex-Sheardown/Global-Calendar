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
                userId:     Number,
                name:       String,
                email:      String,
                password:   String,
                timeZone:   String,
                startDate:  Date,
                endDate:    Date,
                isActive:   Boolean,
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

    public retrieveUserByName(response: any, filter: Object) {
        console.log('Filter passed through is:')
        console.log(filter)
        let query = this.model.findOne(filter);
        query.exec((err, userResult) => {
            response.json(userResult);
        });
    }

    public retrieveUserByEmail(response: any, filter: Object) {
        console.log('Filter passed through is:')
        console.log(filter)
        let query = this.model.findOne(filter);
        query.exec((err, userResult) => {
            response.json(userResult);
        });
    }

    public retrieveUserByNameandPassword(response: any, filter: Object) {
        console.log('Filter passed through is:')
        console.log(filter)
        let query = this.model.findOne(filter);
        
        query.exec((err, userResult) => {
            response.json(userResult);
        });
    }

    /*
    public async retrieveUserByEmail2(response: any, filter: Object):Promise<number> {
        console.log('Filter passed through is:')
        console.log(filter)
        let query = this.model.findOne(filter);
        let result
        
        
        await query.exec((err, userResult) => {
            //result = userResult
            response.json(userResult);
            //console.log(result.length)
            
            //response.json(userResult);
            console.log(userResult)
            console.log("Right before if else")
            if(userResult === null){
                console.log("return 0")
                result = 0
            }else{
                console.log("return 1")
                result = 1
            }
        });
        
        console.log("what query holds: " + result)
        //console.log("What is being returned 0 is null 1 is something: " + hold )

        return result
    }
    */
   
    findUserByName (response: any, filter: Object): number {
        
        console.log('Filter passed through is:')
        console.log(filter)
        let query = this.model.findOne(filter);
        //console.log(query)
        if (query){
            const rememberUser:JSON = <JSON><unknown>{ "result": 0 }
            response.json(rememberUser);
            return 0
        }else{
            //console.log(filter)
            const rememberUser:JSON = <JSON><unknown>{ "result": 1 }
            response.json(query);
            return 1
        }
            
        
        return 4
    }
}

export {UserModel};
