"use strict";
exports.__esModule = true;
exports.LoginModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var LoginModel = /** @class */ (function () {
    function LoginModel() {
        this.createSchema();
        this.createModel();
    }
    LoginModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            username: String,
            userID: Number
        }, { collection: 'logins' });
    };
    LoginModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Logins", this.schema);
    };
    return LoginModel;
}());
exports.LoginModel = LoginModel;
