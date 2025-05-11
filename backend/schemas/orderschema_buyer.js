import mongoose from "mongoose";
import { Schema } from "mongoose";

const orderSchema= new Schema({
    date:{
        type : Date,
        default:Date.now,
    },

    products:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required:true,
            },
            quantity:{
                type:Number,
                default:0,
                required:true
            }
        }
    ],

    total:{
        type: Number,
        default:0,
        required:true,
    }
})
const UserOrderSchema= mongoose.model('buyerorderschema', orderSchema)
export default UserOrderSchema;