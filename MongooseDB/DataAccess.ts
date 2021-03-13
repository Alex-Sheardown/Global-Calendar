// comment
import Mongoose = require("mongoose");

class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;
    //static DB_CONNECTION_STRING:string = 'mongodb+srv://MrBob:<password>@cluster0.eiq1n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    //static DB_CONNECTION_STRING:string = 'mongodb+srv://benyon:Seahawkssuck2021@calendardb.uhgwf.mongodb.net/globalCalendar?retryWrites=true&w=majority';
    static DB_CONNECTION_STRING:string = 'mongodb://dbAdmin:test@localhost:3000/globalCalendar?authSource=admin'; //in my local computer

    constructor () {
        DataAccess.connect();
    }
    
    static connect (): Mongoose.Connection {
        if(this.mongooseInstance) return this.mongooseInstance;
        
        this.mongooseConnection  = Mongoose.connection;
        this.mongooseConnection.on("open", () => {
            console.log("Connected to mongodb.");
        });
        
        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    }
    
}
DataAccess.connect();
export {DataAccess};
