"use strict";
exports.__esModule = true;
exports.App = void 0;
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var EventModel_1 = require("./model/EventModel");
var UserModel_1 = require("./model/UserModel");
var CalendarModel_1 = require("./model/CalendarModel");
var GooglePassport_1 = require("./GooglePassport");
var passport = require("passport");
var options = {
    origin: '*'
};
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.googlePassportObj = new GooglePassport_1["default"]();
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
        this.expressApp.use(session({ secret: "temp" }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
    };
    App.prototype.validateAuth = function (req, res, next) {
        if (req.isAuthenticated()) {
            console.log("user is authenticated");
            return next();
        }
        console.log("user is not authenticated");
        res.redirect('/');
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        router.use(cors(options));
        router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
        router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), function (req, res) {
            console.log("successfully authenticated user and returned to callback page.");
            console.log("redirecting to /#/day");
            res.redirect('/#/day');
        });
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
            console.log(req.body);
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
            _this.Events.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('Event object creation failed');
                }
            });
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
        });
        router["delete"]('/app/event', function (req, res) {
            console.log(req.body);
            var eventId = req.body.eventId;
            _this.Events.deleteEvent(res, { eventId: { $eq: eventId } });
        });
        router.put('/app/event', function (req, res) {
            console.log('Updating event according to following request: ' + req.body);
            _this.Events.updateEvent(res, req.body.eventId, req.body.document);
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
            _this.Calendars.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('Calendar object creation failed');
                }
            });
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
        });
        router["delete"]('/app/calendar', function (req, res) {
            console.log(req.body);
            var calendarId = req.body.calendarId;
            _this.Calendars.deleteCalendar(res, { calendarId: { $eq: calendarId } });
        });
        router.put('/app/calendar', function (req, res) {
            console.log('Updating calendar according to following request: ' + req.body);
            _this.Calendars.updateCalendar(res, req.body.calendarId, req.body.document);
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
        this.expressApp.use('/', express.static(__dirname+'/angularDist')); //TODO: EMMA
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));

        //this.expressApp.use('/Day', express.static(__dirname+'/pages/Calendar/Day.html'));
        this.expressApp.use('/Week', express.static(__dirname + '/pages/Calendar/Week.html'));
        this.expressApp.use('/Month', express.static(__dirname + '/pages/Calendar/Month.html'));
        this.expressApp.use('/Year', express.static(__dirname + '/pages/Calendar/Year.html'));
        //this.expressApp.use('/Schedule', express.static(__dirname+'/pages/Calendar/Schedules.html'));
        //this.expressApp.use('/Settings', express.static(__dirname+'/pages/Calendar/Settings.html'));

        /*original static*/
        /*
        // Static Routes
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
        //this.expressApp.use('/Day', express.static(__dirname+'/pages/Calendar/Day.html'));
        this.expressApp.use('/Week', express.static(__dirname + '/pages/Calendar/Week.html'));
        this.expressApp.use('/Month', express.static(__dirname + '/pages/Calendar/Month.html'));
        this.expressApp.use('/Year', express.static(__dirname + '/pages/Calendar/Year.html'));
        //this.expressApp.use('/Schedule', express.static(__dirname+'/pages/Calendar/Schedules.html'));
        //this.expressApp.use('/Settings', express.static(__dirname+'/pages/Calendar/Settings.html'));
         */
    };
    return App;
}());
exports.App = App;
