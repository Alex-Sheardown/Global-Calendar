"use strict";
exports.__esModule = true;
exports.App = void 0;
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");
var EventModel_1 = require("./model/EventModel");
var UserModel_1 = require("./model/UserModel");
var CalendarModel_1 = require("./model/CalendarModel");
var options = {
    origin: '*'
};
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
        router.use(cors(options));
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
            try {
                var userId = req.params.userId;
                console.log('Query user collection for the following id: ' + userId);
                _this.Users.retrieveUserById(res, { $and: [{ userId: { $eq: userId } }, { isActive: true }] });
            }
            catch (_a) {
                res.status(404);
                res.send({ error: "This id doesn't exist!" });
            }
        });
        //For all the User related suff
        //Find user
        router.get('/app/user/name/:name', function (req, res) {
            try {
                var name_1 = req.params.name;
                console.log('Query user collection for the following name: ' + name_1);
                _this.Users.retrieveUserByName(res, { $and: [{ name: { $eq: name_1 } }, { isActive: true }] });
            }
            catch (_a) {
                res.status(404);
                res.send({ error: "This Name doesn't exist!" });
            }
        });
        router.get('/app/user/email/:email', function (req, res) {
            try {
                var email = req.params.email;
                console.log('Query user collection for the following email: ' + email);
                _this.Users.retrieveUserByEmail(res, { $and: [{ email: { $eq: email } }, { isActive: true }] });
            }
            catch (_a) {
                res.status(404);
                res.send({ error: "This Name doesn't exist!" });
            }
        });
        router.get('/app/user/secure/', function (req, res) {
            try {
                var name_2 = req.params.name;
                var password = req.params.password;
                console.log('Query user collection for the following username an password: ' + name_2 + " " + password);
                _this.Users.retrieveUserByNameandPassword(res, { name: name_2, password: password });
            }
            catch (_a) {
                res.status(404);
                res.send({ error: "This Name doesn't exist!" });
            }
        });
        //Post secure user
        //broken
        /*
        router.post('/app/user/secure/signup', async (req, res) => {
          try {
            let email = req.params.email;
            console.log('Query user collection for the following email: ' + email);
            let hold = this.Users.retrieveUserByEmail2(res, {$and: [{email: {$eq: email}}, {isActive: true}]})
            console.log("What is being compared: " + hold)
            if(await hold < 1){
              console.log('This User does not exist')
    
            } else{
              
              console.log('We found This User')
            }
          }catch {
            res.status(404)
            res.send({ error: "This Email doesn't exist!" })
          }
        });
        */
        //Post user
        router.post('/app/user/signup', function (req, res) {
            //need to run check for name, email, and passsword 
            var name = req.params.name;
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
        //Delete
        router["delete"]('/app/event', function (req, res) {
            console.log(req.body);
            var eventId = req.body.eventId;
            _this.Events.deleteEvent(res, { eventId: { $eq: eventId } });
        });
        router.put('/app/event', function (req, res) {
            console.log('Updating event according to following request: ' + req.body);
            _this.Events.updateEvent(res, req.body.eventId, req.body.document);
        });
        //Get All Events
        router.get('/app/event/', function (req, res) {
            console.log('Query all events');
            _this.Events.retrieveAllEvents(res);
        });
        //Get Event By ID
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
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
        //this.expressApp.use('/Day', express.static(__dirname+'/pages/Calendar/Day.html'));
        this.expressApp.use('/Week', express.static(__dirname + '/pages/Calendar/Week.html'));
        this.expressApp.use('/Month', express.static(__dirname + '/pages/Calendar/Month.html'));
        this.expressApp.use('/Year', express.static(__dirname + '/pages/Calendar/Year.html'));
        //this.expressApp.use('/Schedule', express.static(__dirname+'/pages/Calendar/Schedules.html'));
        //this.expressApp.use('/Settings', express.static(__dirname+'/pages/Calendar/Settings.html'));
    };
    return App;
}());
exports.App = App;
