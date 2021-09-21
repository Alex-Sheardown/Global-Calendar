import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {EventModel} from './model/EventModel';
import {UserModel} from './model/UserModel';
import {AddressModel} from "./model/AddressModel";

const options: cors.CorsOptions = {
    origin: '*'
};

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public expressApp: express.Application;
    public Events: EventModel;
    public Users: UserModel;
    public Addresss: AddressModel;
    public idGenerator: number;

    //Run configuration methods on the Express instance.
    constructor() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.idGenerator = 102;
        this.Events = new EventModel();
        this.Users = new UserModel();
        this.Addresss = new AddressModel();
    }

    // Configure Express middleware.
    private middleware(): void {
        
        this.expressApp.use(logger('dev'));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({extended: false}));
        this.expressApp.use('/', express.static(__dirname+'/dist/todoApp'));
        
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
            this.Users.deleteUser(res, {userId: {$eq: userId}})
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
            let userId = req.params.userId;
            console.log('Query user collection for the following id: ' + userId);
            this.Users.retrieveUserById(res, {$and: [{userId: {$eq: userId}}, {isActive: true}]})
        });

        //Secure Login
        router.get('/app/user/secure/login', (req, res) => {
            try {
                let id = req.body.userId;
                let name = req.body.name;
                console.log('Query user collection for the following username an password: ' + id + " " + name);
                this.Users.retrieveUserByNameandPassword(res, {userId: id , name: name})
            }catch {
              res.status(404)
              res.send({ error: "This Name doesn't exist!" })
            }
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

        router.delete('/app/event', (req, res) => {
            console.log(req.body)
            let eventId = req.body.eventId;
            this.Events.deleteEvent(res, {eventId: {$eq: eventId}})
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

        // Address APIs
        router.post('/app/Address/', (req, res) => {
            console.log(req.body);
            let jsonObj = req.body;
            this.Addresss.model.create([jsonObj], (err) => {
                if (err) {
                    console.log('Address object creation failed');
                }
            });
            res.send(this.idGenerator.toString());
            this.idGenerator++;
        });

        router.delete('/app/Address', (req, res) => {
            console.log(req.body)
            let AddressId = req.body.AddressId;
            this.Addresss.deleteAddress(res, {AddressId: {$eq: AddressId}})
        });

        router.put('/app/Address', (req, res) => {
            console.log('Updating Address according to following request: ' + req.body)
            this.Addresss.updateAddress(res, req.body.AddressId, req.body.document)
        });

        router.get('/app/Address/', (req, res) => {
            console.log('Query all Addresss');
            this.Addresss.retrieveAllAddresss(res);
        });

        router.get('/app/Address/:AddressId', (req, res) => {
            let AddressId = req.params.AddressId;
            console.log('Query user collection for the following id: ' + AddressId);
            this.Addresss.retrieveAddressById(res, {AddressId: AddressId})
        });


        // Static Routes
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
        //this.expressApp.use('/Day', express.static(__dirname+'/pages/Address/Day.html'));
        this.expressApp.use('/Week', express.static(__dirname + '/pages/Address/Week.html'));
        this.expressApp.use('/Month', express.static(__dirname + '/pages/Address/Month.html'));
        this.expressApp.use('/Year', express.static(__dirname + '/pages/Address/Year.html'));
        //this.expressApp.use('/Schedule', express.static(__dirname+'/pages/Address/Schedules.html'));
        //this.expressApp.use('/Settings', express.static(__dirname+'/pages/Address/Settings.html'));

    }

}

export {App};
