"use strict";
exports.__esModule = true;
exports.CalendarModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var CalendarModel = /** @class */ (function () {
    function CalendarModel() {
        this.createSchema();
        this.createModel();
    }
    CalendarModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            calendarId: Number,
            events: [
                {
                    eventId: Number
                }
            ],
            name: String,
            userId: Number,
            description: String
        }, { collection: 'calendars' });
    };
    CalendarModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Calendar", this.schema);
    };
    CalendarModel.prototype.retrieveAllCalendars = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    CalendarModel.prototype.retrieveCalendarById = function (response, filter) {
        console.log('Filter passed through is:');
        console.log(filter);
        var query = this.model.findOne(filter);
        query.exec(function (err, userResult) {
            response.json(userResult);
        });
    };
    return CalendarModel;
}());
exports.CalendarModel = CalendarModel;
