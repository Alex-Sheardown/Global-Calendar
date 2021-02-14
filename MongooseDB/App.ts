//import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
//import * as mongodb from 'mongodb';
//import * as url from 'url';
import * as bodyParser from 'body-parser';
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');

import {EventModel} from './model/EventModel';
import {UserModel} from './model/UserModel';
import {CalendarModel} from "./model/CalendarModel";
//import {DataAccess} from './DataAccess';

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
    
  }

}

export {App};
