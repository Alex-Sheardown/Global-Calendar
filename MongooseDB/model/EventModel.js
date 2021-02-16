"use strict";
exports.__esModule = true;
exports.EventModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var EventModel = /** @class */ (function () {
    function EventModel() {
        this.createSchema();
        this.createModel();
    }
    EventModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            eventId: Number,
            title: String,
            category: String,
            description: String,
            startDate: Date,
            endDate: Date,
            startTime: String,
            endTime: String
        }, { collection: 'events' });
    };
    EventModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Events", this.schema);
    };
    EventModel.prototype.deleteEvent = function (response, filter) {
        var query = this.model.deleteOne(filter);
        query.exec(function (err, eventResult) {
            response.json(eventResult);
        });
    };
    EventModel.prototype.updateEvent = function (response, filter, document) {
        var query = this.model.updateOne(filter, document);
        query.exec(function (err, eventResult) {
            response.json(eventResult);
        });
    };
    EventModel.prototype.retrieveAllEvents = function (response) {
        var query = this.model.find({});
        query.exec(function (err, eventArray) {
            response.json(eventArray);
        });
    };
    EventModel.prototype.retrieveEventById = function (response, filter) {
        console.log('Filter passed through is:');
        console.log(filter);
        var query = this.model.findOne(filter);
        query.exec(function (err, eventResult) {
            response.json(eventResult);
        });
    };
    return EventModel;
}());
exports.EventModel = EventModel;
