import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { EventModel } from './model/EventModel';
import { UserModel } from './model/UserModel';
import { CalendarModel } from "./model/CalendarModel";

import GooglePassportObj from "./GooglePassport";
import * as passport from 'passport';

const options: cors.CorsOptions = {
    origin: '*'
};

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public expressApp: express.Application;
    public Events: EventModel;
    public Users: UserModel;
    public Calendars: CalendarModel;
    public idGenerator: number;
    public googlePassportObj: GooglePassportObj;

    //Run configuration methods on the Express instance.
    constructor() {
        this.googlePassportObj = new GooglePassportObj();
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.idGenerator = 102;
        this.Events = new EventModel();
        this.Users = new UserModel();
        this.Calendars = new CalendarModel();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.expressApp.use(logger('dev'));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(session({ secret: "temp" }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
    }

    private validateAuth(req, res, next): void {
        if (req.isAuthenticated()) { console.log("user is authenticated"); return next(); }
        console.log("user is not authenticated");
        res.redirect('/'); // Route to failed redirect
        /*return next();*/
    }

    // Configure API endpoints.
    private routes(): void {
        let router = express.Router();

        router.use(cors(options));

        router.get('/auth/google', passport.authenticate('google', {scope: ['profile']}));

        router.get('/auth/google/callback',
            passport.authenticate(
                'google',
                { failureRedirect: 'https://globalcal5.azurewebsites.net/' }
            ),
            (req, res) => {
                console.log("successfully authenticated user and returned to callback page.");
                console.log("redirecting");
                console.log('https://globalcal5.azurewebsites.net/app/user/')
                res.redirect('/');
            }
        );

        // User APIs
        router.post('/app/user/', this.validateAuth, (req, res) => {
            console.log(req.body);
            let jsonObj = req.body;
            this.Users.model.create([jsonObj], (err) => {
                if (err) {
                    console.log('User object creation failed');
                }
            });
            res.send(this.idGenerator.toString());
            this.idGenerator++;
        });

        router.delete('/app/user', this.validateAuth, (req, res) => {
            console.log(req.body)
            let userId = req.body.userId;
            this.Users.deleteUser(res, { userId: { $eq: userId } })
        });

        router.put('/app/user', this.validateAuth,  (req, res) => {
            console.log('Updating user according to following request: ' + req.body)
            console.log(req.body)
            this.Users.updateUser(res, req.body.userId, req.body.document)
        });

        router.get('/app/user/', this.validateAuth, (req, res) => {
            console.log('Query all users');
            this.Users.retrieveAllUsers(res);
        });

        router.get('/app/user/current', this.validateAuth, (req, res) => {
            console.log('Get current user');
            res.json({userId: req['user']['id']})
        });

        router.get('/app/user/:userId', this.validateAuth, (req, res) => {
            let userId = req.params.userId;
            console.log('Query user collection for the following id: ' + userId);
            this.Users.retrieveUserById(res, { $and: [{ userId: { $eq: userId } }, { isActive: true }] })
        });

        // Event APIs
        router.post('/app/event/', this.validateAuth, (req, res) => {
            console.log(req.body);
            let jsonObj = req.body;
            this.Events.model.create([jsonObj], (err) => {
                if (err) {
                    console.log('Event object creation failed');
                }
            });
            res.send(this.idGenerator.toString());
            this.idGenerator++;
        });

        router.delete('/app/event', this.validateAuth, (req, res) => {
            console.log(req.body)
            let eventId = req.body.eventId;
            this.Events.deleteEvent(res, { eventId: { $eq: eventId } })
        });

        router.put('/app/event', this.validateAuth, (req, res) => {
            console.log('Updating event according to following request: ' + req.body)
            this.Events.updateEvent(res, req.body.eventId, req.body.document)
        });

        router.get('/app/event/', this.validateAuth, (req, res) => {
            console.log('Query all events');
            this.Events.retrieveAllEvents(res);
        });

        router.get('/app/event/:eventId', this.validateAuth, (req, res) => {
            let eventId = req.params.eventId;
            console.log('Query user collection for the following id: ' + eventId);
            this.Events.retrieveEventById(res, { eventId: eventId })
        });

        // Calendar APIs
        router.post('/app/calendar/', this.validateAuth, (req, res) => {
            console.log(req.body);
            let jsonObj = req.body;
            this.Calendars.model.create([jsonObj], (err) => {
                if (err) {
                    console.log('Calendar object creation failed');
                }
            });
            res.send(this.idGenerator.toString());
            this.idGenerator++;
        });

        router.delete('/app/calendar',this.validateAuth,  (req, res) => {
            console.log(req.body)
            let calendarId = req.body.calendarId;
            this.Calendars.deleteCalendar(res, { calendarId: { $eq: calendarId } })
        });

        router.put('/app/calendar', this.validateAuth, (req, res) => {
            console.log('Updating calendar according to following request: ' + req.body)
            this.Calendars.updateCalendar(res, req.body.calendarId, req.body.document)
        });

        router.get('/app/calendar/', this.validateAuth, (req, res) => {
            console.log('Query all calendars');
            this.Calendars.retrieveAllCalendars(res);
        });

        router.get('/app/calendar/:calendarId', this.validateAuth, (req, res) => {
            let calendarId = req.params.calendarId;
            console.log('Query user collection for the following id: ' + calendarId);
            this.Calendars.retrieveCalendarById(res, { calendarId: calendarId })
        });

        router.get('/app/user/calendar/:calendarId', (req, res) => {
            let uId = req.params.calendarId;
            console.log('Query user collection for the following id with User ID: ' + uId);
            this.Calendars.retrieveCalendarByUserID(res, {userId: uId})
        });


        // Static Routes
        this.expressApp.use('/', router);
        this.expressApp.use('/', express.static(__dirname + '/angularDist'));
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/Week', express.static(__dirname + '/pages/Calendar/Week.html'));
        this.expressApp.use('/Month', express.static(__dirname + '/pages/Calendar/Month.html'));
        this.expressApp.use('/Year', express.static(__dirname + '/pages/Calendar/Year.html'));

    }

}

export { App };
