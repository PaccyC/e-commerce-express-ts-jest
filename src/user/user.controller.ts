import {Request,Response} from 'express';
import User from '../auth/auth.model';
import { apiResponse } from '../utils/apiResponse';
import { CustomRequest } from '../middleware/auth';

export const getAuthenticatedUser =(req:CustomRequest,res:Response) =>{
    res.json(apiResponse().success(200,{
        user: req.user
    }))
}