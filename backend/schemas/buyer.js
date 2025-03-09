import mongoose from "mongoose";
import { Schema } from "mongoose";

const buyerSchema=new Schema({
email: {
    type:String,
    required:true,
},
password:{type:String ,
    required:true,
},
pincode:{
    type:String,
    required:true,
},
state:{type:String,
    required:true
},
address:{
    type:String,
    required:true
}

});
const buyer=mongoose.model("buyer",buyerSchema);
export default buyer;