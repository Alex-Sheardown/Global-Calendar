"use strict";
exports.__esModule = true;
exports.UserModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var UserModel = /** @class */ (function () {
    function UserModel() {
        this.createSchema();
        this.createModel();
    }
    UserModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            userId: Number,
            name: String,
            email: String,
            password: String,
            timeZone: String,
            startDate: Date,
            endDate: Date,
            isActive: Boolean
        }, { collection: 'users' });
    };
    UserModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("User", this.schema);
    };
    UserModel.prototype.deleteUser = function (response, filter) {
        var query = this.model.deleteOne(filter);
        query.exec(function (err, userResult) {
            response.json(userResult);
        });
    };
    UserModel.prototype.updateUser = function (response, filter, document) {
        var query = this.model.updateOne(filter, document);
        query.exec(function (err, userResult) {
            response.json(userResult);
        });
    };
    UserModel.prototype.retrieveAllUsers = function (response) {
        var query = this.model.find({ isActive: true });
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    UserModel.prototype.retrieveUserById = function (response, filter) {
        console.log('Filter passed through is:');
        console.log(filter);
        var query = this.model.findOne(filter);
        query.exec(function (err, userResult) {
            response.json(userResult);
        });
    };
    UserModel.prototype.retrieveUserByName = function (response, filter) {
        console.log('Filter passed through is:');
        console.log(filter);
        var query = this.model.findOne(filter);
        query.exec(function (err, userResult) {
            response.json(userResult);
        });
    };
    UserModel.prototype.retrieveUserByEmail = function (response, filter) {
        console.log('Filter passed through is:');
        console.log(filter);
        var query = this.model.findOne(filter);
        query.exec(function (err, userResult) {
            response.json(userResult);
        });
    };
    UserModel.prototype.retrieveUserByNameandPassword = function (response, filter) {
        console.log('Filter passed through is:');
        console.log(filter);
        var query = this.model.findOne(filter);
        query.exec(function (err, userResult) {
            response.json(userResult);
        });
    };
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
    UserModel.prototype.findUserByName = function (response, filter) {
        console.log('Filter passed through is:');
        console.log(filter);
        var query = this.model.findOne(filter);
        //console.log(query)
        if (query) {
            var rememberUser = { "result": 0 };
            response.json(rememberUser);
            return 0;
        }
        else {
            //console.log(filter)
            var rememberUser = { "result": 1 };
            response.json(query);
            return 1;
        }
        return 4;
    };
    return UserModel;
}());
exports.UserModel = UserModel;
