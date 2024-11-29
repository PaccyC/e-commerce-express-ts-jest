
import jwt from  "jsonwebtoken";

export const createToken = (id: string): string =>{

    const secretKey= process.env.JWT_SECRET_KEY;
    if(!secretKey){
        throw new Error("JWT_SECRET_KEY not found")
     }

    const token=  jwt.sign({_id:id},secretKey,{expiresIn: "1d",algorithm:"HS256"})
    return token;

}

