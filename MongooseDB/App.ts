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
//import {DataAccess} from './DataAccess';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Events:EventModel;
  public Users:UserModel;
  public idGenerator:number;

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.idGenerator = 102;
    this.Events = new EventModel();
    this.Users = new UserModel();
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
    router.get('/app/user/', (req, res) => {
        console.log('Query all users');
        this.Users.retrieveAllUsers(res);
    });

    router.get('/app/user/:userId', (req, res) => {
      let userId = req.params.userId;
      console.log('Query user collection for the following id: ' + userId);
      this.Users.retrieveUserById(res, {$and: [{userId: {$eq: userId}}, {isActive: true}]})
    });

    this.expressApp.use('/', router);
    this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
    this.expressApp.use('/', express.static(__dirname+'/pages'));
    
  }

}

export {App};
