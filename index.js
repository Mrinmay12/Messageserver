import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import connectDB from "./DatabaseConnection/Database.js";
import MessageRoutes from "./Routes/MessageRoute.js"
import UserRoutes from "./Routes/UserRoutes.js"
dotenv.config()
const app=express()
const PORT=process.env.PORT 
app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json())
app.use(bodyParser.json({ limit: '10mb' }))
app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

//Routes here
  app.use("/api/user",MessageRoutes)
  app.use("/api/user",UserRoutes)

  app.get("/",(req,res)=>{
    res.send("Welcome to FirstConnect server")
})
// const start =async()=>{
//     try{
// await connectDB()
// app.listen(PORT,()=>{  
//     console.log("App start "+PORT)

// })

//     }catch(err){console.log(err)}
// }

const start =async()=>{
    try{
await connectDB()

    }catch(err){console.log(err)}
}
start()
let socketport=app.listen(PORT,()=>{
  console.log("App start "+PORT)

})

const io = new Server(socketport, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    console.log(userId,"userId")
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    console.log(data,"mybf");
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.messagetext);
    }
  });
});