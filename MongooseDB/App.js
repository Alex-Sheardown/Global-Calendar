"use strict";
exports.__esModule = true;
exports.App = void 0;
//import * as path from 'path';
var express = require("express");
var logger = require("morgan");
//import * as mongodb from 'mongodb';
//import * as url from 'url';
var bodyParser = require("body-parser");
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');
var EventModel_1 = require("./model/EventModel");
var UserModel_1 = require("./model/UserModel");
var CalendarModel_1 = require("./model/CalendarModel");
//import {DataAccess} from './DataAccess';
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.idGenerator = 102;
        this.Events = new EventModel_1.EventModel();
        this.Users = new UserModel_1.UserModel();
        this.Calendars = new CalendarModel_1.CalendarModel();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(logger('dev'));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        // User APIs
        router.post('/app/user/', function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            _this.Users.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('User object creation failed');
                }
            });
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
        });
        router["delete"]('/app/user', function (req, res) {
            console.log(req.body);
            var userId = req.body.userId;
            _this.Users.deleteUser(res, { userId: { $eq: userId } });
        });
        router.put('/app/user', function (req, res) {
            console.log('Updating user according to following request: ' + req.body);
            _this.Users.updateUser(res, req.body.userId, req.body.document);
        });
        router.get('/app/user/', function (req, res) {
            console.log('Query all users');
            _this.Users.retrieveAllUsers(res);
        });
        router.get('/app/user/:userId', function (req, res) {
            var userId = req.params.userId;
            console.log('Query user collection for the following id: ' + userId);
            _this.Users.retrieveUserById(res, { $and: [{ userId: { $eq: userId } }, { isActive: true }] });
        });
        // Event APIs
        router.post('/app/event/', function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            _this.Users.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('Event object creation failed');
                }
            });
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
        });
        router.get('/app/event/', function (req, res) {
            console.log('Query all events');
            _this.Events.retrieveAllEvents(res);
        });
        router.get('/app/event/:eventId', function (req, res) {
            var eventId = req.params.eventId;
            console.log('Query user collection for the following id: ' + eventId);
            _this.Events.retrieveEventById(res, { eventId: eventId });
        });
        // Calendar APIs
        router.post('/app/calendar/', function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            _this.Users.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('Calendar object creation failed');
                }
            });
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
        });
        router.get('/app/calendar/', function (req, res) {
            console.log('Query all calendars');
            _this.Calendars.retrieveAllCalendars(res);
        });
        router.get('/app/calendar/:calendarId', function (req, res) {
            var calendarId = req.params.calendarId;
            console.log('Query user collection for the following id: ' + calendarId);
            _this.Calendars.retrieveCalendarById(res, { calendarId: calendarId });
        });
        // Static Routes
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    };
    return App;
}());
exports.App = App;
