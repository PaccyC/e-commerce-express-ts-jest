import app from "./app";
import { config } from 'dotenv'
import mongoose from "mongoose"


config()

const PORT= process.env.PORT || 6000;
const MONGO_URI= process.env.MONGO_URI || "mongodb://localhost:27017/e-commerce-db"




app.listen(PORT,()=>{
    
    
    mongoose.connect(MONGO_URI)
    .then(()=>{
        console.log(`Connected to MongoDB : ${MONGO_URI}`);
        
    })
    .catch(err=>{
        console.error("Failed to connect to MongoDB",err);
        process.exit(1);
    })

    console.log(`Server running on the port ${PORT}`);
    
})