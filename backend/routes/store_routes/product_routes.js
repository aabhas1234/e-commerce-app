import express from "express";

import Category from '../../schemas/category.js';
import property from '../../schemas/Property.js';
import Product from '../../schemas/productSchema.js';
const product_router=express.Router();


product_router.get('/api/getcategories',async (req, res) => {
    Category.find({})
    .then((categories)=>{
      let arr=categories.map(category=>category.name);
      console.log("successfull");
      res.send(arr);
    })
    .catch((err)=>{console.error("Error occurred while fetching categories:", err);
      res.status(500).send("Internal Server Error");});
  })


product_router.get('/api/getproductsfromcategories/:categories', async (req,res)=>{
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

  export default product_router;