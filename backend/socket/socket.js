import { Server } from "socket.io";
import http from 'http'
import express from 'express'

const app=express();

const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET","POST"]
    }
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap={}; //{userId: socketId}
 //ek user message bhejta h vo express ke server pe jata h fir database mein jata to dusre user ki data dekhne ke liye refresh krna pdta h 
//  isliye socket use kiya jo express server ko cover krleta h matlab ek user bhejta h message vo seedha dusre user ko jata h
io.on('connection',(socket)=>{
    console.log("a user connected",socket.id)

    const userId=socket.handshake.query.userId;
    if(userId!="undefined") userSocketMap[userId]=socket.id;

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // socket.on() is used to listen to the events. can be used both on client and server side
    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id);
        delete userSocketMap[userId];                 //is se offline krdiya user ko
        io.emit("getOnlineUsers", Object.keys(userSocketMap));

    })
})




export {app,io,server}