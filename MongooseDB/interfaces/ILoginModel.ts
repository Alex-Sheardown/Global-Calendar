import Mongoose = require("mongoose");

interface ILoginModel extends Mongoose.Document
{
    username: string;
    userID: number;
    // encrypted password
}
export {ILoginModel};
