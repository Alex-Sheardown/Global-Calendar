import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {EventModel} from './model/EventModel';
import {UserModel} from './model/UserModel';
import {CalendarModel} from "./model/CalendarModel";

const options: cors.CorsOptions = {
  origin: '*'
};

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
    router.use(cors(options));
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
      console.log(req.body)
      this.Users.updateUser(res, req.body.userId, req.body.document)
    });

    router.get('/app/user/', (req, res) => {
        console.log('Query all users');
        this.Users.retrieveAllUsers(res);
    });

    router.get('/app/user/:userId', (req, res) => {
      try {
        let userId = req.params.userId;
        console.log('Query user collection for the following id: ' + userId);
        this.Users.retrieveUserById(res, {$and: [{userId: {$eq: userId}}, {isActive: true}]})
      }catch {
        res.status(404)
        res.send({ error: "This id doesn't exist!" })
      }
    });

    
    //For all the User related suff
    //Find user
    router.get('/app/user/name/:name', (req, res) => {
      try {
        let name = req.params.name;
        console.log('Query user collection for the following name: ' + name);
        this.Users.retrieveUserByName(res, {$and: [{name: {$eq: name}}, {isActive: true}]})
      }catch {
        res.status(404)
        res.send({ error: "This Name doesn't exist!" })
      }
    });

    router.get('/app/user/email/:email', (req, res) => {
      try {
        let email = req.params.email;
        console.log('Query user collection for the following email: ' + email);
        this.Users.retrieveUserByEmail(res, {$and: [{email: {$eq: email}}, {isActive: true}]})
      }catch {
        res.status(404)
        res.send({ error: "This Name doesn't exist!" })
      }
    });

    router.get('/app/user/secure/', (req, res) => {
      try {
        let name = req.params.name;
        let password = req.params.password;
        console.log('Query user collection for the following username an password: ' + name + " " + password);
        this.Users.retrieveUserByNameandPassword(res, {name: name , password: password})
      }catch {
        res.status(404)
        res.send({ error: "This Name doesn't exist!" })
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
    router.post('/app/user/signup', (req, res) => {
      //need to run check for name, email, and passsword 
      let name = req.params.name;
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


    // Event APIs
    router.post('/app/event/', (req, res) => {
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

    //Delete
    router.delete('/app/event', (req, res) => {
      console.log(req.body)
      let eventId = req.body.eventId;
      this.Events.deleteEvent(res,{eventId: {$eq: eventId}})
    });

    router.put('/app/event', (req, res) => {
      console.log('Updating event according to following request: ' + req.body)
      this.Events.updateEvent(res, req.body.eventId, req.body.document)
    });

    //Get All Events
    router.get('/app/event/', (req, res) => {
      console.log('Query all events');
      this.Events.retrieveAllEvents(res);
    });

    //Get Event By ID
    router.get('/app/event/:eventId', (req, res) => {
      let eventId = req.params.eventId;
      console.log('Query user collection for the following id: ' + eventId);
      this.Events.retrieveEventById(res, {eventId: eventId})
    });

    // Calendar APIs
    router.post('/app/calendar/', (req, res) => {
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
    //this.expressApp.use('/Day', express.static(__dirname+'/pages/Calendar/Day.html'));
    this.expressApp.use('/Week', express.static(__dirname+'/pages/Calendar/Week.html'));
    this.expressApp.use('/Month', express.static(__dirname+'/pages/Calendar/Month.html'));
    this.expressApp.use('/Year', express.static(__dirname+'/pages/Calendar/Year.html'));
    //this.expressApp.use('/Schedule', express.static(__dirname+'/pages/Calendar/Schedules.html'));
    //this.expressApp.use('/Settings', express.static(__dirname+'/pages/Calendar/Settings.html'));

  }

}

export {App};
