import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document
{
    name: string,
    userId: number,
    timeZone: string,
    desiredTimeZone: string,
    startDate: any,
    endDate: any,
    isActive: boolean
}
export {IUserModel};
