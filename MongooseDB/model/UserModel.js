"use strict";
exports.__esModule = true;
exports.UserModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var UserModel = /** @class */ (function () {
    function UserModel() {
        this.createSchema();
        this.createModel();
    }
    UserModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            name: String,
            userId: Number,
            timeZone: String,
            startDate: Date,
            endDate: Date,
            isActive: Boolean
        }, { collection: 'users' });
    };
    UserModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("User", this.schema);
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
            console.log(userResult);
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
    };
    return UserModel;
}());
exports.UserModel = UserModel;
