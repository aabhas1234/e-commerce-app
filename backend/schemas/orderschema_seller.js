import { Schema, SchemaTypeOptions  } from "mongoose";
import mongoose from "mongoose";

const orderSchema= new Schema({
   
   
    seller:{
        type: String,
        required: true,
    },
    products:[
        {
           product:{type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required:true} ,
            quantity:{type: Number,
                required:true
            }
        }
    ],
    
})
const UserOrders= mongoose.model('sellerorderschema', orderSchema);
export default UserOrders;