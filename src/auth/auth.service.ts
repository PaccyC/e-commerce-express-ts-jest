import { CreateUser } from "../types/user";
import User from "./auth.model";
import createHttpError from 'http-errors'
import bcrypt from 'bcrypt';
import { createToken } from "../utils/createToken";


export const registerUser = async (user:CreateUser)=>{

    if(!user.email || !user.password || !user.names || !user.phoneNumber){
        throw createHttpError.BadRequest("All fields are required!")
    }

    const existingUser= await User.findOne({email:user.email});

    if(existingUser){
        throw createHttpError.BadRequest("User already exists")
    }

    const salt= await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(user.password,salt);

    const newUser= await User.create({...user, password: hashedPassword});
    const token = createToken(newUser.id);

    return {user: newUser, token};


}

export const signInUser = async (email:string, password:string)=>{
    try {
        const user = await User.findOne({email})
        if(!user){
            throw createHttpError.NotFound("User not found")
        }

        const match= await bcrypt.compare(password, user.password);
        if(!match){
            throw createHttpError.Unauthorized("Invalid credentials");
        }
        // Create token for the user
        const token = createToken(user.id);
        return {user,token}
        
    } catch (error) {
        console.log(error);
        
    }

}
