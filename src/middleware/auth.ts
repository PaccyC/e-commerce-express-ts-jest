import { Request,Response,NextFunction } from "express"
import User from "../auth/auth.model"
import createHttpError from 'http-errors';
import jwt from "jsonwebtoken"
import { Document } from "mongoose";
import { IUSER } from "../types/user";

interface DecodedToken {
    _id: string;
}

export interface CustomRequest extends Request {
    user?:IUSER 
}


export const auth = async(req:CustomRequest, res:Response,next:NextFunction) =>{
    try {
        
        const token = req.header("Authorization")?.replace("Bearer ","");
    
        if(!token){
            createHttpError.Unauthorized("Authentication failed!")
        }
    
        const decoded= jwt.verify(token!,process.env.JWT_SECRET_KEY as string) as DecodedToken;
        const user = await User.findOne({
            _id: decoded._id
        }) as Document<unknown,{},IUSER> & IUSER

        if(!user){
            throw createHttpError.Unauthorized("Authentication failed!")
        }

        req.user= user;
        next();
    } catch (error) {
        console.log(error);
        next(createHttpError.Unauthorized("Authentication failed!"));
        
    }
}