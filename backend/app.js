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
import sellerorder from './schemas/orderschema_seller.js';
import buyerorder from './schemas/orderschema_buyer.js';
import auth_router_store from './routes/store_routes/auth_routes.js';
import user_router_store from './routes/store_routes/user_routes.js';
import product_router_store from './routes/store_routes/product_routes.js';
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

app.use("/",auth_router_store);
app.use("/",user_router_store);
app.use("/",product_router_store);

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



app.post('/api/listedproducts',checkauthentication, async(req,res)=>{
    let arr = await Product.find({seller:req.body.payload.email});
    //console.log(arr);
    res.json(arr);
})

app.post('/api/categories',async (req,res)=>{
   try{ 
    console.log("hey ");
 
    let result= await Category.findOne({name: { $regex: req.body.categoryName, $options: "i" } });
    if(result)
    {
      let arr= result.properties;
      let flag1= false;
      let final= arr.map((obj)=>{
        if(obj.key.toLowerCase()==req.body.propertyKey.toLowerCase())
        {
          let a= obj.value;
          flag1=true;
          let flag=false;
          for( let ele of a )
          {
            if (ele==req.body.propertyValue)
            {
              flag=true;
              break;
            }
          }
          if(!flag)
          {
            a.push(req.body.propertyValue);
          }
          return {key: req.body.propertyKey, value: a};
        }
        else
        {
          return obj;
        }
      })
      if(!flag1)
      {
        final.push({key: req.body.propertyKey, value: req.body.propertyValue});
      }
      await Category.findOneAndUpdate({name: req.body.categoryName},
        {properties: final},{new:true,upsert:true});
    }
    else
    {
      let arr=[];
      arr.push({key: req.body.propertyKey, value: req.body.propertyValue})
        await Category.create({name: req.body.categoryName, properties:arr});
    } 
  res.json({message: "Category Successfully Updated"});}
    catch(error)
    {
      res.json({message: error});
    }
  
    
})



app.get('/api/getproperties/:name', async(req,res)=>{
  console.log(`ok hey i successfully got ${req.params.name}`);
  Category.findOne({name: req.params.name})
        .then((category)=>{
          console.log(category.properties);
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
    seller:req.body.payload.email,
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
        name:req.body.name,
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




app.get('/api/getemail_seller', async(req,res)=>{
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

app.post('/api/getsellerdetails', async(req,res)=>{
  console.log("ok");
  try{
    console.log(req.body);
      const payload= await user.findOne({email: req.body.email});
        res.json({message: "seller Successfully Found", payload});
  }
  catch{
    res.json({message: "Internal server error!!"});
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




app.post('/api/buyerorder', async (req,res) =>{

  try
 {
  let arr= req.body.products;
  let total= 0;
  console.log(arr);
  let products=await Promise.all( arr.map(async(ele)=>{
      let product=await Product.findOne({name: ele.name});     
      const id= product._id;
      const qty =ele.quantity;
      total += qty* ele.price;
      return { product: id, quantity : qty}; 
  })) 
   
    const reso= await buyerorder.create({
      products: products,
      total : total,
    })
    
    res.send({message: "Order successfully created , Thank you for using Aabhas's Ecommerce"});
  }
    catch(error)
    {
      
      res.send({message: error.message })
    }

})



app.use(express.static('public'))



app.listen(port,()=>{
    console.log(`app is running on port: ${port}`)
})