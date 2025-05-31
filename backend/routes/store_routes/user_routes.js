import express from "express"
import jwt from "jsonwebtoken"
import buyer from "../../schemas/buyer.js";
const user_router=express.Router();
const secret_key=process.env.SECRET_KEY;

user_router.get('/api/getemail_buyer', async(req,res)=>{
    console.log("received");
    try
    {
      const token = req.headers.authorization.split(" ")[1];
      const payload= jwt.verify(token, secret_key);
      console.log(payload);
      res.json({payload,message: "payload successfully fetched"});
    }
    catch(error){
      res.status(500).json({message: "Internal Server Error "});
    }
  })
  
user_router.post('/api/getbuyerdetails', async(req,res)=>{
    console.log("ok");
    try{
        console.log(req.body);
        const response= await buyer.findOne({email: req.body.email});
        const final={
        email:`${response.email}`,
        pincode:`${response.pincode}`,
        address:`${response.address}`,
        state:`${response.state}`
      }
      res.json({message: "Buyer Successfully Found", final});
    }
    catch{
      res.json({message: "Internal server error!!"});
    }
  })

export default user_router;