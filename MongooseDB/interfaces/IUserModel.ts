import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document
{
    userID: number;
    username: string;
    email: string;
    // encrypted password
    events: [];
    //eventsNew: []; // eventIDs?
    //eventsOld: []; // eventIDs?
}
export {IUserModel};