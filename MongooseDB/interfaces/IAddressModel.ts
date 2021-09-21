import Mongoose = require("mongoose");

interface IAddressModel extends Mongoose.Document
{
    //1
    Street_Number: Number,
    //2
    //Also building Number on occasion 
    //House or building name
    House_or_Building_Name: String,
    //3
    Street_Number_Suffix: String,
    //4
    //Street Name
    Street_Name: String,
    //5
    Street_Type: String,
    //6
    //N, E, S, W, NE, SE, NW, SW
    Street_Direction: String,
    //7
    //PO Box, Apartment, Building, Floor, Office, Suite
    Address_Type: String,
    //8
    //Box Number, Apartment Number, Floor Number remember apartment numbers and offices sometimes have alphanumeric info - like 1A
    Address_Type_Identifier:String,
    //9
    //District
    //hamlet/village
    //For instance, if your hamlet/village appears in the address before the town
    Local_Municipality:String,
    //10
    //Municipal
    //Municipality
    //City_or_Town
    City_or_Town:String,
    //11
    //Region
    //District
    //Povince
    //prefecture 
    //State (U.S.), Povince (Canada), Federal District (Mexico), County (U.K.), etc...
    Governing_District:String,
    //12
    //Post Code
    //Zip (U.S.), Postal Code (Canada, Mexico), Postcode (U.K.)
    Postal_Area:String,
    //13
    //Country
    Country:String,
    //14
    //Name
    Name:String,
    //15
    //Parish 
    //Locality
    //Neighborhood
    //Subdistrict
    Neighborhood:String,
    //16
    //Additional Delivery Information
    // Son/Daughter Of (DO/SO) Or Husband/Wife Of (H/O or W/O)
    Recipient_Information:String,
    //17
    //Post_Office
    Post_Office:String,
    //18
    //Replace
    Building_Name:String,
    //19
    //Company
    Organization:String,
    //20
    //Spatial_dispatching_information
    Spatial_dispatching_information:String,
    //21
    //Occupation
    Job_Tittle:String
}
export {IAddressModel};
