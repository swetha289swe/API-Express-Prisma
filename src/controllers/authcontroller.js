import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import {generateToken} from '../utils/generateToken.js'
//--------------------- REGISTER ---------------------
const register= async(req,res) =>{
        // res.json({"message":'Works'});
        const {name,email,password}  = req.body;
        //check if user exist
        const userExists = await prisma.user.findUnique({
            where :{email:email},
        });

        if(userExists){
            return res.status(400).json({error:"user already exist with this email"})
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        // create user to table
        const user  = await prisma.user.create({
            data:{
                name,
                email,
                password : hashedPassword,
            }
        });

        res.status(200).json({
            status:"success",
            data:{
                user:{
                    id:user.id,
                    name:name,
                    email:email
                }
            }
        })
}

//--------------------- LOGIN ---------------------
const  login = async(req,res) =>{
    const {email,password} =req.body;
    //check user exist in table
    const userCheck = await prisma.user.findUnique({
        where :{email:email},
    });
    if(!userCheck){
        return res.status(400).json({error:"Invalid Email / Password"})
    }
    // verify the password
    const ispasswordvalid = await bcrypt.compare(password,userCheck.password);
    if(!ispasswordvalid){
        return res.status(400).json({error:"Invalid Email / Password"})
    }
    //generate JWT token
    const token = generateToken(userCheck.id,res);

    res.status(200).json({
        status:"success",
        data:{
            user:{
                id:userCheck.id,
                name:userCheck.name,
                email:email
            },
            token
        }
    })
}

//--------------------- LOGOUT ---------------------
const logout = async(req,res) =>{
    res.cookie("jwt","",{
        expires : new Date(0),
        httpOnly :true
    })
    res.status(200).json({
        status:"success",
        message:"Successfully Logged out"
    });

}

export {register,login,logout}