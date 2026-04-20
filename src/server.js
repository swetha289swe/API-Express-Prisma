// const express = require("express");
import express from "express";
import {config} from "dotenv";
import { connectDB,disconnectDB } from "./config/db.js";
//CORS Errror
import cors from "cors";
// IMPORT ROUTES
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

config();
connectDB();

const app = express();
//cors
app.use(cors({
    origin: ['http://localhost:5173','https://movies-world-brown-five.vercel.app'], // Replace with your React app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow cookies/sessions if needed
  }
));
//body parse middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));  ///automatically parse data from an html form submission that u can access in the req body

// API ROUTES
// http://localhost:3000/movies
app.use('/movies',movieRoutes);
app.use('/auth',authRoutes);
app.use('/watch',watchlistRoutes)
// http://localhost:3000
app.get('',(req,res)=>{
    res.status(200).send("Hello PedroTechnologies Channel!");
})
// http://localhost:3000/home
app.get('/home',(req,res)=>{
    res.json({message:'Hello'})
})

//Added this line as i have to deploy in vercel
export default app;

const port = 3000;
if (process.env.NODE_ENV !== 'production') {
const server = app.listen(port,()=>{
    console.log("Port runs in http://localhost:"+port)
})
}


process.on("unhandledRejection",(err)=>{
    console.log("Unhandled Rejection",err);
    server.close(async()=>{
        await disconnectDB();
        process.exit(1);
    })
})

process.on("unhandledException",(err)=>{
    console.log("Unhandled Exception",err);
    server.close(async()=>{
        await disconnectDB();
        process.exit(1);
    })
});
//graceful shutdown
process.on("SIGTERM",async()=>{
    console.log("SIGTERM received,shutting down fracefully");
    server.close(async()=>{
        await disconnectDB();
        process.exit(1);
    })
})
//GET,POST,PUT,DELETE
// AUTH - signIn,sigup
// Movie - Get all movies
// User - Profile
// Watchlist - 