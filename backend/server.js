// const express=require("express");
 // const dotenv=require("dotenv");
import express from "express";                                       
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";

import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import { app, server } from "./socket/socket.js";
import path from "path";




const PORT=process.env.PORT || 5000;

const __dirname=path.resolve();

dotenv.config();

app.use(express.json()); //to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());


app.use("/api/auth",authRoutes);                            //ye isliye bnaya kyuki file messy hojegi routes bna bna ke
app.use("/api/messages",messageRoutes);                            
app.use("/api/users",userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")))             //because of this we are able to connect frontend through this

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))        //because of this we are able to connect frontend through this
})


server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server Running on port  ${PORT}`);
});