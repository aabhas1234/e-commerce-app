import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import Category from './schemas/category.js';
import property from './schemas/Property.js';
import Product from './schemas/productSchema.js';
import jwt from 'jsonwebtoken'
import user from './schemas/user.js';
import buyer from './schemas/buyer.js'
import bcrypt from 'bcryptjs';
import gethashed from './hash.js';
import checkauthentication from './middlewares/checkauthentication.js';
import upload from "./multer_cloudinary_setup.js";
import Razorpay from "razorpay";

const app=express();
const port=5000;
const db='db';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const secret_key=process.env.SECRET_KEY;

mongoose.connect(process.env.mongo_uri, {
    dbName:db,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
console.log('Connected to MongoDB Atlas');


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/api/create-order", async (req, res) => {
  const { amount } = req.body; 

  const options = {
    amount: amount * 100, 
    currency: "INR",
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.get('/api/listedproducts',checkauthentication, async(req,res)=>{
    let arr = await Product.find({});
    //console.log(arr);
    res.json(arr);
})

app.post('/api/categories',async (req,res)=>{
    console.log("hey ");
    let values=[];
    values.push(req.body.propertyValue );
    let result= await property.findOneAndUpdate(
      {key: req.body.propertyKey},
      {$addToSet:{value:{ $each:values}}},
      {new : true, upsert:true}
    );
    let values1=[];
    values1.push(result._id);
    let category=await Category.findOneAndUpdate({name: req.body.categoryName},
      {$addToSet:{properties:{$each:values1}}},
    {new:true,upsert:true});
})

app.get('/api/getcategories',async (req, res) => {
    Category.find({})
    .then((categories)=>{
      let arr=categories.map(category=>category.name);
      console.log("successfull");
      res.send(arr);
    })
    .catch((err)=>{console.error("Error occurred while fetching categories:", err);
      res.status(500).send("Internal Server Error");});
  })


app.get('/api/getproperties/:name', async(req,res)=>{
  console.log(`ok hey i successfully got ${req.params.name}`);
  Category.findOne({name: req.params.name})
        .populate('properties')
        .then((category)=>{
            res.send(category.properties);
        })
        .catch((err)=>{
            console.error("Error occurred while fetching categories:", err);
            res.status(500).send("Internal Server Error");
        })
})
//you have to send back to the frontend all the image urls generated here as a array
app.post('/api/getimageurl', upload.array("images",5),async(req,res)=>{
  let arr=[];
  req.files.map((element)=>{
    arr.push(element.path);
  })
  res.send(arr);
})

app.post('/api/saveproduct', async(req,res)=>{

    let arr=[];
    let map1 = new Map(Object.entries(req.body.productmap));
    arr=req.body.keys.map((element)=>({key:element,
      value:map1.get(element)}))
      //console.log(req.body.pn)
    await Product.findOneAndUpdate({
       name:  req.body.productname
       //   property:  arr
    },{ $set: { property: arr }, 
    price: req.body.productprice,
    description: req.body.productdescription,
    category:  req.body.productcategory,
    imageurls:  req.body.imageurls,
   },{new:true, upsert:true});
    console.log("Product data is successfully updated ")
    res.send("Product data is successfully updated ")
})

app.post('/api/signup', async (req, res) => {
  console.log("heyaaa");
  try {
    const response = await user.findOne({ email: req.body.email });
    if (!response) {
      const hashedpassword= await gethashed(req.body.password);
      await user.create({
        email: req.body.email,
        password: hashedpassword,
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

app.get('/api/gettoken_buyer', async(req,res)=>{

  try
  {
    const token = request.headers.authorization.split(" ")[1];
    const payload= jwt.verify(token, secret_key);
    console.log(payload);
    res.json({payload,message: "payload successfully fetched"});
  }
  catch{
    res.status(500).json({message: "Internal Server Error "});
  }
})

app.post('/api/getbuyerdetails', async(res,res)=>{
  try{
      const payload= await buyer.findOne({email: req.body.email});
        res.json({message: "Buyer Successfully Found", payload});
  }
  catch{
    res.json({message: "Internal server error!!"});
  }
})


app.post('/api/signup_buyer', async (req, res) => {
  console.log("heyaaa");
  try {
    const response = await buyer.findOne({ email: req.body.email });
    if (!response) {
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

app.get('/api/getproductsfromcategories/:categories', async (req,res)=>{
  console.log("hewooo");
  try{
    const result= await Product.find({category: req.params.categories});
    console.log("products succesfully fetched");
    res.send(result);
  } catch(err)
  {
    console.error(err);
    res.status(500).send("internal server error");
  }
  
})

app.post('/api/signin', async (req, res) => {
  console.log("heyy");
  try {
    const response = await user.findOne({ email: req.body.email });

    if (!response) {
      res.status(404).send("User not Present, Please Signup first");
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
      res.status(401).send("Invalid Credentials");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


app.post('/api/signin_buyer', async (req, res) => {
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

app.use(express.static('public'))



app.listen(port,()=>{
    console.log(`app is running on port: ${port}`)
})