import express from "express"
import buyer from '../../schemas/buyer.js'
import gethashed from '../../hash.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from "validator";
const auth_router=express.Router();
const secret_key=process.env.SECRET_KEY;


auth_router.post('/api/signin_buyer', async (req, res) => {
    console.log("heyy");
    try {
      const response = await buyer.findOne({ email: req.body.email });
  
      if (!response) {
        res.status(404).send({message:"User not Present, Please Signup first"});
        return; 
      }
  
      const isValid = await bcrypt.compare(req.body.password, response.password);
      if (isValid) {
        const token = jwt.sign(
          { email: req.body.email },
          secret_key,
          { expiresIn: '1h' }
        );
        const message = "User Successfully Logged in!!";
        res.status(200).send({ token, message, redirect: '/home' });
      } else {
        res.status(401).send({message:"Invalid Credentials"});
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({message:"Internal Server Error"});
    }
  });


  auth_router.post('/api/signup_buyer', async (req, res) => {
    console.log("heyaaa");
    try {
      const response = await buyer.findOne({ email: req.body.email });
      if (!response) {
        if(!validator.isEmail(req.body.email))
        {
            res.status(401).send("Invalid Credential, PLease Enter a Valid Email!!");
        }
        if(!validator.isStrongPassword(req.body.password))
        {
            res.status(401).send("Password is Weak!!");
        }
        const hashedpassword= await gethashed(req.body.password);
        await buyer.create({
          email: req.body.email,
          password: hashedpassword,
          pincode: req.body.pincode,
          state: req.body.state,
          address:req.body.address
        });
        res.send("User created");
      } else {
        res.send("User Already Present");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

export default auth_router;