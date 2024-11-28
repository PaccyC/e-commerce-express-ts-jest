import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

let mongoServer:MongoMemoryServer;

export const connectToDatabase= async ()=>{
    mongoServer= await MongoMemoryServer.create();

    const uri= mongoServer.getUri();
    await mongoose.connect(uri)
}


export const disconnectDatabase = async ()=>{

    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
}