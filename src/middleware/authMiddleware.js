import jwt from 'jsonwebtoken';
import {prisma} from '../config/db.js';

// Read the token from the request
//Check if token is valid
const authMiddleware = async (req,res,next) =>{
    console.log("AUth middleware reached");
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    } else if(req.cookies?.jwt){
        token = req.cookies?.jwt;
    }
    console.log(token)
    if(!token){
            return res.status(401).json({error:"NO token Provided.unAuthorized"})
    }
    try{
        //verify token and extract the userId
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await prisma.user.findUnique({
            where:{id : decode.id},
        })
        if(!user){
            return res.status(401).json({error:"User no longer exist"})
        }

        req.user = user;
        next();
    }
    catch(err){
        return res.status(401).json({error:"Not Authorized, Token failed"})

    }
}

export { authMiddleware }