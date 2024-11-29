import { Request,Response } from 'express';
import { CreateUser } from '../types/user';
import { registerUser ,signInUser} from './auth.service';
import { apiResponse } from '../utils/apiResponse';


export const registerUserHandler = async(req:Request, res: Response) =>{

    const body= req.body as CreateUser;
    const data = await registerUser(body);

    res.json(apiResponse().success(201,data)).status(201);

}


export const signInUserHandler = async (req:Request, res:Response) =>{

    const {email,password}= req.body;
    const data= await signInUser(email,password);

    res.json(apiResponse().success(200,data));
}

