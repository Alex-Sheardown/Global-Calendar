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
            eventID: Number
        }, { collection: 'events' });
    };
    EventModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Events", this.schema);
    };
    return EventModel;
}());
exports.EventModel = EventModel;
