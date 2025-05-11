import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const category=new Schema (
{
   name:{
    type:String,
    required:true
   }
   ,
   properties:[{
       key:{
         type: String ,
         required:true,
       },
       value:[{
         type: String ,
         required: true
       }]
   }]
    
});
const Ct=mongoose.model('category',category);
export default Ct;

// or of: mongoose.Schema.Types.Mixed for varied data types