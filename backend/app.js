import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import Category from './schemas/category.js';
import property from './schemas/Property.js';
import Product from './schemas/productSchema.js';
import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv';
import user from './schemas/user.js';
import bcrypt from 'bcrypt';
import gethashed from './hash.js';
import checkauthentication from './middlewares/checkauthentication.js';
configDotenv();
const app=express();
const port=5000;
const db='db';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const secret_key=process.env.SECRET_KEY;
const uri = 'mongodb+srv://2021meb1258:a1BaV8IojBzSBiVm@cluster0.pvdnd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri, {
    dbName:db,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
console.log('Connected to MongoDB Atlas');
//,checkauthentication
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
    category:  req.body.productcategory },{new:true, upsert:true});
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



app.use(express.static('public'))



app.listen(port,()=>{
    console.log(`app is running on port: ${port}`)
})