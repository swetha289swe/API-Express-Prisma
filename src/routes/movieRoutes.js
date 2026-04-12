// const express = require("express");
import express from "express";
// import {config} from  "dotenv"
const router = express.Router();

// config();

router.get("/hello",(req,res)=>{
    res.json({message:"MOVIE Hello"})
})

router.post("/hello",(req,res)=>{
    users.create("")
    res.json({message:"MOVIE post Hello"})
})
router.put("/hello",(req,res)=>{
    res.json({message:"MOVIE Put Hello"})
})
router.delete("/hello",(req,res)=>{
    res.json({message:"MOVIE delete Hello"})
})
export default router