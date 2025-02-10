import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema=new Schema({
email: {
    type:String,
    required:true,
},
password:{type:String ,
    required:true,
}

});
const User=mongoose.model("user",userSchema);
export default User;