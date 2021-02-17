import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import {EventModel} from './model/EventModel';
import {UserModel} from './model/UserModel';
import {CalendarModel} from "./model/CalendarModel";

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Events:EventModel;
  public Users:UserModel;
  public Calendars:CalendarModel;
  public idGenerator:number;

  //Run configuration methods on the Express instance.
  constructor() {
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
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    // User APIs
    router.post('/app/user/', (req, res) => {
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

    router.delete('/app/user', (req, res) => {
      console.log(req.body)
      let userId = req.body.userId;
      this.Users.deleteUser(res,{userId: {$eq: userId}})
    });

    router.put('/app/user', (req, res) => {
      console.log('Updating user according to following request: ' + req.body)
      this.Users.updateUser(res, req.body.userId, req.body.document)
    });

    router.get('/app/user/', (req, res) => {
        console.log('Query all users');
        this.Users.retrieveAllUsers(res);
    });

    router.get('/app/user/:userId', (req, res) => {
      let userId = req.params.userId;
      console.log('Query user collection for the following id: ' + userId);
      this.Users.retrieveUserById(res, {$and: [{userId: {$eq: userId}}, {isActive: true}]})
    });

    // Event APIs
    router.post('/app/event/', (req, res) => {
      console.log(req.body);
      let jsonObj = req.body;
      this.Users.model.create([jsonObj], (err) => {
        if (err) {
          console.log('Event object creation failed');
        }
      });
      res.send(this.idGenerator.toString());
      this.idGenerator++;
    });

    router.delete('/app/event', (req, res) => {
      console.log(req.body)
      let eventId = req.body.eventId;
      this.Events.deleteEvent(res,{eventId: {$eq: eventId}})
    });

    router.put('/app/event', (req, res) => {
      console.log('Updating event according to following request: ' + req.body)
      this.Events.updateEvent(res, req.body.eventId, req.body.document)
    });

    router.get('/app/event/', (req, res) => {
      console.log('Query all events');
      this.Events.retrieveAllEvents(res);
    });

    router.get('/app/event/:eventId', (req, res) => {
      let eventId = req.params.eventId;
      console.log('Query user collection for the following id: ' + eventId);
      this.Events.retrieveEventById(res, {eventId: eventId})
    });

    // Calendar APIs
    router.post('/app/calendar/', (req, res) => {
      console.log(req.body);
      let jsonObj = req.body;
      this.Users.model.create([jsonObj], (err) => {
        if (err) {
          console.log('Calendar object creation failed');
        }
      });
      res.send(this.idGenerator.toString());
      this.idGenerator++;
    });

    router.delete('/app/calendar', (req, res) => {
      console.log(req.body)
      let calendarId = req.body.calendarId;
      this.Calendars.deleteCalendar(res,{calendarId: {$eq: calendarId}})
    });

    router.put('/app/calendar', (req, res) => {
      console.log('Updating calendar according to following request: ' + req.body)
      this.Calendars.updateCalendar(res, req.body.calendarId, req.body.document)
    });

    router.get('/app/calendar/', (req, res) => {
      console.log('Query all calendars');
      this.Calendars.retrieveAllCalendars(res);
    });

    router.get('/app/calendar/:calendarId', (req, res) => {
      let calendarId = req.params.calendarId;
      console.log('Query user collection for the following id: ' + calendarId);
      this.Calendars.retrieveCalendarById(res, {calendarId: calendarId})
    });


    // Static Routes
    this.expressApp.use('/', router);
    this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
    this.expressApp.use('/', express.static(__dirname+'/pages'));
    this.expressApp.use('/Week', express.static(__dirname+'/pages/Calendar/Week.html'));
    this.expressApp.use('/Month', express.static(__dirname+'/pages/Calendar/Month.html'));
    this.expressApp.use('/login', express.static(__dirname+'/pages/login_sign_in-settings/login.html'));
    this.expressApp.use('/signup', express.static(__dirname+'/pages/login_sign_in-settings/signup.html'));
    this.expressApp.use('/settings', express.static(__dirname+'/pages/login_sign_in-settings/settings.html'));
    
  }

}

export {App};
