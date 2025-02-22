import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
 const checkauthentication = async (req, res, next) => {
    console.log("ok");
    let token = (req.headers.authorization.split(" "))[1];
    let secret_key = process.env.SECRET_KEY;
    
    try {
        console.log("hello check 1")
        const payload = jwt.verify(token, secret_key); 
        console.log("hello check 2")
        next();  
    } catch (error) {
        res.status(401).json({message: "invalid credentials please signin again"});
    }
}
export default checkauthentication