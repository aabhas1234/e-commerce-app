import mongoose, { Types } from "mongoose";
import express from 'express';
import { Schema } from "mongoose";
const productSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true, 
    },
    property: [
      {
        key: { type: String, required: true }, 
        value: { type: String, required: true }, 
      },
    ],
  });
  
const ps=mongoose.model('product',productSchema)
export default ps;