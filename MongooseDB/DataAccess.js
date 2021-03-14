"use strict";
exports.__esModule = true;
exports.DataAccess = void 0;
// comment
var Mongoose = require("mongoose");
var DataAccess = /** @class */ (function () {
    function DataAccess() {
        DataAccess.connect();
    }
    DataAccess.connect = function () {
        if (this.mongooseInstance)
            return this.mongooseInstance;
        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.on("open", function () {
            console.log("Connected to mongodb.");
        });
        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    };
    //static DB_CONNECTION_STRING:string = 'mongodb+srv://MrBob:helloBob@cluster0.eiq1n.mongodb.net/globalCalendar?retryWrites=true&w=majority'
    //static DB_CONNECTION_STRING:string = 'mongodb+srv://benyon:Seahawkssuck2021@calendardb.uhgwf.mongodb.net/globalCalendar?retryWrites=true&w=majority';
    //DataAccess.DB_CONNECTION_STRING = 'mongodb://dbAdmin:test@localhost:3000/globalCalendar?authSource=admin'; //in my local computer
    static DB_CONNECTION_STRING:string = 'mongodb+srv://MrBob:helloBob@cluster0.eiq1n.mongodb.net/globalCalendar?retryWrites=true&w=majority'
    return DataAccess;
}());
exports.DataAccess = DataAccess;
DataAccess.connect();
