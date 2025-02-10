import mongoose from "mongoose";
import { Schema } from "mongoose";

let property=new Schema({
    key:{
        type:String,
        required:true
    },
    value:[{
        type:String,
        required:true
    }]
})
const Property=mongoose.model('property',property);
export default Property;