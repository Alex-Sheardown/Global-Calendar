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
        router.get('/app/user/', function (req, res) {
            console.log('Query all users');
            _this.Users.retrieveAllUsers(res);
        });
        router.get('/app/user/:userId', function (req, res) {
            var userId = req.params.userId;
            console.log('Query user collection for the following id: ' + userId);
            _this.Users.retrieveUserById(res, { $and: [{ userId: { $eq: userId } }, { isActive: true }] });
        });
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    };
    return App;
}());
exports.App = App;
