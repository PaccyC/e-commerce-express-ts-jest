import {Request,Response} from 'express';
import User from '../auth/auth.model';
import { apiResponse } from '../utils/apiResponse';
import { CustomRequest } from '../middleware/auth';
import { getAllUsers, getUserById } from './user.service';

export const getAuthenticatedUser =(req:CustomRequest,res:Response) =>{
    res.json(apiResponse().success(200,{
        user: req.user
    }))
}

export const getAllUsersHandler = async(req:Request,res:Response) =>{
    const data= await getAllUsers();
    res.json(apiResponse().success(200,data)).status(200)
}


export const getUserByIdHandler = async (req:Request, res:Response) =>{
    const {id}= req.params;
    const data= await getUserById(id);
    res.json(apiResponse().success(200,data)).status(200);
}