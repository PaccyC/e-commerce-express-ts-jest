import User from "../auth/auth.model";
import createHttpError from 'http-errors'


export const getAllUsers = async() =>{

    const users= await User.find();
    return users;
}


export const getUserById =  async (id: string)=>{

    const user= await User.findById(id);

    if(!user){
        createHttpError.NotFound("User not found");
    }

    return user;
}